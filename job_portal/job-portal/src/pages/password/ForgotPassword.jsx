import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Api/AxiosInstance";

const ForgotPassword = () =>{
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [error,setError] = useState("");

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError("");

        try{
            const res = await API.post('forgot/password/',{email});
            console.log(res.data.message);
            navigate("/otp/verify", { state: { email } });
        }catch(err){
            console.log(err);
            setError(err.response?.data?.error || "something went wrong")
        }
    }

    return(
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div className="w-full max-w-sm shadow-lg rounded-xl p-6 bg-gray-50">
                    <h2 className="text-lg font-bold mb-2">Forgot Your Password?</h2>
                          <p className="text-sm  mb-4 ">
                               Enter your email address and we'll send you an otp to reset your password.
                          </p>
                     <form className="space-y-4 mt-7" onSubmit={handleSubmit}>
                        <label htmlFor="email" className="text-gray-400 text-sm">Email</label>
                            <input
                            type="email"
                            value={email}
                            onChange={(e) =>setEmail(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-2 py-2 bg-white"
                            required
                            />
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button type='submit' className="w-full bg-blue-600 text-white rounded-2xl py-2" > Send</button>
                        </form>
    
                </div>
            </div>
        </>
    )
}
export default ForgotPassword;