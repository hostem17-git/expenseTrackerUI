import React, { useState } from "react";
import { NavLink } from "react-router";
import Auth from "./Auth";

function Home() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="bg-[url(/homeBG.png)] w-full h-dvh flex flex-col items-center justify-around relative">
      {showAuth && <Auth setShowAuth={setShowAuth} />}
      <div className="flex flex-col items-center">
        <div className="text-5xl md:text-7xl font-bold text-[#25D366]">
          Whats
          <span className="text-white drop-shadow-[0_0_2px_#25D366]">
            Pense
          </span>
        </div>
        <div className="text-xl mt-10 test"> Expense tracking made easy!</div>
      </div>

      <button
        onClick={() => setShowAuth(!showAuth)}
        className="cursor-pointer p-2 rounded-full font-semibold text-lg text-white bg-green-400  hover:outline hover:text-green-400 hover:bg-white"
      >
        Get started!
      </button>
    </div>
  );
}
export default Home;
