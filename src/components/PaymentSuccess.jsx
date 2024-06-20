import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import success from "../Assets/success.svg";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { NavBar } from "./NavBar";
import Footer from "./Footer";
import {BASE_URL,LOCAL_URL } from "../config"

const PaymentSuccess = () => {
  const selector = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const MyOrders = async () => {
    const token = localStorage.getItem("token");
   
    const payload = {
      action: "MY_ORDER_LIST",
      product: selector.buyCart.length > 0 ? selector.buyCart : selector.buyProductsCart,
    };
    try {
   

      const res = await axios.post(`${LOCAL_URL}cart`, payload, {
        headers: { token: token },
      });
     
      if(res.status === 200){
        dispatch({type:"MY_ORDERS",payload:res.data.myOrders});
      }
    } catch (error) {
      console.error("Error updating orders:", error);
    }
  };





  return (
<>

<NavBar />
<div className="bg-gray-200 h-screen w-screen grid items-center justify-center">
      <div className="grid h-fit w-fit p-7 gap-3 bg-white rounded-sm">
        <img src={success} alt="Payment Success" className="mx-auto" />
        <h1 className="text-3xl font-bold text-center">Payment Successful!</h1>
        <p className="text-sm text-center text-gray-400">
          Thank you for completing your secure online payment.
        </p>
        <p className="text-base text-center">Have a great day!</p>
        <button
          className="border bg-indigo-500 w-fit px-3 py-2 rounded text-xl text-white mx-auto"
          onClick={() =>{ MyOrders(); navigate("/")}}
        >
          Go Back
        </button>
      </div>
    </div>
<Footer />
</>
  );
};

export default PaymentSuccess;
