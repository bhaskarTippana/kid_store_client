/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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
          "http://localhost:5500/cart",
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

  useEffect(() => {
    AddedProducts();
  }, []);

  const handleRemove = async (e) => {
    try {
      if (token) {
        let res = await axios.post(
          "http://localhost:5500/cart",
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
          dispatch({ type: "USER_DATA", payload: res.data });
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
      {listItems.length !== 0 ? (
      <div className="p-5">
        <h1>My WishList.....</h1>
        <div className="h-fit w-3/4 mx-auto">
        
            {listItems.map((e, _) => {
              return (
                <div key={_} className="w-full border m-5 grid grid-cols-12">
                  <div className="col-span-12 h-full p-2 grid grid-cols-12 border-b-2">
                    <div className="col-span-4 flex items-center justify-center">
                      Product
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      Product Name
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      Product Price
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      Product Rating
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      Remove Item
                    </div>
                  </div>
                  <div className="col-span-12 h-56 grid grid-cols-12 p-3">
                    <div
                      className="col-span-4 flex items-center justify-center h-full"
                      style={{
                        backgroundImage: `url(${e.url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <div className="col-span-2 flex items-center justify-center">
                      {e.name}
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      {e.price}
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                      {e.rating}
                    </div>
                    <div
                      className="col-span-2 flex items-center justify-center"
                      onClick={() => handleRemove(e)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </div>
                  </div>
                </div>
              );
            })}
        
        </div>
      </div>
      ) : (
        <NoProductPage />
      )}
    </>
  );
};

export default AddToFav;
