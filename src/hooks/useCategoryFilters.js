import { useState, useEffect, useCallback } from "react";

export const useCategoryFilters = () => {
  const [primaryCategory, setPrimaryCategory] = useState(null);
  const [secondaryCategory, setSecondaryCategory] = useState(null);

  // Reset secondary when primary changes
  useEffect(() => {
    console.log("Primary category changed:", primaryCategory);
    setSecondaryCategory(null);
  }, [primaryCategory]);


  
  const clearFilters = useCallback(() => {
    setPrimaryCategory(null);
    setSecondaryCategory(null);
  }, []);

  return {
    primaryCategory,
    setPrimaryCategory,
    secondaryCategory,
    setSecondaryCategory,
    clearFilters,
  };
};
