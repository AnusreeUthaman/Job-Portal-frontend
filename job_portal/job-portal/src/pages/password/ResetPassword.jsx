import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../Api/AxiosInstance";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    
    if (!email) {
      setError("Email is missing. Please restart the forgot password process.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // const res = await API.post("reset/password/", { email, new_password: newPassword, confirm_password: confirmPassword });
      const res = await API.post("reset/password/", {
      email, 
      new_password: newPassword, 
      confirm_password: confirmPassword
    });
      console.log(res.data.message);
      alert(res.data.message);
      navigate("/"); 
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-sm shadow-lg rounded-xl p-6 bg-gray-50">
          <h2 className="text-lg font-bold mb-2">Reset Your Password</h2>
          <form className="space-y-4 mt-7" onSubmit={handleSubmit}>

            <label htmlFor="newPassword" className="text-gray-400 text-sm">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-2 py-2 pr-10 bg-white"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

    
            <label htmlFor="confirmPassword" className="text-gray-400 text-sm">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                className="w-full border border-gray-200 rounded-lg px-2 py-2 pr-10 bg-white"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
            type="submit"
              className="w-full bg-blue-600 text-white rounded-2xl py-2 mt-2"
             
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
