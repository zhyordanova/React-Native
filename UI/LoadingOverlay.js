import { ActivityIndicator, StyleSheet, View } from "react-native";

import { GlobalStyles } from "../constants/styles";

const { colors, spacing } = GlobalStyles;

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={GlobalStyles.colors.white} />
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
});