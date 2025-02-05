import React, { useState } from "react";

function User() {
  const [userData, setUserData] = useState();
  return (
    <div className="min-h-full bg-teal-50 flex items-center justify-center">
      {/* container */}
      <div className=" border-blue-100 border-2 p-5 rounded-lg sm:w-3/4">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-20 h-20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <div className=" text-xl font-semibold flex items-center">
            {userData?.username}
          </div>
        </div>

        {/* {facebook} */}
        <hr></hr>
      </div>
    </div>
  );
}

export default User;
