import { useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../../components/Auth/AuthContent";
import { createUser } from "../../util/auth";
import { useAuth } from "../../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [lastError, setLastError] = useState(null);
  const authCtx = useAuth();

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    setLastError(null);

    try {
      const authData = await createUser(email, password);
      authCtx.authenticate(
        authData.token,
        authData.refreshToken,
        authData.expirationTime,
      );
    } catch (error) {
      const errorMessage = error.message || "Sign up failed. Please try again.";
      setLastError(error);

      let alertTitle = "Sign Up Failed";
      let alertMessage = errorMessage;
      let alertButtons = [{ text: "OK", onPress: () => {} }];

      // Add retry button for network errors
      if (error.retry) {
        alertButtons.unshift({
          text: "Retry",
          onPress: () => signupHandler({ email, password }),
        });
      }

      Alert.alert(alertTitle, alertMessage, alertButtons);
      setIsAuthenticating(false);
    }
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
