import React, { useState } from "react";
import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import ButtonGreenGradient from "../components/ButtonGreenGradient";
import { em } from "framer-motion/client";

function Auth(props) {
  const [showSignIn, setShowSignIn] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number,setNumber] = useState();
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const hideAuth = () => {
    props.setShowAuth(false);
  };

  const signIn = async () => {
    try {
      const result = await apiRequest.post("/auth/signin", {
        email,
        password,
      });

      console.log(result);

      if (result.status == "200") {
        navigate("/expenses");
        // UseNotification
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const signUp = async () => {
    const result = await apiRequest.post("/auth/signup", {
      username,
      password,
      email,
    });

    if (result.status == "201") {
      setShowSignIn(true);

      // UseNotification
    }

    console.log(result);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    console.log("rrrrrrrrrrr");
  };

  return (
    <div
      onClick={hideAuth}
      className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md min-h-[40vh] flex flex-col justify-between"
      >
        {/* Tab Switch */}
        <div className="flex shadow-md relative bg-gray-100 rounded-md p-1">
          <motion.div
            className="absolute top-0 bottom-0 left-0 w-1/2 bg-white rounded-md shadow-lg"
            animate={{ left: showSignIn ? "0%" : "50%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <button
            className={`flex-1 py-3 text-lg font-medium relative z-10 transition-colors ${
              showSignIn
                ? "text-green-600 font-semibold"
                : "text-gray-500 hover:text-green-600"
            }`}
            onClick={() => {
              setShowSignIn(true);
              resetForm();
            }}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-3 text-lg font-medium relative z-10 transition-colors ${
              !showSignIn
                ? "text-green-600 font-semibold"
                : "text-gray-500 hover:text-green-600"
            }`}
            onClick={() => {
              setShowSignIn(false);
              resetForm();
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Form with Animations */}
        <div className="mt-4 relative">
          <AnimatePresence mode="wait">
            {showSignIn ? (
              <motion.form
                key="signin"
                className="space-y-4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <input
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Email"
                  className="w-full p-3 shadow-md rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  className="w-full p-3 shadow-md rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <span className="text-red-500 text-sm">{error}</span>}
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                className="space-y-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <input
                  name="username"
                  type="text"
                  value={username}
                  placeholder="Username"
                  className="w-full p-3 shadow-md rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Email"
                  className="w-full p-3 shadow-md rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                <input
                  name="number"
                  type="tel"
                  value={number}
                  placeholder="Whatsapp number"
                  className="w-full p-3 shadow-md rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                  onChange={(e) => setNumber(e.target.value)}
                />

                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  className="w-full p-3 shadow-md rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <span className="text-red-500 text-sm">{error}</span>}
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <motion.div
            onClick={showSignIn ? signIn : signUp}
            className="w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ButtonGreenGradient
              onClick={showSignIn ? signIn : signUp}
              buttonText={showSignIn ? "Sign In" : "Sign Up"}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
