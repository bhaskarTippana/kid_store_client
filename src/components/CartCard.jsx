/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const CartCard = ({ e, setActualCost, setPremium }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state);
  // console.log(cartItems,'cartitems');
  const [quantity, setQuantity] = useState(1);

  const delToCartHandler = async (pid) => {
    try {
      const myValue = localStorage.getItem("user");
      const res = await axios.post(
        `http://localhost:5500/products/${myValue}`,
        { type: "del", id: pid }
      );
      const idToDelete = res.data[0]; // Assuming the server returns the ID to delete

      // Filter the productsArray received from the server response
      const updatedProducts = cartItems.myProducts.filter((product) => product._id !== idToDelete);
      // Dispatch the updated products array to update the state
      // console.log(updatedProducts,'updated');
      dispatch({ type: "MY_PRODUCTS", payload: updatedProducts });
    } catch (error) {
      console.error("Error:", error);
    }
    window.location.reload();
  };

  const CalculatePremium = () => {
    setActualCost((prev) => prev + Number(e.price.replace("$", "")));
    setPremium(
      (prev) =>
        prev +
        Math.round(Number(e.price.replace("$", "")) -
        Number(e.price.replace("$", "")) * Number(e.discount / 100))
    );
  };

  const DeletePremium = () => {
    setActualCost((prev) =>
      prev > Number(e.price.replace("$", ""))
        ? prev - Number(e.price.replace("$", ""))
        : prev
    );
    setPremium(
      (prev) =>
        prev>   Math.round(Number(e.price.replace("$", "")) -
        Number(e.price.replace("$", "")) * Number(e.discount / 100))?prev -
        Math.round( Number(e.price.replace("$", "")) -
        Number(e.price.replace("$", "")) * Number(e.discount / 100)):Math.round(prev)
    );
  };

  useEffect(() => {
    CalculatePremium();
  }, []);


  return (
    <div className="h-72 bg-white m-3 rounded-xl border grid grid-cols-12">
      <div className="col-span-6 m-5 bg-gray-100 h-64 p-4">
        <img className="h-full w-full rounded-xl" src={e.url} alt="" />
      </div>
      <div className="col-span-3 m-5 grid">
        <h1>Product : {e.name}</h1>
        <h1>
          Price : <span className="line-through">{e.price}</span>
          <span className="pl-5">
            ${" "}
            {Math.round(Number(e.price.replace("$", "")) -
              Number(e.price.replace("$", "")) * Number(e.discount / 100))}
          </span>
        </h1>
        <h1>Rating : {e.rating}</h1>
        <h1>Discount : {e.discount}%</h1>
        <h1>Category : {e.category}</h1>
      </div>
      <div className="col-span-2 grid">
        <div className="flex items-center justify-evenly">
          <button
            className="grid place-items-center h-8 w-8 rounded-full border font-bold"
            onClick={() => {
              // Update the quantity
            setQuantity((prev) => ((prev > 1) ? prev - 1 : prev));

              // Call the function
              quantity>1&&DeletePremium();
              // Assuming CalculatePremium is a function
            }}
          >
            -
          </button>
          <p className="font-semibold text-xl">{quantity}</p>
          <button
            className="grid place-items-center h-8 w-8 rounded-full border font-bold"
            onClick={() => {
              // dispatch({ type: 'INCREMENT_VALUE',payload:1 })
              setQuantity((prev) => prev + 1);
              CalculatePremium();
            }}
          >
            +
          </button>
        </div>
      </div>
      <div
        className="col-span-1 flex justify-end text-2xl text-gray-400 p-5 cursor-pointer"
        onClick={() => {delToCartHandler(e._id)}}
      >
        X
      </div>
    </div>
  );
};

export default CartCard;

