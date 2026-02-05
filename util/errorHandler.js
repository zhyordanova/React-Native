/**
 * Error types and user-friendly messages
 */

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
      message: "An unknown error occurred. Please try again.",
    };
  }

  const { error } = errorData;

  // Firebase error codes
  const errorMap = {
    EMAIL_EXISTS: {
      type: ERROR_TYPES.VALIDATION,
      message: "Email already exists. Please use a different email or log in.",
    },
    OPERATION_NOT_ALLOWED: {
      type: ERROR_TYPES.SERVER,
      message: "This operation is not allowed. Please try again later.",
    },
    TOO_MANY_ATTEMPTS_LOGIN_RETRY_ACCOUNT: {
      type: ERROR_TYPES.VALIDATION,
      message:
        "Too many failed login attempts. Please try again in a few minutes.",
    },
    EMAIL_NOT_FOUND: {
      type: ERROR_TYPES.VALIDATION,
      message: "Email not found. Please check your email or sign up.",
    },
    INVALID_PASSWORD: {
      type: ERROR_TYPES.VALIDATION,
      message: "Invalid password. Please try again.",
    },
    USER_DISABLED: {
      type: ERROR_TYPES.UNAUTHORIZED,
      message: "This account has been disabled. Please contact support.",
    },
    INVALID_EMAIL: {
      type: ERROR_TYPES.VALIDATION,
      message: "Invalid email format. Please enter a valid email.",
    },
    WEAK_PASSWORD: {
      type: ERROR_TYPES.VALIDATION,
      message:
        "Password is too weak. Please use at least 6 characters including letters and numbers.",
    },
  };

  const mapping = errorMap[error.message];
  if (mapping) {
    return mapping;
  }

  // Generic server error
  return {
    type: ERROR_TYPES.SERVER,
    message: `Server error: ${error.message}. Please try again later.`,
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
      message:
        "Network error. Please check your internet connection and try again.",
      retry: true,
    };
  }

  const { response } = error;

  // Server returned error response
  if (response.status >= 500) {
    return {
      type: ERROR_TYPES.SERVER,
      message:
        "Server error. Please try again later. If the problem persists, contact support.",
      retry: true,
    };
  }

  // Unauthorized (401/403)
  if (response.status === 401 || response.status === 403) {
    return {
      type: ERROR_TYPES.UNAUTHORIZED,
      message: "Unauthorized. Please log in again.",
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
      message: "Too many requests. Please try again in a few moments.",
      retry: true,
    };
  }

  // Default error
  return {
    type: ERROR_TYPES.SERVER,
    message: `Error: ${response.statusText || "Unknown error"}. Please try again.`,
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
