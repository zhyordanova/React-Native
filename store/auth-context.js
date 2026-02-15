import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState, useContext } from "react";
import { refreshAuthToken, isTokenExpired } from "../util/auth";

export const AuthContext = createContext({
  token: "",
  userId: "",
  isAuthenticated: false,
  isInitializing: true,
  authenticate: (token, refreshToken, userId, expirationTime) => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [userId, setUserId] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expirationTime, setExpirationTime] = useState();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUserId = await AsyncStorage.getItem("userId");
        const storedRefreshToken = await AsyncStorage.getItem("refreshToken");
        const storedExpirationTime = await AsyncStorage.getItem(
          "tokenExpirationTime",
        );

        if (storedToken && storedExpirationTime) {
          const expirationTimeNum = parseInt(storedExpirationTime);

          // Check if token is expired and try to refresh
          if (isTokenExpired(expirationTimeNum) && storedRefreshToken) {
            try {
              const refreshed = await refreshAuthToken(storedRefreshToken);
              setAuthToken(refreshed.token);
              setExpirationTime(refreshed.expirationTime);
              await AsyncStorage.setItem("token", refreshed.token);
              await AsyncStorage.setItem(
                "tokenExpirationTime",
                refreshed.expirationTime.toString(),
              );
            } catch (refreshError) {
              console.error("Token refresh failed, logging out:", refreshError);
              await logout();
            }
          } else if (!isTokenExpired(expirationTimeNum)) {
            // Token is still valid
            setAuthToken(storedToken);
            setUserId(storedUserId);
            setExpirationTime(expirationTimeNum);
            if (storedRefreshToken) {
              setRefreshToken(storedRefreshToken);
            }
          }
        }
      } catch (error) {
        console.error("Failed to load auth token from storage:", error);
      } finally {
        setIsInitializing(false);
      }
    }
    fetchToken();
  }, []);

  async function authenticate(token, refreshTokenValue, userIdValue, expirationTimeValue) {
    try {
      setAuthToken(token);
      setRefreshToken(refreshTokenValue);
      setUserId(userIdValue);
      setExpirationTime(expirationTimeValue);

      await AsyncStorage.setItem("token", token);
      if (refreshTokenValue) {
        await AsyncStorage.setItem("refreshToken", refreshTokenValue);
      }
      if (userIdValue) {
        await AsyncStorage.setItem("userId", userIdValue);
      }
      await AsyncStorage.setItem(
        "tokenExpirationTime",
        expirationTimeValue.toString(),
      );
    } catch (error) {
      console.error("Failed to save auth token to storage:", error);
      setAuthToken(null);
      setRefreshToken(null);
      setUserId(null);
      setExpirationTime(null);
      throw error;
    }
  }

  async function logout() {
    try {
      setAuthToken(null);
      setRefreshToken(null);
      setUserId(null);
      setExpirationTime(null);
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("tokenExpirationTime");
    } catch (error) {
      console.error("Failed to remove auth token from storage:", error);
    }
  }

  const value = {
    token: authToken,
    userId: userId,
    isAuthenticated: !!authToken,
    isInitializing,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
