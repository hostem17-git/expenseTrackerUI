import React, { useCallback, useEffect, useMemo, useState } from "react";
import apiRequest from "../lib/apiRequest";
import Dropdown from "../components/DropDown";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import Pagination from "../components/Pagination";
import IconButton from "../components/IconButton";
import { formatDate, primaryCategories, secondaryCategories } from "../lib/utils";

function Expenses() {


  const [dropdownValue, setDropdownValue] = useState("Current Week");
  const [data, setData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [primaryCategory, setPrimaryCategory] = useState(null);
  const [secondaryCategory, setSecondaryCategory] = useState(null);
  const [totalPages, setTotalPages] = useState(100);
  const [dataloading, setDataLoading] = useState(false);

  const dropDownOptions = [
    "Custom",
    "Today",
    "Current Week",
    "Current Month",
    "Current Quarter",
  ];
  const currentDate = new Date();
  const [endDate, setEndDate] = useState(formatDate(currentDate));

  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(
      today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1)
    );
    return formatDate(monday);
  });

  const fetchExpenses = useCallback(
    async (startDate, endDate, primarycategory, secondarycategory) => {
      setData(null);
      try {
        const result = await apiRequest.get("/expense", {
          params: {
            startDate,
            endDate,
            limit: rowsPerPage,
            offset: (currentPage - 1) * rowsPerPage,
            primarycategory,
            secondarycategory,
          },
        });
        console.log("Fetch Expenses");
        setData(result?.data?.data?.payload.expenses);

        console.log("--------------------", result?.data?.data?.rowCount);
        setTotalPages(Math.floor(result?.data?.data?.rowCount / rowsPerPage));
      } catch (error) {
        console.error(error);
      }
    }
  );

  const fetchPrimarySummary = useCallback(async (startDate, endDate) => {
    try {
      setSummaryData(null);
      const result = await apiRequest.get("/expense/summary", {
        params: {
          startDate,
          endDate,
        },
      });
      setSummaryData(result?.data?.data);
    } catch (error) {
      console.error(error);
    }
  });

  const fetchSecondayCategoryData = useCallback(
    async (startDate, endDate, primaryCategory) => {
      try {
        setSecondaryData(null);
        const result = await apiRequest.get(
          `/expense/summary/${primaryCategory}`,
          {
            params: {
              startDate,
              endDate,
              limit: "10000",
            },
          }
        );
        setSecondaryData(result?.data?.data);
      } catch (error) {
        console.error(error);
      }
    }
  );

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
  });

  // Update Range on dropdown selection
  useEffect(() => {
    if (dropdownValue !== "Custom") {
      setRange(dropdownValue);
    }
  }, [dropdownValue]);

  useEffect(() => {
    console.log("--------------------------");

    console.log(
      startDate,
      endDate,
      primaryCategory,
      secondaryCategory,
      rowsPerPage,
      currentPage
    );

    const getData = async () => {
      setDataLoading(true);
      await fetchExpenses(
        startDate,
        endDate,
        primaryCategory,
        secondaryCategory
      );
      await fetchPrimarySummary(startDate, endDate);
      if (primaryCategory) {
        await fetchSecondayCategoryData(startDate, endDate, primaryCategory);
      }
      setDataLoading(false);
    };

    if (dropdownValue !== "Custom") getData();
  }, [
    startDate,
    endDate,
    primaryCategory,
    secondaryCategory,
    rowsPerPage,
    currentPage,
  ]);

  useEffect(() => {
    setSecondaryCategory(null);
  }, [primaryCategory]);

  return (
    <div className="w-full p-2 md:p-4 flex-1 flex ">
      <div className=" bg-black/35 backdrop-blur-xs w-full flex-1 flex flex-grow flex-wrap-reverse max-h-[85svh] overflow-y-scroll overflow-x-hidden thin-translucent-scrollbar">
        <div className="left w-full md:w-1/2 h-full outline min-w-80 min-h-52 max-h-svh overflow-y-scroll overflow-x-hidden scroll thin-translucent-scrollbar relative">
          <div className="date_container outline flex flex-wrap items-center justify-evenly text-white">
            <Dropdown
              options={dropDownOptions}
              onSelect={setDropdownValue}
              defaultOption={dropdownValue}
              value={dropdownValue}
            />
            <div className="flex flex-1 w-fit px-2 items-center ">
              <span className="font-semibold mr-2">Start</span>
              <input
                type="date"
                value={startDate}
                disabled={!(dropdownValue == "Custom")}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                className={`bg-gray-100/5 p-2  cursor-pointer inset-shadow-m ${
                  dropdownValue == "Custom" ? "hover:bg-gray-100/20 " : ""
                }`}
              />
            </div>

            <div className="flex flex-1 items-center w-fit px-2 ">
              <span className="font-semibold mr-2">End</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                disabled={!(dropdownValue == "Custom")}
                className={`bg-gray-100/5 p-2  cursor-pointer inset-shadow-m ${
                  dropdownValue == "Custom" ? "hover:bg-gray-100/20 " : ""
                }`}
              />
            </div>

            {dropdownValue == "Custom" && (
              <IconButton
                buttonContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                }
                onClick={() => {
                  fetchExpenses(startDate, endDate);
                  fetchPrimarySummary(startDate, endDate);
                }}
              />
            )}
            <br />
            <Dropdown
              options={primaryCategories}
              onSelect={setPrimaryCategory}
              placeholder={"Primary category"}
              value={primaryCategory}
            />

            <Dropdown
              options={secondaryCategories}
              onSelect={setSecondaryCategory}
              placeholder={"Secondary category"}
              value={secondaryCategory}
            />
          </div>

          <ExpenseList expenses={data} onSave={() => console.log("HI")} />

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
        <div className="right w-full md:w-1/2 h-full outline min-w-80 min-h-52 max-h-svh flex flex-col">
          <ExpenseChart
            data={summaryData}
            onSliceClick={setPrimaryCategory}
            type="primary"
            dataloading={dataloading}
          />
          <ExpenseChart
            data={secondaryData}
            onSliceClick={setSecondaryCategory}
            type="secondary"
            dataloading={dataloading}
          />
        </div>
      </div>
    </div>
  );
}

export default Expenses;
