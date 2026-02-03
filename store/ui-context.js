import { createContext, useState, useCallback } from "react";

export const UIContext = createContext({
  isLoading: false,
  error: null,
  setLoading: (isLoading) => {},
  setError: (message) => {},
  clearError: () => {},
});

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

  const value = {
    isLoading,
    error,
    setLoading,
    setError,
    clearError,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export default UIContextProvider;
