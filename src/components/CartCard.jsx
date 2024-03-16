/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const CartCard = ({ e, setActualCost, setPremium }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [delLoading,setDelLoading] = useState(false);
  let token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const selector = useSelector((e) => e.user);
  console.log(selector.buyCart);
  const emptyBuyCart = async () => {
    try {
      if (token) {
        let res = await axios.post(
          "https://kids-store-api.onrender.com:/cart",
          {
            action: "EMPTY_BUYCART",
          },
          {
            headers: {
              token,
            },
          }
        );
        if (res.status === 200) {
          dispatch({ type: "USER_DATA", payload: res.data });
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteProduct = async (e) => {
    try {
      if (token) {
        let res = await axios.post(
          "https://kids-store-api.onrender.com/cart",
          {
            action: "DELETE_CART",
            product: e,
          },
          {
            headers: {
              token,
            },
          }
        );
        if (res.status === 200) {
          dispatch({ type: "USER_DATA", payload: res.data });
          emptyBuyCart();
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    window.location.reload();
  };

  const AddQuantity = async (e) => {
    setIsLoading(true);
    try {
      if (token) {
        let res = await axios.post(
          "https://kids-store-api.onrender.com/cart",
          {
            action: "ADD_QUANTITY",
            product: e,
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
          setIsLoading(false);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const DeleteQuantity = async (e) => {
    setDelLoading(true);
    try {
      if (token) {
        let res = await axios.post(
          "https://kids-store-api.onrender.com/cart",
          {
            action: "DELETE_QUANTITY",
            product: e,
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
          setDelLoading(false);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const CalculatePremium = () => {
    setActualCost((prev) => prev + Number(e.price.replace("$", "")));
    setPremium(
      (prev) =>
        prev +
        Math.round(
          Number(e.price.replace("$", "")) -
            Number(e.price.replace("$", "")) * Number(e.discount / 100)
        )
    );
  };

  const DeletePremium = () => {
    setActualCost((prev) =>
      prev > Number(e.price.replace("$", ""))
        ? prev - Number(e.price.replace("$", ""))
        : prev
    );
    setPremium((prev) =>
      prev >
      Math.round(
        Number(e.price.replace("$", "")) -
          Number(e.price.replace("$", "")) * Number(e.discount / 100)
      )
        ? prev -
          Math.round(
            Number(e.price.replace("$", "")) -
              Number(e.price.replace("$", "")) * Number(e.discount / 100)
          )
        : Math.round(prev)
    );
  };

  useEffect(() => {
    CalculatePremium();
    console.log(selector.buyCart);
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
            {Math.round(
              Number(e.price.replace("$", "")) -
                Number(e.price.replace("$", "")) * Number(e.discount / 100)
            )}
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
            disabled={delLoading}
            onClick={() => {
              // Update the quantity
              setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
              if (quantity > 1) {
                DeletePremium();
                DeleteQuantity(e);
            }
            }}
          >
            -
          </button>
          <p className="font-semibold text-xl">{quantity}</p>
          <button
            className="grid place-items-center h-8 w-8 rounded-full border font-bold"
            onClick={() => {
              setQuantity((prev) => prev + 1);
              CalculatePremium();
              AddQuantity(e);
            }}
            disabled={isLoading}
          >
            <span>+</span>
          </button>
        </div>
      </div>
      <div
        className="col-span-1 flex justify-end text-2xl text-gray-400 p-5 cursor-pointer"
        onClick={() => {
          deleteProduct(e);
        }}
      >
        <span className="p-1 hover:bg-red-300 rounded-full h-10 w-10 text-center hover:text-white">
          X
        </span>
      </div>
    </div>
  );
};

export default CartCard;
