import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../constants/styles";
import { STRINGS } from "../constants/strings";
import Button from "./Button";

const { colors, spacing, typography } = GlobalStyles;

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>{STRINGS.errors.occurred}</Text>
      <Text style={styles.text}>{message}</Text>
      <Button style={styles.button} onPress={onConfirm}>
        {STRINGS.buttons.okay}
      </Button>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
    backgroundColor: colors.primary700,
  },
  button: {
    marginTop: 20,
  },
  text: {
    color: colors.white,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.large,
    fontWeight: "bold",
  },
});
