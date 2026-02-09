import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../constants/styles";
import { STRINGS } from "../constants/strings";

const { colors, spacing, borderRadius } = GlobalStyles;
const { fontSize, fontWeight } = GlobalStyles.typography;

function Input({
  label,
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

  if (isInvalid) {
    inputStyles.push(styles.invalidInput);
  }

  const isPasswordField = textInputConfig?.secureTextEntry;
  if (isPasswordField) {
    inputStyles.push(styles.passwordInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, isInvalid && styles.invalidLabel]}>
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
              isPasswordVisible
                ? STRINGS.auth.passwordVisibility.hide
                : STRINGS.auth.passwordVisibility.show
            }
            accessibilityHint={STRINGS.auth.passwordVisibility.toggle}
            accessibilityRole="button"
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={styles.eyeIconSize.size}
              color={styles.eyeIconColor.color}
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
    marginHorizontal: spacing.xs,
    marginVertical: spacing.md,
  },
  inputWrapper: {
    position: "relative",
  },
  label: {
    fontSize: fontSize.regular,
    marginBottom: spacing.xs,
    color: colors.primary100,
    fontWeight: fontWeight.medium,
  },
  input: {
    backgroundColor: colors.primary100,
    color: colors.primary700,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    fontSize: fontSize.medium,
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: spacing.md,
    padding: spacing.xs,
  },
  eyeIconSize: {
    size: 20,
  },
  eyeIconColor: {
    color: colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: colors.error,
    fontWeight: fontWeight.semibold,
  },
  invalidInput: {
    backgroundColor: colors.errorLight,
    borderColor: colors.error,
    borderWidth: 2,
  },
  errorText: {
    marginTop: spacing.sm,
    color: colors.error,
    fontSize: fontSize.small,
    fontWeight: fontWeight.semibold,
    backgroundColor: colors.errorBackground,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
});
