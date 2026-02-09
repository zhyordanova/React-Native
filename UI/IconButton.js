import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../constants/styles";

const { borderRadius, spacing } = GlobalStyles;

function IconButton({ icon, size, color, onPress, accessibilityLabel }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

export default React.memo(IconButton);

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: borderRadius.xl,
    padding: spacing.sm,
    marginHorizontal: spacing.sm,
    marginVertical: spacing.xxs,
  },
  pressed: {
    opacity: 0.75,
  },
});
