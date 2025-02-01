import React from "react";
import { NavLink } from "react-router";

function Home() {
  return (
    <div className="bg-[url(/homeBG.png)] w-full h-dvh flex flex-col items-center justify-around">
      <div className="flex flex-col items-center">
        <div className="text-7xl font-bold text-[#25D366]">
          Whats
          <span className="text-white drop-shadow-[0_0_2px_#25D366]">
            Pense
          </span>
        </div>
        <div className="text-xl mt-10 test"> Expense tracking made easy!</div>
      </div>

      <NavLink to="/auth">
        <button className="cursor-pointer p-2 rounded-full font-semibold text-lg text-white bg-green-400  hover:outline hover:text-green-400 hover:bg-white">
          Get started!
        </button>
      </NavLink>
    </div>
  );
}
export default Home;
