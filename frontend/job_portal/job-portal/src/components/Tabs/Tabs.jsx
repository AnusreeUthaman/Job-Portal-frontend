import React from "react";
import { useState } from "react";
import SignUp from "../../pages/signUp/SignUp";
import Login from "../../pages/signIn/Login";

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm shadow-lg rounded-xl p-6 bg-gray-50">

        <div className="text-center mb-4 ">
          <h1 className="text-2xl font-bold">Logo</h1>
        </div>

        <div className="flex justify-center space-x-8 mb-6 ">
          <button
            onClick={() => setActiveTab("login")}
            className={`pb-2 ${activeTab === "login" ? "text-blue-500 border-b-2 border-blue-500 font-bold"  : "text-blue-400"}`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`pb-2 ${activeTab === "signup" ? "text-blue-500 border-b-2 border-blue-500 font-bold" : "text-blue-400"}`}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "login" ? <Login /> : <SignUp/>}
      </div>
    </div>
  );
}