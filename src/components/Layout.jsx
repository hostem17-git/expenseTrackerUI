import { Link, NavLink, Outlet, useNavigate } from "react-router";
import axios from "axios";
import apiRequest from "../lib/apiRequest";

export default function Layout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await apiRequest.get("/auth/signout", {
        withCredentials: true,
      });

      navigate("/ ");
      // useSendNotification("logged out");
      console.log("logout clicked");
    } catch (error) {
      // useCustomErrorHandler(error);
    }
  };

  return (
    <div className="flex flex-col h-svh">
      <div className="flex justify-between bg-emerald-100 px-2 fixed top-0 left-0 right-0">
        {/* Header */}
        <nav className="flex ">
          <Link
            className="cursor-pointer flex items-center justify-center"
            to="/"
          >
            <h1 className="py-1 mr-2 text-xl font-bold h-full">
              <div className="text-lg md:text-xl font-bold text-[#25D366]">
                Whats
                <span className="text-white drop-shadow-[0_0_2px_#25D366]">
                  Pense
                </span>
              </div>
            </h1>
          </Link>

          {/* TODO: handle active path */}
          <ul className="sm:flex items-center hidden">
            <li className=" flex items-center mx-1 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <NavLink className={(isActive) => `py-2 mx-1 `} to="/user">
                My profile
              </NavLink>
            </li>
            <li className=" flex items-center mx-1 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <NavLink className={(isActive) => `py-2 mx-1 `} to="/expenses">
                Expenses
              </NavLink>
            </li>
          </ul>
        </nav>
        <div
          onClick={handleLogout}
          className="flex items-center rounded-md  m-1 p-1 px-2 bg-red-500 text-white outline-red-500 hover:outline hover:text-red-500 hover:bg-white cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
            />
          </svg>
          <span className="ml-2 hidden sm:inline">Logout</span>
        </div>
      </div>

      <div className="flex-1 outletcontainer pt-10 flex flex-col w-full">
        <Outlet />
      </div>

      {/* Footer */}
      <>
        <div className="bg-emerald-100 py-1 flex sm:hidden">
          <ul className=" flex items-center w-full justify-around">
            <li className="flex flex-col items-center justify-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>

              <NavLink to="/expenses">Expenses</NavLink>
            </li>
            <li className="flex flex-col items-center justify">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>

              <NavLink to="/user">My profile</NavLink>
            </li>
          </ul>
        </div>

        <div className=" hidden sm:flex w-svw items-center justify-center bg-emrald-50">
          ©2024
        </div>
      </>
    </div>
  );
}
