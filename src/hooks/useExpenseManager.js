import { useEffect, useMemo, useCallback } from "react";
import { useDateRange } from "./useDateRange";
import { usePagination } from "./usePagination";
import { useCategoryFilters } from "./useCategoryFilters";
import { useApiState } from "./useAPIstate";
import { useExpenseApi } from "./useExpenseAPI";

export const useExpenseManager = () => {
  const dateRange = useDateRange();
  const pagination = usePagination();
  const categoryFilters = useCategoryFilters();
  const apiState = useApiState();

  const api = useExpenseApi(apiState, pagination);

  // Combined fetch parameters
  const fetchParams = useMemo(
    () => ({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      primaryCategory: categoryFilters.primaryCategory,
      secondaryCategory: categoryFilters.secondaryCategory,
    }),
    [
      dateRange.startDate,
      dateRange.endDate,
      categoryFilters.primaryCategory,
      categoryFilters.secondaryCategory,
    ]
  );

  // Main data fetching
  useEffect(() => {
    // if (dateRange.dropdownValue === "Custom") return;

    api.fetchExpenses(fetchParams);

    if (categoryFilters.primaryCategory) {
      api.fetchSecondarySummary(
        dateRange.startDate,
        dateRange.endDate,
        categoryFilters.primaryCategory
      );
    }
  }, [
    fetchParams,
    pagination.currentPage,
    pagination.rowsPerPage,
    categoryFilters.primaryCategory,
  ]);

  // Summary fetching
  useEffect(() => {
    if (dateRange.dropdownValue !== "Custom") {
      api.fetchPrimarySummary(dateRange.startDate, dateRange.endDate);
    }
  }, [dateRange.startDate, dateRange.endDate, dateRange.dropdownValue]);

  // Custom search handler
  const handleCustomSearch = useCallback(() => {
    console.log("Custom search triggered");
    api.fetchExpenses(fetchParams);
    api.fetchPrimarySummary(dateRange.startDate, dateRange.endDate);
  }, [fetchParams, dateRange.startDate, dateRange.endDate]);

  return {
    dateRange,
    pagination,
    categoryFilters,
    apiState,
    handleCustomSearch,
  };
};
