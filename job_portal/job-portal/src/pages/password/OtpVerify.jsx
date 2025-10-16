import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../Api/AxiosInstance";


const OtpVerify = () =>{

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";


    const [otp,setOtp] = useState("");
    const [error,setError] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");

        try{
            const res = await API.post('otp/verify/',{email,otp});
            console.log(res.data.message);
            navigate('/reset/password',{state :{email}});
        }catch(err){
            setError(err.response?.data?.error || "something went wrong")
        }
    }
    return(
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div className="w-full max-w-sm shadow-lg rounded-xl p-6 bg-gray-50">
                    <h2 className="text-lg font-bold mb-2">Verify OTP?</h2>
                          <p className="text-sm  mb-4 ">
                            Enter the verification code sent to your registered email address to proceed with password reset.
                          </p>
                     <form className="space-y-4 mt-7" onSubmit={handleSubmit}>
                        <label htmlFor="otp" className="text-gray-400 text-sm">OTP</label>
                            <input
                            type="text"
                            value={otp}
                            onChange={(e)=> setOtp(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-2 py-2 bg-white"
                            />
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button type="submit" className="w-full bg-blue-600 text-white rounded-2xl py-2 mt-3" >Verify</button>
                        </form>
    
                </div>
            </div>
        </>

    )
}
export default OtpVerify;