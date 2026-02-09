import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { STRINGS } from "../../constants/strings";
import { GlobalStyles } from "../../constants/styles";
import Button from "../../UI/Button";
import Input from "../../UI/Input";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View>
      <View>
        <Input
          label={STRINGS.auth.form.emailAddress}
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          textInputConfig={{
            keyboardType: "email-address",
            autoCapitalize: "none",
          }}
          isInvalid={emailIsInvalid}
          errorText={
            emailIsInvalid ? STRINGS.auth.validation.invalidEmail : ""
          }
        />
        {!isLogin && (
          <Input
            label={STRINGS.auth.form.confirmEmailAddress}
            onUpdateValue={updateInputValueHandler.bind(this, "confirmEmail")}
            value={enteredConfirmEmail}
            textInputConfig={{
              keyboardType: "email-address",
              autoCapitalize: "none",
            }}
            isInvalid={emailsDontMatch}
            errorText={emailsDontMatch ? STRINGS.auth.validation.emailMismatch : ""}
          />
        )}
        <Input
          label={STRINGS.auth.form.password}
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          value={enteredPassword}
          textInputConfig={{
            secureTextEntry: true,
          }}
          isInvalid={passwordIsInvalid}
          errorText={
            passwordIsInvalid ? STRINGS.auth.validation.passwordLength : ""
          }
        />
        {!isLogin && (
          <Input
            label={STRINGS.auth.form.confirmPassword}
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword",
            )}
            value={enteredConfirmPassword}
            textInputConfig={{
              secureTextEntry: true,
            }}
            isInvalid={passwordsDontMatch}
            errorText={passwordsDontMatch ? STRINGS.auth.validation.passwordMismatch : ""}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? STRINGS.buttons.login : STRINGS.buttons.signup}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: GlobalStyles.spacing.lg,
  },
});
