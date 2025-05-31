import { useState, useCallback } from "react";

export const useApiState = () => {
  const [expenses, setExpenses] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);

  const [loading, setLoading] = useState({
    expenses: false,
    summary: false,
    secondary: false,
  });

  const [errors, setErrors] = useState({
    expenses: null,
    summary: null,
    secondary: null,
  });

  const setLoadingState = useCallback((key, isLoading) => {
    setLoading(prev => ({ ...prev, [key]: isLoading }));
  }, []);

  const setErrorState = useCallback((key, error) => {
    setErrors(prev => ({ ...prev, [key]: error }));
  }, []);

  const clearData = useCallback((key) => {
    const setters = {
      expenses: setExpenses,
      summary: setSummaryData,
      secondary: setSecondaryData,
    };
    setters[key]?.(null);
    setErrorState(key, null);
  }, [setErrorState]);

  return {
    expenses,
    setExpenses,
    summaryData,
    setSummaryData,
    secondaryData,
    setSecondaryData,
    loading,
    setLoadingState,
    errors,
    setErrorState,
    clearData,
  };
};