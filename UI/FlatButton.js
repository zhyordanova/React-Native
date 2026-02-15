import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../constants/styles";
import { getAccessibilityLabel } from "../util/helpers";

const { colors, spacing } = GlobalStyles;

function FlatButton({ children, onPress }) {
  const accessibilityLabel = getAccessibilityLabel(children);
  
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default React.memo(FlatButton);

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: colors.primary100,
  },
});
