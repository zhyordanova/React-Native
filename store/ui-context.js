import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

export const UIContext = createContext({
  isLoading: false,
  error: null,
  setLoading: (isLoading) => {},
  setError: (message) => {},
  clearError: () => {},
});

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within UIContextProvider");
  }
  return context;
}

function UIContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrorState] = useState(null);

  const setLoading = useCallback((loading) => {
    setIsLoading(loading);
  }, []);

  const setError = useCallback((message) => {
    setErrorState(message);
  }, []);

  const clearError = useCallback(() => {
    setErrorState(null);
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      error,
      setLoading,
      setError,
      clearError,
    }),
    [isLoading, error],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export default UIContextProvider;
