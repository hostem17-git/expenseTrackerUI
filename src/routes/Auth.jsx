import React, { useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import ButtonGreenGradient from "../components/ButtonGreenGradient";
import { useNotifier } from "../hooks/useNotifier";
import OTPInput from "../components/OTP/OTP";
import { i } from "framer-motion/client";
import ResendOTP from "../components/OTP/ResendOTP";

function Auth(props) {
  const [countryCode, setCountryCode] = useState("+91"); // Default India
  const [number, setNumber] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [otpSent, setOTPSent] = useState(false);
  const [otp, setOTP] = useState("");

  const navigate = useNavigate();
  const notify = useNotifier();

  const hideAuth = () => {
    props.setShowAuth(false);
  };

  const getOTP = async () => {
    if (!number || number.length !== 10) {
      setError("Please enter a valid number");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Combine country code and number
      const fullNumber = countryCode + number;

      const result = await apiRequest.post("/auth/sendotp", {
        phoneNumber: fullNumber,
      });

      notify({
        type: "success",
        message: "OTP sent successfully!",
      });

      setOTPSent(true);

    } catch (error) {
      console.error("Error sending OTP:", error);

      if (error.status >= 500) {
        notify({
          type: "error",
          message: "Server error : Please try again later",
        });
      } else if (error.status >= 400) {
        notify({
          type: "error",
          message: "Unable to send OTP, please check your number and try again",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      notify({
        type: "error",
        message: "Please enter a valid 6-digit OTP",
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await apiRequest.post("/auth/verifyotp", {
        phoneNumber: countryCode + number,
        otp,
      });

      if (result.status === 200) {
        notify({
          type: "success",
          message: "OTP verified successfully!",
        });
        debugger;
        navigate("/expenses");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);

      if (error.status >= 500) {
        notify({
          type: "error",
          message: "Server error : Please try again later",
        });
      } else if (error.status > 400) {
        notify({
          type: "error",
          message: "Unable to send OTP, please check your number and try again",
        });
      } else if (error.status === 400) {
        notify({
          type: "error",
          message:
            error?.response?.data?.message || "Invalid OTP, please try again",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNumber("");
    setCountryCode("+91");
    setOTPSent(false);
    setOTP("");
  };

  return (
    <div
      onClick={hideAuth}
      className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal
        className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md min-h-[40vh] flex flex-col justify-between"
      >
        {/* Tab Switch */}
        <div className="flex shadow-[0_6px_4px_-2px_rgba(255,255,255,0.5)] relative bg-gray-100 rounded-md p-1">
          <motion.div
            className="absolute top-0 bottom-0 left-0 w-full bg-white rounded-md shadow-lg"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <div
            className={`flex-1 py-3 text-lg text-center font-medium relative z-10 transition-colors text-green-600 `}
          >
            Sign In
          </div>
        </div>

        <div className="shadow-md rounded-md my-2">
          {/* Form with Animations */}
          <div className="mt-4 relative">
            <form
              key="signin"
              className=""
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onSubmit={(e) => {
                e.preventDefault();
                getOTP();
              }}
            >
              <div className="w-full p-3 rounded-md focus-within:ring-2 focus-within:ring-green-500 flex items-center gap-2 ">
                {/* Country Code Dropdown */}
                <select
                  className="bg-gray-100 rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700 outline-none"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+81">🇯🇵 +81</option>
                  {/* Add more country codes as needed */}
                </select>

                {/* Phone Number Input */}
                <input
                  name="number"
                  type="tel"
                  value={number}
                  placeholder="Enter your phone number"
                  required
                  className="w-full outline-none text-lg"
                  maxLength={10}
                  onChange={(e) => {
                    // Allow only digits, max length 10
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 10) setNumber(val);
                  }}
                />
              </div>

              {error && <span className="text-red-500 text-sm">{error}</span>}
            </form>
          </div>

          <AnimatePresence mode="wait">
            {otpSent && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mt-4 py-2"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    verifyOTP(); // This is the new function for OTP verification
                  }}
                >
                  <div className="w-full p-3 rounded-md focus-within:ring-2 focus-within:ring-green-500 flex items-center gap-2">
                    <OTPInput length={6} onChange={(val) => setOTP(val)} />
                  </div>
                  {error && (
                    <span className="text-red-500 text-sm">{error}</span>
                  )}
                </form>

                <ResendOTP number={countryCode + number} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <motion.div
            className="w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ButtonGreenGradient
              onClick={otpSent ? verifyOTP : getOTP}
              buttonText={
                loading
                  ? otpSent
                    ? "Verifying..."
                    : "Sending..."
                  : otpSent
                  ? "Verify OTP"
                  : "Get OTP"
              }
              disabled={loading}
            />
          </motion.div>
        </div>

        <div className="text-gray-400 text-sm">
          ⚠️ Please make sure you are connected to WhatsApp sanbox before
          proceeding.{" "}
          <a href="/faq" className="text-blue-500 hover:underline">
            <span>FAQ</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Auth;
