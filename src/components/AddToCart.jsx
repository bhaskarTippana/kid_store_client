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
  console.log(selector.cart);

  const cart = selector.cart;

  // const AddedProducts = async () => {
  //   try {
  //     if (token) {
  //       const res = await axios.post(
  //         "http://localhost:5500/cart",
  //         {action:"ADD_CART"},
  //         {
  //           headers: {
  //             token,
  //           },
  //         }
  //       );
  //       if (res.status === 200) {
  //         console.log(res.data.cart, "res.data");
  //         dispatch({ type: "ADD_TO_CART", payload: res.data.cart });
  //       }
  //     } else {
  //       navigate("/login");
  //     }
  //   } catch (error) {}
  // };

  const handleBuyCart = async () => {
    try {
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
      const buyResponse = await axios.post(
        "https://kids-store-api.onrender.com/buyCart",
        { action: "MULTI_PRODUCTS" },
        { headers: { token } }
      );
      if (buyResponse.status !== 200) {
        throw new Error("Failed to buy products. Please try again.");
      }
      const emptyCartResponse = await axios.post(
        "http://localhost:5500/buyCart",
        { action: "EMPTY_CART" },
        { headers: { token } }
      );
      console.log(emptyCartResponse.data.buyCart);
      if (emptyCartResponse.status !== 200) {
        throw new Error("Failed to empty the cart. Please try again.");
      }
      dispatch({ type: "BUY_CART_PRODUCTS", payload: buyResponse.data.buyProductsCart });
      dispatch({ type: "SINGLE_PRODUCT_ADD", payload: emptyCartResponse.data.buyCart });
      navigate("/checkout");
    } catch (error) {
      console.error("Error buying cart:", error.message || error);
    }
  };
  

  const gst = Math.ceil(premium * 0.18);


  // alert(premium);
  // alert(actualCost);

  return (
    <>
      <NavBar />
      {cart.length > 0 ? (
        <div className="grid grid-cols-12 m-3 rounded-xl border relative">
          <h1 className="pt-5 text-center md:px-5 text-xl md:text-3xl font-semibold col-span-12 md:text-start">
            Shopping Cart!
          </h1>
          {cart.map((item, index) => {
            return (
              <div
                className="col-span-12 lg:col-span-8 m-3 rounded-xl border bg-gray-100"
                key={item.id || index}
              >
                <CartCard
                  e={item}
                  setActualCost={setActualCost}
                  setPremium={setPremium}
                />
              </div>
            );
          })}

          <div className="col-span-12 lg:col-span-4 m-3 lg:sticky bottom-0">
            <div className="h-80 bg-gray-100 w-full rounded-xl border p-5 grid">
              <h1 className="text-xl md:text-2xl font-semibold text-center">
                Order Summary
              </h1>
              <h1 className="border-b-2 pt-1 ">
                <span className="font-bold">Products Price :</span>
                <span className="line-through"> $ {Math.ceil(actualCost)}</span>
              </h1>
              <h1 className="border-b-2 pt-1">
                <span className="font-bold">Discount Price : </span>${" "}
                {Math.ceil(premium)}
              </h1>
              <h1 className="border-b-2 pt-1">
                <span className="font-bold">Saved Money :</span> ${" "}
                {Math.ceil(actualCost - premium)}
              </h1>
              <h1 className="border-b-2 pt-1">
                <span className="font-bold">GST (18%) :</span> $ {gst}
              </h1>
              <h1 className="border-b-2 pt-1">
                <span className="font-bold">Total Price : </span>${" "}
                {Math.ceil(premium + gst)}
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
