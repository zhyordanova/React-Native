import axios from "axios";
import { parseError, retryWithBackoff } from "./errorHandler";

const API_KEY = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;

// Token expires in 1 hour (3600 seconds)
const TOKEN_EXPIRATION_TIME = 3600;

async function authenticate(email, password, mode) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  try {
    const response = await retryWithBackoff(
      () =>
        axios.post(url, {
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      3,
      1000
    );

    const token = response.data.idToken;
    const refreshToken = response.data.refreshToken;
    const expiresIn = response.data.expiresIn || TOKEN_EXPIRATION_TIME;
    const expirationTime = Date.now() + parseInt(expiresIn) * 1000;

    return {
      token,
      refreshToken,
      expirationTime,
    };
  } catch (error) {
    const errorInfo = parseError(error);
    const err = new Error(errorInfo.message);
    err.type = errorInfo.type;
    err.retry = errorInfo.retry;
    throw err;
  }
}

export function createUser(email, password) {
  return authenticate(email, password, "signUp");
}

export function login(email, password) {
  return authenticate(email, password, "signInWithPassword");
}

// Refresh the ID token using the refresh token
export async function refreshAuthToken(refreshToken) {
  try {
    const url = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

    const response = await retryWithBackoff(
      () =>
        axios.post(url, {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      3,
      1000
    );

    const token = response.data.id_token;
    const expiresIn = response.data.expires_in || TOKEN_EXPIRATION_TIME;
    const expirationTime = Date.now() + parseInt(expiresIn) * 1000;

    return {
      token,
      expirationTime,
    };
  } catch (error) {
    const errorInfo = parseError(error);
    const err = new Error(errorInfo.message);
    err.type = errorInfo.type;
    err.retry = errorInfo.retry;
    throw err;
  }
}

// Check if token is expired
export function isTokenExpired(expirationTime) {
  if (!expirationTime) return true;
  // Refresh if less than 5 minutes left
  return Date.now() >= expirationTime - 5 * 60 * 1000;
}