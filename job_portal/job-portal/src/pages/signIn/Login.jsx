import React from "react";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; 
import { useNavigate, Link } from 'react-router-dom'
import API from "../../API/AxiosInstance";


const Login = () =>{
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const togglePasswordVisibility = () => {
    console.log("Toggling password visibility");
    setShowPassword(!showPassword);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("login/", formData);
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      navigate("/home");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };
    return(
        <>
        <div>
      <h2 className="text-lg font-bold mb-2">Welcome Back !</h2>
      <p className="text-sm mb-4 font-semibold">
        Log in to your account to connect with professionals and explore opportunities.
      </p>

      <form className="space-y-4 mt-12" onSubmit={handleLogin}>
        <label htmlFor="email" className="text-gray-400 text-sm">Email</label>
        <input
          type="email"
          name="email"
        value={formData.email}
        onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-2 py-2 bg-white"
        />
   
         <label htmlFor="Password" className="text-gray-400 text-sm">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-2 py-2 pr-12 bg-white" 
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 z-10"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        <div className="text-right text-sm text-blue-500 ">
          <p className="underline font-semibold"> <Link to='/forgot/password'>Forgot Password</Link></p>
        </div>

        <button  type="submit" className="w-full bg-blue-600 text-white rounded-2xl py-2" >Login</button>
      </form>

     
      <div className="my-4 text-center font-semibold ">Or Continue With</div>
      <div className="flex justify-center space-x-8 mb-15">
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
        </>
    )
}
export default Login;