import { useState, useMemo, useCallback } from "react";

export const usePagination = (initialRowsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [totalPages, setTotalPages] = useState(0);

  const offset = useMemo(() => (currentPage - 1) * rowsPerPage, [currentPage, rowsPerPage]);

  const updateTotalPages = useCallback((totalItems) => {
    setTotalPages(Math.ceil(totalItems / rowsPerPage));
  }, [rowsPerPage]);

  const handleRowsPerPageChange = useCallback((newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to first page
  }, []);

  return {
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage: handleRowsPerPageChange,
    totalPages,
    offset,
    updateTotalPages,
  };
};