import React, { useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import Dropdown from "../components/DropDown";

function Expenses() {
  const formatDate = (date) => date.toISOString().split("T")[0];

  const [dropdownValue,setDropdownValue] = useState("Today");

  const [data, setData] = useState(null);

  const currentDate = new Date();

  const [endDate, setEndDate] = useState(formatDate(currentDate));
  
  const [startDate, setStartDate] = useState(
    formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1))
  );

  const setRangeToToday = () => {
    const today = formatDate(new Date());
    setStartDate(today);
    setEndDate(today);
  };
  const setRangeToCurrentWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); 
    
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); 
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
  
    setStartDate(formatDate(monday)); 
    setEndDate(formatDate(sunday)); 
  };
  const setRangeToMonth = () => {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    setStartDate(formatDate(firstDay));
    setEndDate(formatDate(lastDay));
  };
  const setRangeToCurrentQuarter = () => {
    const month = currentDate.getMonth();
    const quarterStartMonth = Math.floor(month / 3) * 3;
    const firstDay = new Date(currentDate.getFullYear(), quarterStartMonth, 1);
    const lastDay = new Date(
      currentDate.getFullYear(),
      quarterStartMonth + 3,
      0
    );
    setStartDate(formatDate(firstDay));
    setEndDate(formatDate(lastDay));
  };

  const dropDownOptions = [
    "Custom",
    "Today",
    "Current Week",
    "Current Month",
    "Current Quarter",
  ];

  useEffect(()=>{
    switch (dropdownValue) {
      case "Today":
        setRangeToToday();
        break;
      case "Current Week":
        setRangeToCurrentWeek();
        break;
      case "Current Month":
        setRangeToMonth();
        break;
      case "Current Quarter":
        setRangeToCurrentQuarter();
        break;
    }

  },[dropdownValue])


  useEffect(() => {
    async function fetchData() {
      try {
        const result = await apiRequest.get("/expense", {
          startDate,
          endDate,
          limit: "10000",
        });

        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    console.log(startDate);
  }, [startDate, endDate]);

  console.log(startDate, endDate);

  return (
    <div className="w-full flex-1 flex items-center justify-center p-5">
      <div className="bg-black/10 backdrop-blur-xs w-full h-full flex">
        <div className="left w-1/2 h-full outline">
          <div className="date_container outline flex items-center justify-evenly text-white">
          <Dropdown
              options={dropDownOptions}
              onSelect={setDropdownValue}
              defaultOption={dropdownValue}
            />
            <div className="flex  w-fit px-2 items-center ">
              <span className="font-semibold mr-2">Start</span>
              <input
                type="date"
                value={startDate}
                disabled={ !(dropdownValue=="Custom")}

                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                
                className={`bg-gray-100/5 p-2  cursor-pointer inset-shadow-m ${dropdownValue=="Custom"?"hover:bg-gray-100/20 ":""}`}

              />
            </div>

            <div className="flex items-center justify-between w-fit px-2 ">
              <span className="font-semibold mr-2">End</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                disabled={ !(dropdownValue=="Custom")}
                className={`bg-gray-100/5 p-2  cursor-pointer inset-shadow-m ${dropdownValue=="Custom"?"hover:bg-gray-100/20 ":""}`}
              />
            </div>


          </div>
        </div>
        <div className="right w-1/2 h-full outline"> right</div>
      </div>
    </div>
  );
}

export default Expenses;
