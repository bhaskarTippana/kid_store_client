import React from "react";
import cancel from "../Assets/failed.svg";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <img src={cancel} alt="" />
        <h1 className="text-2xl font-semibold text-red-600 mb-4 text-center">
          Payment Cancelled
        </h1>
        <p className="text-gray-700 text-center mb-4">
          Your payment was not completed. If you have any questions or need
          assistance, please contact our support team.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
