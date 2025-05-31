import React, { useCallback, useState, useEffect } from "react";
import { NavLink } from "react-router";
import Auth from "./Auth";
import ButtonGreenGradient from "../components/ButtonGreenGradient";
import ToastManager from "../components/ToastManager";

function Home() {
  const [showAuth, setShowAuth] = useState(false);
  
  const checkTokenAndRedirect = useCallback(function () {
    console.log("Checking token in cookies...");
 
    if (document.cookie.includes("token=")) {
      window.location.href="/expenses";
    }
  }, []);

  // Move the token check to useEffect to avoid calling it on every render
  useEffect(() => {
    checkTokenAndRedirect();
  }, [checkTokenAndRedirect]);

  return (
    <div className="bg-[url(/homeBGdark.png)] bg-black w-full h-dvh flex flex-col items-center justify-center relative px-6">
      {/* Authentication Modal */}
      {showAuth && <Auth setShowAuth={setShowAuth} />}

      {/* Branding Section */}
      <div className="relative flex flex-col items-center p-8 bg-white/20 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-lg text-center w-full max-w-lg">
        {/* WhatsPense Logo */}
        <div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#128C7E] tracking-wide drop-shadow-xl">
            Whats
            <span className="text-white drop-shadow-[0_0_8px_#128C7E]">
              Pense
            </span>
          </h1>
        </div>

        <p className="text-xs text-white/60">Manage expenses effortlessly</p>
        {/* Tagline / Description */}
        <p className="mt-8 text-lg md:text-xl text-white/90 font-medium leading-relaxed">
          Your finances, simplified with a touch of WhatsApp magic.
        </p>

        {/* Decorative Line */}
        <div className="w-16 h-1 bg-[#25D366] rounded-full mt-4"></div>
      </div>

      {/* Feature Images */}
      <div className="mt-8 flex gap-4 justify-center items-center">
        <img className="w-24 h-32 object-contain" src="/messages.png" alt="messages" />
        <img className="w-24 h-32 object-contain" src="/charts.png" alt="charts" />
      </div>

      {/* CTA Button */}
      <div className="mt-8">
        <ButtonGreenGradient
          onClick={() => setShowAuth(!showAuth)}
          buttonText={"Get Started"}
        />
      </div>

      <ToastManager position="bottom-right" />
    </div>
  );
}

export default Home;