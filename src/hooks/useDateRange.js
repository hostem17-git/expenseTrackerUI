import { useState, useEffect, useCallback, useMemo } from "react";
import { formatDate } from "../lib/utils";

export const useDateRange = (initialDropdownValue = "Current Week") => {
  const [dropdownValue, setDropdownValue] = useState(initialDropdownValue);
  const currentDate = useMemo(() => new Date(), []);
  const [endDate, setEndDate] = useState(formatDate(currentDate));
  
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(
      today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1)
    );
    return formatDate(monday);
  });

  const setRange = useCallback((type) => {
    let start, end;
    const today = new Date();
    
    switch (type) {
      case "Today":
        start = formatDate(today);
        break;
      case "Current Week":
        const monday = new Date(today);
        monday.setDate(
          today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1)
        );
        start = formatDate(monday);
        break;
      case "Current Month":
        start = formatDate(new Date(today.getFullYear(), today.getMonth(), 1));
        break;
      case "Current Quarter":
        const quarterStartMonth = Math.floor(today.getMonth() / 3) * 3;
        start = formatDate(new Date(today.getFullYear(), quarterStartMonth, 1));
        break;
      default:
        return;
    }
    end = formatDate(today);
    setStartDate(start);
    setEndDate(end);
  }, []);

  useEffect(() => {
    if (dropdownValue !== "Custom") {
      setRange(dropdownValue);
    }
  }, [dropdownValue, setRange]);

  const isCustomRange = dropdownValue === "Custom";

  return {
    dropdownValue,
    setDropdownValue,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setRange,
    isCustomRange,
  };
};
