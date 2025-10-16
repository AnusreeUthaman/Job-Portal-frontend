import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import API from "../../Api/AxiosInstance";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("change/password/", {
        old_password: formData.oldPassword,
        new_password: formData.newPassword,
        confirm_password: formData.confirmPassword,
      });

      alert(response.data.message); 
      navigate("/home");
    } catch (err) {
      console.log("Error:", err.response?.data); 
      alert(
        err.response?.data?.error ||
        "Something went wrong, please check again."
      );
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-sm shadow-lg rounded-xl p-6 bg-gray-50">
          <h2 className="text-lg font-bold mb-2">Change Password</h2>

          <form className="space-y-4 mt-7" onSubmit={handleSubmit}>
            <label htmlFor="oldPassword" className="text-gray-400 text-sm">
              Old Password
            </label>
            <div className="relative">
              <input
              name="oldPassword"
                id="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                type={showOldPassword ? "text" : "password"}
                className="w-full border border-gray-200 rounded-lg px-2 py-2 pr-10 bg-white"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showOldPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <label htmlFor="newPassword" className="text-gray-400 text-sm">
              New Password
            </label>
            <div className="relative">
              <input
              name="newPassword"
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                className="w-full border border-gray-200 rounded-lg px-2 py-2 pr-10 bg-white"
               value={formData.newPassword}
              onChange={handleChange}
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
              name="confirmPassword"
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full border border-gray-200 rounded-lg px-2 py-2 pr-10 bg-white"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
               {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
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

            <button type="submit" className="w-full bg-blue-600 text-white rounded-2xl py-2 mt-5">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
