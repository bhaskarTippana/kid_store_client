import React from "react";
import { useNavigate } from "react-router-dom";
import success from "../Assets/success.svg";

const PaymentSuccess = () => {
    const navigate = useNavigate();

  return (
    <div className="bg-gray-200 h-screen w-screen grid items-center justify-center">
        <div className="grid h-fit w-fit p-7 gap-3 bg-white rounded-sm">
        <img src={success} alt="" className="mx-auto" />
            <h1 className="text-3xl font-bold text-center">Payment Successful!</h1>
            <p className="text-sm text-center text-gray-400">Thank you for completing your secure online payment.</p>
            <p className="text-base text-center">Have a great day!</p>
            <button className="border bg-indigo-500 w-fit px-3 py-2 rounded text-xl text-white mx-auto" onClick={()=>navigate("/")}>
                Go Back
            </button>
        </div>
      </div>
  );
};

export default PaymentSuccess;
