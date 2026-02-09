import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../constants/styles";
import { getAccessibilityLabel } from "../util/helpers";

const { colors, spacing, borderRadius } = GlobalStyles;

function Button({ children, onPress, mode, style }) {
  const accessibilityLabel = getAccessibilityLabel(children);

  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default React.memo(Button);

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    backgroundColor: colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: colors.white,
    textAlign: "center",
  },
  flatText: {
    color: colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: colors.primary100,
    borderRadius: borderRadius.sm,
  },
});
