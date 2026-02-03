import { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { UIContext } from "../store/ui-context";
import LoadingOverlay from "./LoadingOverlay";
import ErrorOverlay from "./ErrorOverlay";

function GlobalUIOverlay() {
  const { isLoading, error, clearError } = useContext(UIContext);

  if (!isLoading && !error) {
    return null;
  }

  return (
    <View
      style={styles.overlay}
      pointerEvents={isLoading || error ? "auto" : "none"}
    >
      {isLoading && <LoadingOverlay />}
      {!isLoading && error && (
        <ErrorOverlay message={error} onConfirm={clearError} />
      )}
    </View>
  );
}

export default GlobalUIOverlay;


const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
    }
});