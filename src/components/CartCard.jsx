/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import deleted from "../Assets/delete.svg";

const CartCard = ({ e, setActualCost, setPremium }) => {
  console.log(e.quantity);

  const [quantity, setQuantity] = useState();

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem(`quantity_${e._id}`, quantity);
  }, [quantity, e._id]);

  useEffect(() => {
    const updateCosts = () => {
      const price = Number(e.price.replace("$", ""));
      const discount = Number(e.discount) / 100;
      const updatedActualCost = price * quantity;
      const updatedPremium = Math.round(
        updatedActualCost - price * discount * quantity
      );
      setActualCost(updatedActualCost);
      setPremium(updatedPremium);
    };

    updateCosts();
  }, [quantity]);

  const deleteProduct = async () => {
    try {
      if (token) {
        const res = await axios.post(
          "https://kids-store-api.onrender.com/cart",
          { action: "DELETE_CART", product: e },
          { headers: { token } }
        );
        if (res.status === 200) {
          const price = Number(e.price.replace("$", ""));
          const discount = Number(e.discount) / 100;
          setActualCost((prev) => prev - price * quantity);
          setPremium(
            (prev) =>
              prev - Math.round(price * quantity - price * discount * quantity)
          );
          localStorage.removeItem(`quantity_${e._id}`, quantity);
          dispatch({ type: "DELETE_FROM_CART", payload: e });
          setQuantity(e.quantity);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const productPrice = Number(e.price.replace("$", "")) * quantity;
  const productDiscount = Math.ceil(
    productPrice - (productPrice * e.discount) / 100
  );
  const savedPrice = productPrice - productDiscount;

  return (
    <div className="h-80 bg-white m-3 rounded-xl border grid grid-cols-12">
      <div className="col-span-12 md:col-span-6 m-5 bg-gray-100 h-28 md:h-64 md:p-4">
        <img className="h-full w-full rounded-xl" src={e.url} alt={e.name} />
      </div>
      <div className="col-span-12 md:col-span-3 md:m-5 grid text-[0.8rem] pl-5 md:text-[1em] md:pl-0">
        <h1>
          <span className="font-bold">Product :</span>{" "}
          <span className="text-ellipsis">{e.name}</span>
        </h1>
        <h1>
          <span className="font-bold">Price :</span>
          <span className="line-through">{e.price}</span>
          <span className="pl-5">$ {productDiscount}</span>
        </h1>
        <h1>
          <span className="font-bold">Saved :</span>
          <span className="text-ellipsis">$ {savedPrice}</span>
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
              e.quantity > 1 &&
                dispatch({ type: "DECREASE_PRODUCT", payload: e._id });
            }}
          >
            <span>-</span>
          </button>
          <p className="font-semibold text-xl">{e.quantity}</p>
          <button
            className="grid place-items-center h-8 w-8 rounded-full border font-bold"
            onClick={() => {
              dispatch({ type: "INCREASE_PRODUCT", payload: e._id });
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
