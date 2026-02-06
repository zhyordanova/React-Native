import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../constants/styles";

function FlatButton({ children, onPress }) {
  // Extract string from children for accessibility label
  const accessibilityLabel = typeof children === 'string' ? children : 'Button';
  
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
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: GlobalStyles.colors.primary100,
  },
});
