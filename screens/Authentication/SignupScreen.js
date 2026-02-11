import { useState } from "react";
import { Alert } from "react-native";

import { STRINGS } from "../../constants/strings";
import { createUser } from "../../util/auth";
import { useAuth } from "../../store/auth-context";
import AuthContent from "../../components/Auth/AuthContent";

const { auth, errors } = STRINGS;

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
      const errorMessage = error.message || errors.signupFailed;
      setLastError(error);

      let alertTitle = auth.alerts.signupFailed;
      let alertMessage = errorMessage;
      let alertButtons = [{ text: auth.buttons.ok, onPress: () => {} }];

      // Add retry button for network errors
      if (error.retry) {
        alertButtons.unshift({
          text: auth.buttons.retry,
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
