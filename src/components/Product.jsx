/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { NavBar } from "./NavBar";
import { useDispatch } from "react-redux";
import {BASE_URL,LOCAL_URL } from "../config";
import Footer from "./Footer";

const Product = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  const [specificProduct, setSpecificProduct] = useState("");

  const getSpec = async () => {
    const res = await axios.get(
      `${LOCAL_URL}kids-store/products/${params.id}`
    );
    setSpecificProduct(res.data);

  };

  useEffect(() => {
    getSpec();
   
  }, [params.id]);
  const handleClick = async () => {
    try {
      const res = await axios.post(
        `${LOCAL_URL}buyCart`,
        { action: "SINGLE_PRODUCT_ADD", product: specificProduct },
        { headers: { token: token } }
      );
   
      if (res.status === 200) {
        dispatch({ type: "SINGLE_PRODUCT_ADD", payload: res.data.buyCart });
        dispatch({type:"BUY_CART_PRODUCTS",payload:res.data.buyProductsCart})
        navigate("/summary");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-w-screen  bg-[#176b872b] flex items-center p-5 overflow-hidden relative">
        <div className="w-full max-w-6xl rounded-lg bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
          <div className="md:flex items-center -mx-10">
            <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
              <div className="relative">
                <img
                  src={specificProduct.url}
                  className="object-fill relative z-10"
                  alt=""
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 px-10">
              <div className="mb-10">
                <h1 className="font-bold uppercase text-2xl mb-5">
                  {specificProduct.name}
                </h1>
                <p className="text-xl font-thin">
                  {specificProduct.description}
                </p>
              </div>
              <div>
                <div className="inline-block align-bottom mr-5">
                  <span className="font-bold text-3xl leading-none align-baseline">
                    {specificProduct.price}
                  </span>
                </div>
                <div className="inline-block align-bottom">
                  <button
                    className="bg-[#176B87] text-white rounded-full px-10 py-2 font-semibold"
                    onClick={handleClick}
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
