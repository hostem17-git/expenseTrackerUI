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

  useEffect(() => {
    checkTokenAndRedirect();
  }, [checkTokenAndRedirect]);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 w-full h-screen flex flex-col relative overflow-scroll sm:overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[url(/homeBGdark.png)] bg-cover bg-center opacity-30"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-8 left-8 w-24 h-24 bg-[#25D366] rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-16 right-16 w-32 h-32 bg-[#128C7E] rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full opacity-5 blur-2xl animate-pulse delay-500"></div>

      {/* Authentication Modal */}
      {showAuth && <Auth setShowAuth={setShowAuth} />}

      {/* Main Content Container */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-4">
        
        {/* Logo Section - Compact */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] via-[#128C7E] to-[#25D366] tracking-tight mb-2 drop-shadow-2xl">
            Whats
            <span className="text-white drop-shadow-[0_0_20px_#25D366]">
              Pense
            </span>
          </h1>
          <p className="text-sm text-gray-300 font-medium tracking-wider">
            Expense Management Reimagined
          </p>
        </div>

        {/* Hero Images Section - Compact Grid */}
        <div className="flex-1 w-full max-w-5xl flex items-center justify-center mb-6">
          <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
            
            {/* Messages Feature */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 h-full">
                <div className="flex flex-col items-center text-center h-full justify-center">
                  <div className="mb-4 p-3 bg-[#25D366]/20 rounded-xl">
                    <img 
                      className="w-32 h-40 md:w-40 md:h-48 object-contain drop-shadow-xl" 
                      src="/messages.png" 
                      alt="Smart messaging interface" 
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">Smart Messaging</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Chat with your expenses like you chat with friends
                  </p>
                </div>
              </div>
            </div>

            {/* Charts Feature */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#128C7E] to-[#25D366] rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 h-full">
                <div className="flex flex-col items-center text-center h-full justify-center">
                  <div className="mb-4 p-3 bg-[#128C7E]/20 rounded-xl">
                    <img 
                      className="w-32 h-40 md:w-40 md:h-48 object-contain drop-shadow-xl" 
                      src="/charts.png" 
                      alt="Visual analytics dashboard" 
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">Visual Analytics</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Beautiful insights that bring your data to life
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section - Compact */}
        <div className="text-center">
          <div className="mb-2">
            <ButtonGreenGradient
              onClick={() => setShowAuth(!showAuth)}
              buttonText={"Start Your Journey"}
            />
          </div>
          <p className="text-xs text-gray-400">
            Join thousands simplifying their finances
          </p>
        </div>
      </div>


      <ToastManager position="bottom-right" />
    </div>
  );
}

export default Home;