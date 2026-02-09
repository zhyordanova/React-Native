import { STRINGS } from "../constants/strings";

export const ERROR_TYPES = {
  NETWORK: "NETWORK",
  VALIDATION: "VALIDATION",
  SERVER: "SERVER",
  UNAUTHORIZED: "UNAUTHORIZED",
  UNKNOWN: "UNKNOWN",
};

/**
 * Parse error response from Firebase and other APIs
 */
function parseFirebaseError(errorData) {
  if (!errorData || !errorData.error) {
    return {
      type: ERROR_TYPES.UNKNOWN,
      message: STRINGS.errors.unknown,
    };
  }

  const { error } = errorData;

  // Firebase error codes
  const errorMap = {
    EMAIL_EXISTS: {
      type: ERROR_TYPES.VALIDATION,
      message: STRINGS.errors.firebase.emailExists,
    },
    OPERATION_NOT_ALLOWED: {
      type: ERROR_TYPES.SERVER,
      message: STRINGS.errors.firebase.operationNotAllowed,
    },
    TOO_MANY_ATTEMPTS_LOGIN_RETRY_ACCOUNT: {
      type: ERROR_TYPES.VALIDATION,
      message: STRINGS.errors.firebase.tooManyAttempts,
    },
    EMAIL_NOT_FOUND: {
      type: ERROR_TYPES.VALIDATION,
      message: STRINGS.errors.firebase.emailNotFound,
    },
    INVALID_PASSWORD: {
      type: ERROR_TYPES.VALIDATION,
      message: STRINGS.errors.firebase.invalidPassword,
    },
    USER_DISABLED: {
      type: ERROR_TYPES.UNAUTHORIZED,
      message: STRINGS.errors.firebase.userDisabled,
    },
    INVALID_EMAIL: {
      type: ERROR_TYPES.VALIDATION,
      message: STRINGS.errors.firebase.invalidEmail,
    },
    WEAK_PASSWORD: {
      type: ERROR_TYPES.VALIDATION,
      message: STRINGS.errors.firebase.weakPassword,
    },
  };

  const mapping = errorMap[error.message];
  if (mapping) {
    return mapping;
  }

  // Generic server error
  return {
    type: ERROR_TYPES.SERVER,
    message: `${STRINGS.errors.serverError}${error.message}${STRINGS.errors.tryAgainLater}`,
  };
}

/**
 * Determine error type and return user-friendly message
 */
export function parseError(error) {
  // Network error (no response from server)
  if (!error.response) {
    return {
      type: ERROR_TYPES.NETWORK,
      message: STRINGS.errors.network,
      retry: true,
    };
  }

  const { response } = error;

  // Server returned error response
  if (response.status >= 500) {
    return {
      type: ERROR_TYPES.SERVER,
      message: STRINGS.errors.server,
      retry: true,
    };
  }

  // Unauthorized (401/403)
  if (response.status === 401 || response.status === 403) {
    return {
      type: ERROR_TYPES.UNAUTHORIZED,
      message: STRINGS.errors.unauthorized,
      retry: false,
    };
  }

  // Validation/Bad request error
  if (response.status === 400) {
    const parsed = parseFirebaseError(response.data);
    return {
      ...parsed,
      retry: false,
    };
  }

  // Rate limiting
  if (response.status === 429) {
    return {
      type: ERROR_TYPES.SERVER,
      message: STRINGS.errors.tooManyRequests,
      retry: true,
    };
  }

  // Default error
  return {
    type: ERROR_TYPES.SERVER,
    message: `${STRINGS.errors.errorOccurred}${response.statusText || STRINGS.errors.unknown}${STRINGS.errors.tryAgain}`,
    retry: response.status >= 500,
  };
}

/**
 * Retry logic with exponential backoff
 */
export async function retryWithBackoff(
  fn,
  maxRetries = 3,
  initialDelay = 1000,
) {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const errorInfo = parseError(error);

      // Don't retry if error is not retryable
      if (!errorInfo.retry) {
        throw error;
      }

      // Don't retry on last attempt
      if (attempt === maxRetries - 1) {
        break;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = initialDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));

      console.log(
        `Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`,
      );
    }
  }

  throw lastError;
}
