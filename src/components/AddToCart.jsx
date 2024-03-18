/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import NoProductPage from "./NoProductPage";
import axios from "axios";
import CartCard from "./CartCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddToCart = () => {
  let [data, setData] = useState();
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [premium, setPremium] = useState(0);
  const [actualCost, setActualCost] = useState(0);
  const selector = useSelector((e) => e.user);

  const cart = selector.cart;

  const AddedProducts = async () => {
    try {
      if (token) {
        const res = await axios.post(
          "https://kids-store-api.onrender.com/cart",
          {},
          {
            headers: {
              token,
            },
          }
        );
        dispatch({ type: "USER_DATA", payload: res.data });
      } else {
        navigate("/login");
      }
    } catch (error) {}
  };

  const handleBuyCart = async () => {
    try {
      if (token) {
        const res = await axios.post(
          "https://kids-store-api.onrender.com/buyCart",
          {
            action: "MULTI_PRODUCTS",
          },
          {
            headers: {
              token,
            },
          }
        );
        console.log(res);
        if (res.status === 200) {
          dispatch({ type: "USER_DATA", payload: res.data });
          navigate("/checkout");
        }
      }
    } catch (error) {
      console.error("Error buying cart:", error);
    }
  };

  const gst = Math.round(premium * 0.18);

  useEffect(() => {
    AddedProducts();
  }, []);

  return (
    <>
      <NavBar />
      {cart.length > 0 ? (
        <div className="grid grid-cols-12 m-3 rounded-xl border relative">
          <h1 className="pt-5 text-center md:px-5 text-xl md:text-3xl font-semibold col-span-12 md:text-start">
            Shopping Cart!
          </h1>
          {cart.length !== 0 &&
            cart.map((e, _) => {
              return (
                <div
                  className="col-span-12  lg:col-span-8 m-3 rounded-xl border bg-gray-100"
                  key={_}
                >
                  <CartCard
                    e={e}
                    setActualCost={setActualCost}
                    setPremium={setPremium}
                  />
                </div>
              );
            })}
          <div className="col-span-12 lg:col-span-4 m-3 lg:sticky bottom-0">
            <div className="h-80 bg-gray-100 w-full rounded-xl border p-5 grid">
              <h1 className="text-xl md:text-2xl font-semibold text-center">Order Summary</h1>
              <h1 className="border-b-2 pt-1 ">
               <span className="font-bold">Products Price :</span>
                <span className="line-through"> $ {actualCost}</span>
              </h1>
              <h1 className="border-b-2 pt-1"><span className="font-bold">Discount Price : </span>$ {premium}</h1>
              <h1 className="border-b-2 pt-1">
               <span className="font-bold">Saved Money :</span> $ {actualCost - premium}
              </h1>
              <h1 className="border-b-2 pt-1"><span className="font-bold">GST (18%) :</span> $ {gst}</h1>
              <h1 className="border-b-2 pt-1">
               <span className="font-bold">Total Price : </span>$ {premium + gst}
              </h1>
              <button
                className="rounded bg-blue-500 text-white"
                onClick={handleBuyCart}
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <NoProductPage />
      )}
    </>
  );
};

export default AddToCart;
