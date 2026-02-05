import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { GlobalStyles } from "../constants/styles";

function Input({
  label,
  invalid,
  isInvalid,
  style,
  textInputConfig,
  errorText,
  onUpdateValue,
  value,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  const isInvalidField = invalid || isInvalid;
  if (isInvalidField) {
    inputStyles.push(styles.invalidInput);
  }

  const isPasswordField = textInputConfig?.secureTextEntry;
  if (isPasswordField) {
    inputStyles.push(styles.passwordInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, isInvalidField && styles.invalidLabel]}>
        {label}
      </Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={inputStyles}
          onChangeText={onUpdateValue}
          value={value}
          {...textInputConfig}
          secureTextEntry={isPasswordField && !isPasswordVisible}
          accessibilityLabel={label}
          accessibilityHint={errorText || ""}
        />
        {isPasswordField && (
          <Pressable
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            accessibilityLabel={
              isPasswordVisible ? "Hide password" : "Show password"
            }
            accessibilityHint="Toggle password visibility"
            accessibilityRole="button"
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color={GlobalStyles.colors.primary700}
            />
          </Pressable>
        )}
      </View>
      {!!errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  inputWrapper: {
    position: "relative",
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: GlobalStyles.colors.primary100,
    fontWeight: "500",
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 6,
    fontSize: 16,
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 8,
    padding: 4,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: "#ff6b9d",
    fontWeight: "600",
  },
  invalidInput: {
    backgroundColor: "#ffd9e8",
    borderColor: "#ff6b9d",
    borderWidth: 2,
  },
  errorText: {
    marginTop: 6,
    color: "#ff6b9d",
    fontSize: 13,
    fontWeight: "600",
    backgroundColor: "rgba(255, 107, 157, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});
