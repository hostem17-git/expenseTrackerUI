import React, { useState } from "react";
import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router";

function Auth(props) {
  const [showSignIn, setShowSignIn] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        navigate("/expense");
        // UseNotification
      }
    } catch (error) {
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

  return (
    <div
      onClick={hideAuth}
      className="absolute w-full h-full bg-teal-100/60 flex items-center justify-center z-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="border-emerald-200 border w-1/4 shadow-lg rounded-sm bg-emerald-50 min-h-1/3 min-w-75 flex flex-col justify-around"
      >
        {/* Tab Switch */}
        <div className="flex ">
          <button
            className={`p-2 w-1/2 text-center ${
              showSignIn
                ? "border-b-2 border-[#25D366] font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setShowSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={`p-2 w-1/2 text-center ${
              !showSignIn
                ? "border-b-2 border-[#25D366] font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setShowSignIn(false)}
          >
            Sign Up
          </button>
        </div>

        <div className="my-2">
          {showSignIn ? (
            <form className="flex flex-col">
              <input
                name="email"
                type="text"
                placeholder="email"
                className="p-2 border-b-1 border-emerald-200 outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="p-2 border-b-1 border-emerald-200 outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <span className="test">{error}</span>}
            </form>
          ) : (
            <form className="flex flex-col">
              <input
                name="username"
                type="text"
                placeholder="Username"
                className="p-2 border-b-1 border-emerald-200 outline-none"
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                name="Email"
                type="text"
                placeholder="Email"
                className="p-2 border-b-1 border-emerald-200 outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="p-2 border-b-1 border-emerald-200 outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <span className="test">{error}</span>}
            </form>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={showSignIn ? signIn : signUp}
            className="cursor-pointer py-1 px-2 rounded-full font-semibold text-lg text-white bg-green-400 w-1/4 hover:outline hover:text-green-400 hover:bg-white"
          >
            {showSignIn ? "Signin" : "Sign up "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
