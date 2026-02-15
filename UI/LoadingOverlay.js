import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../constants/styles";

const { colors, spacing, typography } = GlobalStyles;

function LoadingOverlay({ message }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.white} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
    backgroundColor: colors.primary700,
  },
  message: {
    marginTop: spacing.lg,
    color: colors.white,
    fontSize: typography.fontSize.medium,
    textAlign: "center",
  },
});