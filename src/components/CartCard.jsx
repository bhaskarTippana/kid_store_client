/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import deleted from "../Assets/delete.svg";
import {BASE_URL,LOCAL_URL } from "../config"

const CartCard = ({ e, setActualCost, setPremium,toast }) => {
  const productPrice = Math.ceil(Number(e.price.replace("$", "")));
  const actualPrice = Math.ceil(Number(e.price.replace("$", "")) * e.quantity);
  const discountPrice = Math.ceil(
    Number(actualPrice - (actualPrice * e.discount) / 100)
  );

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();


  useEffect(() => {
    setActualCost((prev) => prev + productPrice * e.quantity);
    setPremium(
      (prev) =>
        prev + (productPrice - (productPrice * e.discount) / 100) * e.quantity
    );

    return () => {
      setActualCost((prev) => prev - actualPrice);
      setPremium((prev) => prev - discountPrice);
    };
  }, []);


  const addQuantity = async (e) => {
    try {
      if (token) {
        const res = await axios.post(
          `${LOCAL_URL}cart`,
          { action: "INCREMENT_QUANTITY", product: e },
          { headers: { token: token } }
        );
        if (res.status === 200) {
   
          dispatch({ type: "INCREASE_PRODUCT", payload: res.data.cart });
          setActualCost((prev) => prev + productPrice);
          setPremium(
            (prev) => prev + (productPrice - (productPrice * e.discount) / 100)
          );
        }
      }
    } catch (error) {}
  };

  const decreaseQuantity = async (e) => {
    try {
      if (token) {
        const res = await axios.post(
          `${LOCAL_URL}cart`,
          {
            action: "DECREMENT_QUANTITY",
            product: e,
          },
          {
            headers: { token: token },
          }
        );
        if (res.status === 200) {
       
          dispatch({ type: "DECREASE_PRODUCT", payload: res.data.cart });
          setActualCost((prev) =>
            prev > productPrice ? prev - productPrice : prev
          );
          setPremium((prev) =>
            prev > productPrice - (productPrice * e.discount) / 100
              ? prev - (productPrice - (productPrice * e.discount) / 100)
              : prev
          );
        }
      }
    } catch (error) {}
  };

  const deleteProduct = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.post(
        `${LOCAL_URL}cart`,
        { action: "DELETE_CART", product: e },
        { headers: { token } }
      );

      if (res.status === 200) {
        toast.error("Deleted! Your cart is lighter.");
        setActualCost((prev) => {
          const newActualCost = prev - totalActualPrice;
    
          return newActualCost;
        });
        dispatch({ type: "DELETE_FROM_CART", payload: e });

        const totalActualPrice = Number(e.price.replace("$", "")) * e.quantity;
     

        const totalDiscountPrice =
          totalActualPrice - (totalActualPrice * e.discount) / 100;
      


        setPremium((prev) => {
          const newPremium = prev - totalDiscountPrice;
       
          return newPremium;
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  return (
    <div className="h-80 bg-white m-3 rounded-xl border grid grid-cols-12">
      <div className="col-span-12 md:col-span-6 m-5 bg-gray-100 h-28 md:h-64 md:p-4">
        <img className="h-full w-full rounded-xl object-fill" src={e.url} alt={e.name} />
      </div>
      <div className="col-span-12 md:col-span-3 md:m-5 grid text-[0.8rem] pl-5 md:text-[1em] md:pl-0">
        <h1>
          <span className="font-bold">Product :</span>{" "}
          <span className="text-ellipsis">{e.name}</span>
        </h1>
        <h1>
          <span className="font-bold">Price :</span>
          <span className="line-through">{actualPrice}</span>
          <span className="pl-5">$ {discountPrice}</span>
        </h1>
        <h1>
          <span className="font-bold">Saved :</span>
          <span className="text-ellipsis">$ {actualPrice - discountPrice}</span>
        </h1>
        <h1>
          <span className="font-bold">Rating :</span>{" "}
          <span className="text-ellipsis">{e.rating}</span>
        </h1>
        <h1>
          <span className="font-bold">Discount :</span> {e.discount}%
        </h1>
        <h1>
          <span className="font-bold">Category :</span> {e.category}
        </h1>
      </div>
      <div className="col-span-10 md:col-span-2 grid">
        <div className="flex items-center justify-evenly">
          <button
            className="grid place-items-center h-8 w-8 rounded-full border font-bold"
            onClick={() => {
              e.quantity > 1 && decreaseQuantity(e);
            }}
          >
            <span>-</span>
          </button>
          <p className="font-semibold text-xl">{e.quantity}</p>
          <button
            className="grid place-items-center h-8 w-8 rounded-full border font-bold"
            onClick={() => {
              addQuantity(e);
            }}
          >
            <span>+</span>
          </button>
        </div>
      </div>
      <div
        className="col-span-2 md:col-span-1 flex justify-end text-xl md:p-5 cursor-pointer"
        onClick={deleteProduct}
      >
        <span className="p-1 rounded-full h-10 w-10 text-center cursor-pointer">
          <img src={deleted} alt="Delete" />
        </span>
      </div>
    </div>
  );
};

export default CartCard;
