import { useCallback } from "react";
import apiRequest from "../lib/apiRequest";

export const useExpenseApi = (apiState, pagination) => {
  const { 
    setExpenses, 
    setSummaryData, 
    setSecondaryData,
    setLoadingState,
    setErrorState,
    clearData 
  } = apiState;
  
  const { updateTotalPages, offset, rowsPerPage } = pagination;

  const fetchExpenses = useCallback(async (params) => {
    const { startDate, endDate, primaryCategory, secondaryCategory } = params;
    
    clearData('expenses');
    setLoadingState('expenses', true);
    
    try {
      const result = await apiRequest.get("/expense", {
        params: {
          startDate,
          endDate,
          limit: rowsPerPage,
          offset,
          primarycategory: primaryCategory,
          secondarycategory: secondaryCategory,
        },
      });
      
      const responseData = result?.data?.data;
      if (responseData?.payload?.expenses) {
        setExpenses(responseData.payload.expenses);
        updateTotalPages(responseData.rowCount || 0);
      } else {
        setExpenses([]);
        updateTotalPages(0);
      }
      
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      setErrorState('expenses', error.message);
      setExpenses([]);
    } finally {
      setLoadingState('expenses', false);
    }
  }, [rowsPerPage, offset, clearData, setLoadingState, setExpenses, setErrorState, updateTotalPages]);

  const fetchPrimarySummary = useCallback(async (startDate, endDate) => {
    clearData('summary');
    setLoadingState('summary', true);
    
    try {
      const result = await apiRequest.get("/expense/summary", {
        params: { startDate, endDate },
      });
      setSummaryData(result?.data?.data || null);
    } catch (error) {
      console.error("Failed to fetch primary summary:", error);
      setErrorState('summary', error.message);
    } finally {
      setLoadingState('summary', false);
    }
  }, [clearData, setLoadingState, setSummaryData, setErrorState]);

  const fetchSecondarySummary = useCallback(async (startDate, endDate, primaryCategory) => {
    if (!primaryCategory) return;
    
    clearData('secondary');
    setLoadingState('secondary', true);
    
    try {
      const result = await apiRequest.get(`/expense/summary/${primaryCategory}`, {
        params: { startDate, endDate, limit: "10000" },
      });
      setSecondaryData(result?.data?.data || null);
    } catch (error) {
      console.error("Failed to fetch secondary summary:", error);
      setErrorState('secondary', error.message);
    } finally {
      setLoadingState('secondary', false);
    }
  }, [clearData, setLoadingState, setSecondaryData, setErrorState]);

  return {
    fetchExpenses,
    fetchPrimarySummary,
    fetchSecondarySummary,
  };
};
