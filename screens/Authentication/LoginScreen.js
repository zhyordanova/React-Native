import { useState } from "react";
import { Alert } from "react-native";

import { STRINGS } from "../../constants/strings";
import { login } from "../../util/auth";
import { useAuth } from "../../store/auth-context";
import AuthContent from "../../components/Auth/AuthContent";

const { auth, errors } = STRINGS;

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [lastError, setLastError] = useState(null);
  const authCtx = useAuth();

  async function loginHandler({ email, password }) {
    setIsLoading(true);
    setLastError(null);

    try {
      const authData = await login(email, password);
      authCtx.authenticate(
        authData.token,
        authData.refreshToken,
        authData.expirationTime,
      );
    } catch (error) {
      const errorMessage = error.message || errors.loginFailed;
      setLastError(error);

      let alertTitle = auth.alerts.loginFailed;
      let alertMessage = errorMessage;
      let alertButtons = [{ text: auth.buttons.ok, onPress: () => {} }];

      // Add retry button for network errors
      if (error.retry) {
        alertButtons.unshift({
          text: auth.buttons.retry,
          onPress: () => loginHandler({ email, password }),
        });
      }

      Alert.alert(alertTitle, alertMessage, alertButtons);
      setIsLoading(false);
    }
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
