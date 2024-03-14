/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import axios from "axios";
import CartCard from "./CartCard";
import { useDispatch, useSelector } from "react-redux";
const AddToCart = () => {
  let [data,setData] = useState();
  let token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const selector = useSelector((e) => e.user);

  const cart = selector.cart;

  const AddedProducts = async () => {
    try {
      if (token) {
        const res = await axios.post(
          "http://localhost:5500/cart",
          {},
          {
            headers: {
              token,
            },
          }
        );
        // console.log(res.data);
        // setData(res.data.cart)
        dispatch({ type: "USER_DATA", payload: res.data });
      }
    } catch (error) {}
  };

  const deleteProduct = async(e)=>{
    try {
      if (token) {
        let res = await axios.post(
          "http://localhost:5500/cart",
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
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // const gst = Math.round(premium * 0.18);

  useEffect(() => {
    AddedProducts();
  }, []);

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-12 m-3 rounded-xl border relative">
        <h1 className="pt-5 px-5 text-3xl font-semibold col-span-12">
          Shopping Cart!
        </h1>
        {cart.length !== 0 &&
          cart.map((e, _) => {
            return (
              <div key={_}>
                <h1>{e.name}</h1>
                <h1 onClick={()=>deleteProduct(e)}>X</h1>
              </div>
            );
          })}
        {/* {items.length !== 0 &&
          items.map((e, _) => {
            return (
              <div
                className="col-span-8 m-3 rounded-xl border bg-gray-100"
                key={_}
              >
                <CartCard
                  e={e}
                  setActualCost={setActualCost}
                  setPremium={setPremium}
                />
              </div>
            );
          })} */}
        {/* {!actualCost <=0 ? <div className="col-span-4 m-3 sticky w-full bottom-0 right-5">
          <div className="h-80 bg-gray-100 w-full rounded-xl border p-5 grid">
            <h1 className="text-2xl">Order Summary</h1>
            <h1 className="border-b-2 pt-1 ">
              Products Price :
              <span className="line-through">$ {actualCost}</span>
            </h1>
            <h1 className="border-b-2 pt-1">
              Discount Price :$ {premium}{" "}
              <span className="pl-10">
                Saved Money : $ {actualCost - premium}
              </span>
            </h1>
            <h1 className="border-b-2 pt-1">GST (18%) : $ {gst}</h1>
            <h1 className="border-b-2 pt-1">
              Total Price : $ {gst + premium}{" "}
            </h1>
            <button className="rounded bg-blue-500 text-white">
              Checkout Now
            </button>
          </div>
        </div>:<div>Nothing is there!</div>} */}
      </div>
    </>
  );
};

export default AddToCart;
