 
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../API/AxiosInstance";

const SignUpOtp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { state } = useLocation();
  const email = state?.email;
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await API.post("verify/otp/", { email, otp });
      navigate("/"); 
    } catch (err) {
      setMessage(err.response?.data?.message || "Verification failed");
    }
  };

  const handleResend = async () => {
    try {
      await API.post("resend/otp/", { email });
      setMessage("New OTP sent successfully!");
      setMessageType("success");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to resend OTP");
      setMessageType("error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm shadow-lg rounded-xl p-6 bg-gray-50">
        <h2 className="text-lg font-bold mb-2">Verify OTP</h2>
        <p className="text-sm mb-4">
          Enter the verification code sent to your registered email{" "}
          {/* <span className="text-blue-600">{email}</span>. */}
        </p>
        <form className="space-y-4 mt-7" onSubmit={handleVerify}>
          <label htmlFor="otp" className="text-gray-400 text-sm">
            OTP
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-2 py-2 bg-white"
          />
          {message && (<p className={`text-sm text-red-500 flex justify-center ${messageType === "success" ? "text-green-600" : "text-red-500"}`}>{message}</p>)}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-2xl py-2 mt-3"
          >
            Verify
          </button>
        </form>
        <button
          onClick={handleResend}
          className=" text-blue-700 ml-55 py-1 mt-2 underline"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default SignUpOtp;
