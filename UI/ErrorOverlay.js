import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../constants/styles";
import Button from "./Button";

const { colors } = GlobalStyles;
const { fontSize, fontWeight } = GlobalStyles.typography;

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button style={styles.button} onPress={onConfirm}>
        Okay
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
    padding: 24,
    backgroundColor: colors.primary700,
  },
  button: {
    marginTop: 20,
  },
  text: {
    color: colors.white,
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: fontSize.large,
    fontWeight: fontWeight.bold,
  },
});
