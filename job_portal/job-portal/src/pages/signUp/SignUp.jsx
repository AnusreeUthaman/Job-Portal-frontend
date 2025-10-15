import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import API from "../../API/AxiosInstance";
import { toast} from "react-toastify";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    role: "employee",
    password: "",
    confirm_password: "",
  });

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () =>{
    setShowConfirmPassword(!showConfirmPassword);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, 
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(formData); 
    try {
      const res = await API.post("signup/", formData);
      navigate("/signup/otp/", { state: { email: formData.email } });
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Create an account</h2>
      <p className="text-sm mb-4 font-semibold">
        Build your profile, connect with peers, and discover jobs.
      </p>

      <form className="space-y-4" onSubmit={handleSignUp}>
  
        <label className="text-gray-400 text-sm">Full Name</label>
        <input
          name="full_name"
          type="text"
          value={formData.full_name}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-white"
        />

        <label className="text-gray-400 text-sm">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-2 py-2 bg-white"
        />

        <label className="text-gray-400 text-sm">Password</label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-2 py-2 pr-10 bg-white"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <label className="text-gray-400 text-sm">Confirm Password</label>
        <div className="relative">
          <input
            name="confirm_password"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-2 py-2 pr-10 bg-white"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <input type="checkbox" className="border" />
          <span className="font-semibold text-sm">
            I agree to the Terms & Conditions and Privacy Policy
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-2xl py-2"
        >
          Sign Up
        </button>
      </form>
      <div className="my-4 text-center font-semibold ">Or Continue With</div>
      <div className="flex justify-center space-x-8 mb-7">
        <button className="flex flex-col items-center">
          <img 
            src="/images/google logo.png" 
            alt="Google" 
            className="w-12 h-12 rounded-full shadow" 
          />
        </button>

        <button className="flex flex-col items-center">
          <img 
            src="/images/facebook logo.png" 
            alt="Facebook" 
            className="w-12 h-12 rounded-full shadow" 
          />
        </button>

        <button className="flex flex-col items-center">
          <img 
            src="/images/apple logo.png" 
            alt="Apple ID" 
            className="w-10 h-11 rounded-full shadow" 
          />
        </button>
      </div>
    </div>
  );
};

export default SignUp;
