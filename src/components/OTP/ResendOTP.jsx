import React, { useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { useNotifier } from "../../hooks/useNotifier";

function ResendOTP({ number, setMessage = () => {} }) {
  const [resendCooldown, setResendCooldown] = useState(120);
  const notify = useNotifier();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleResend = async () => {
    setResendCooldown(120);
    setMessage("OTP resent!");
    notify({
        type:"success",
        message: "OTP resent to " + number,
    })

    const result = await apiRequest.post("/auth/sendotp", {
      phoneNumber: number,
    });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {resendCooldown > 0 ? (
        <p className="text-xs m-2 ">
          Resend OTP in <strong>{formatTime(resendCooldown)}</strong>
        </p>
      ) : (
        <button
          onClick={handleResend}
          disabled={resendCooldown > 0}
          className="bg-blue-500 py-1 px-2 text-xs text-white rounded-md text-center cursor-pointer hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
          aria-label="Resend OTP"
          type="button"
        >
          Resend OTP
        </button>
      )}
    </div>
  );
}

export default ResendOTP;
