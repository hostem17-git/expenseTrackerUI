import React, { useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import Dropdown from "../components/DropDown";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";

function Expenses() {
  const formatDate = (date) => date.toISOString().split("T")[0];

  const [dropdownValue, setDropdownValue] = useState("Today");
  const [data, setData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);

  const [selectedSlice, setSelectedSlice] = useState(null);

  const handleSliceClick = (slice) => {
    console.log("Clicked slice:", slice);
    setSelectedSlice(slice.id); // Store clicked slice
  };

  const currentDate = new Date();

  const [endDate, setEndDate] = useState(formatDate(currentDate));

  const [startDate, setStartDate] = useState(
    formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))
  );

  const setRange = (type) => {
    let start, end;
    const today = new Date();
    switch (type) {
      case "Today":
        start = end = formatDate(today);
        break;
      case "Current Week":
        const monday = new Date(today);
        monday.setDate(
          today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1)
        );
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        start = formatDate(monday);
        end = formatDate(sunday);
        break;
      case "Current Month":
        start = formatDate(new Date(today.getFullYear(), today.getMonth(), 1));
        end = formatDate(
          new Date(today.getFullYear(), today.getMonth() + 1, 0)
        );
        break;
      case "Current Quarter":
        const quarterStartMonth = Math.floor(today.getMonth() / 3) * 3;
        start = formatDate(new Date(today.getFullYear(), quarterStartMonth, 1));
        end = formatDate(
          new Date(today.getFullYear(), quarterStartMonth + 3, 0)
        );
        break;
      default:
        return;
    }
    setStartDate(start);
    setEndDate(end);
  };

  const dropDownOptions = [
    "Custom",
    "Today",
    "Current Week",
    "Current Month",
    "Current Quarter",
  ];

  useEffect(() => {
    if (dropdownValue !== "Custom") {
      setRange(dropdownValue);
    }
  }, [dropdownValue]);

  useEffect(() => {
    async function fetchSecondaryData() {
      try {
        const result = await apiRequest.get(`/expense/summary/${selectedSlice}`, {
          startDate,
          endDate,
          limit: "10000",
        });
        setSecondaryData(result?.data?.data);
        console.log(result?.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (selectedSlice) {
      fetchSecondaryData();
    }
  }, [selectedSlice]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await apiRequest.get("/expense", {
          startDate,
          endDate,
          limit: "10000",
        });
        setData(result?.data?.data);
        console.log(result.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fecthSummaryData() {
      try {
        const result = await apiRequest.get("/expense/summary", {
          startDate,
          endDate,
          limit: "10000",
        });
        setSummaryData(result?.data?.data);
        console.log(result?.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    fecthSummaryData();

    console.log(startDate);
  }, [startDate, endDate]);

  return (
    <div className="w-full p-4 flex-1 flex outline-green-500 outline ">
      <div className=" bg-black/10 backdrop-blur-xs w-full flex-1 flex flex-grow flex-wrap-reverse max-h-[85svh] overflow-y-scroll overflow-x-hidden">
        <div className="left w-full md:w-1/2 h-full outline min-w-80 min-h-52 max-h-svh overflow-y-scroll overflow-x-hidden">
          <div className="date_container outline flex flex-wrap items-center justify-evenly text-white">
            <Dropdown
              options={dropDownOptions}
              onSelect={setDropdownValue}
              defaultOption={dropdownValue}
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
          </div>

          <ExpenseList expenses={data} onSave={() => console.log("HI")} />
        </div>
        <div className="right w-full md:w-1/2 h-full outline min-w-80 min-h-52 max-h-svh">
          <ExpenseChart data={summaryData} onSliceClick={handleSliceClick} />

          <ExpenseChart data={secondaryData} onSliceClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default Expenses;
