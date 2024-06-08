/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import deleted from "../Assets/delete.svg";
import { NavBar } from "./NavBar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import NoProductPage from "./NoProductPage";
const AddToFav = () => {
  let token = localStorage.getItem("token");
  const selector = useSelector((e) => e.user);
  const listItems = selector.wishlist;
  const dispatch = useDispatch();
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
        dispatch({ type: "ADD_TO_WISHLIST", payload: res.data });
      } else {
        navigate("/login");
      }
    } catch (error) {}
  };

  useEffect(() => {
    AddedProducts();
  }, []);

  const handleRemove = async (e) => {
    try {
      if (token) {
        let res = await axios.post(
          "https://kids-store-api.onrender.com/cart",
          {
            action: "DELETE_WISHLIST",
            product: e,
          },
          {
            headers: {
              token,
            },
          }
        );
        if (res.status === 200) {
          console.log(res.data);
          dispatch({ type: "DELETE_FROM_WISHLIST", payload: e });
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <NavBar />
      {listItems.length > 0 ? (
        <div className="m-3 rounded-xl border min-h-screen">
          <h1 className="md:pt-5 md:px-5 md:text-3xl font-semibold col-span-12 pl-3 pt-3">
            Shopping Cart!
          </h1>

          <div className="col-span-12 p-2 m-2">
            <div className="grid grid-cols-12 text-[0.8rem] md:text-[1rem] place-items-center border-b-[1px] font-bold">
              <div className="col-span-3">Product</div>
              <div className="col-span-2">Name</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Rating</div>
              <div className="col-span-3">Remove Item</div>
            </div>
            {listItems.map((e, _) => (
              <div key={_}>
                <div className="grid grid-cols-12 text-[0.8rem] md:text-[1rem] place-items-center border-b-[1px] py-4">
                  <div className="col-span-3 h-12 md:h-32 w-full md:w-40 object-contain">
                    <img className="p-1 w-full h-full" src={e.url} alt="" />
                  </div>
                  <div className="col-span-2 text-ellipsis text-wrap overflow-hidden">
                    {e.name}
                  </div>
                  <div className="col-span-2">{e.price}</div>
                  <div className="col-span-2">{e.rating}</div>
                  <div className="col-span-3">
                    {" "}
                    <p className="cursor-pointer rounded-full h-8 w-8 grid place-items-center">
                      <span onClick={() => handleRemove(e)}>
                        <img src={deleted} alt="" />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NoProductPage />
      )}
    </>
  );
};

export default AddToFav;
