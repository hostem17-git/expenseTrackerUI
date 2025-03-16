// sticky bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xs
import React from "react";

const Pagination = ({ currentPage, totalPages, rowsPerPage, setRowsPerPage, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxButtons = 5; // Number of visible page buttons

    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) pages.push("...");
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < totalPages - 1) pages.push("...");

    return [1, ...pages, totalPages];
  };

  return (
    <div className="flex justify-center mt-4 sticky bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xs">
      <div className="flex justify-center items-center w-full px-4 py-2 backdrop-blur-md bg-black/40 border border-white/10 shadow-lg">
        {/* Previous Button */}
        <button
          className={`px-3 py-1 rounded-md ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-white/20"
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-3 py-1 text-white">...</span>
          ) : (
            <button
              key={page}
              className={`px-3 py-1 rounded-md transition ${
                page === currentPage
                  ? "bg-white text-black font-bold"
                  : "hover:bg-white/20 text-white"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-white/20"
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ▶
        </button>

        {/* Dropdown for Rows Per Page (Placed next to Next Button) */}
        <select
          className="ml-2 px-2 py-1 bg-black/50 text-white border border-white/20 rounded-md backdrop-blur-md cursor-pointer"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
