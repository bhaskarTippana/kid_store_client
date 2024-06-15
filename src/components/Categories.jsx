/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { NavBar } from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import carts from "../Assets/carts.svg";
function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0 && rating - fullStars > 0;

  const stars = Array.from({ length: fullStars }, (_, index) => (
    <svg
      key={index}
      className="w-4 h-4 text-yellow-300 ms-1"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  ));

  if (hasHalfStar) {
    stars.push(
      <svg
        key="half"
        className="w-4 h-4 text-yellow-300 ms-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        <path
          fill="#FFF"
          d="M10 0L12.2457 6.68925H19.0914L13.7279 11.3107L16.0369 18.3107L10 13.3128V0Z"
        />
      </svg>
    );
  }

  return <div className="flex items-center">{stars}</div>;
}

const Categories = () => {
  const [load, setLoad] = useState(false);
  let token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const selector = useSelector((e) => e.myProducts);
  const { category } = useParams();
  const navigate = useNavigate();
  const [wishlist, setWishList] = useState(
    Array.from({ length: selector.length }, () => false)
  );
  const getCategories = async () => {
    try {
      setLoad(true);
      const res = await axios.get(
        `https://kids-store-api.onrender.com/kids-store/category/${category}`
      );
      dispatch({ type: "MY_PRODUCTS", payload: res.data });
    } catch (error) {
      setLoad(false);
    } finally {
      setLoad(false);
    }
  };

  const addToCartHandler = async (e) => {
    try {
      setLoad(true);
      if (token) {
        let res = await axios.post(
          "http://localhost:5500/cart",
          {
            action: "ADD_CART",
            product: e,
          },
          {
            headers: {
              token,
            },
          }
        );
        if (res.status === 200) {
          console.log(res.data.cart[0],'ress');
          dispatch({
            type: "ADD_TO_CART",
            payload: res.data.cart,
          });

          setLoad(false);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoad(false);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleWishList = async (e, heart, _) => {
    try {
      setLoad(true);
      if (token) {
        for (let index = 0; index < selector.length; index++) {
          if (index === _) {
            setWishList((prevWishlist) => {
              const updatedWishlist = [...prevWishlist];
              updatedWishlist[_] = heart === "add";
              return updatedWishlist;
            });
          }
        }
        let res = await axios.post(
          "https://kids-store-api.onrender.com/cart",
          {
            action: heart === "add" ? "ADD_WISHLIST" : "DELETE_WISHLIST",
            product: e,
          },
          {
            headers: {
              token,
            },
          }
        );
        if (res.status === 200) {
          console.log(res.data.wishlist, ";;;");
          dispatch({ type: "ADD_TO_WISHLIST", payload: res.data.wishlist });
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      setLoad(false);
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex align-middle justify-center">
        {load && <Loader />}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 bg-[#176b8714] place-items-center p-2 relative">
        {selector.length !== 0 &&
          selector.map((e, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-between p-2 text-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                style={{ width: "300px", height: "300px" }}
              >
                <div className="h-full relative overflow-hidden rounded-t-xl">
                  <img
                    className="w-full h-full object-cover rounded-t-xl cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out"
                    src={e.url}
                    alt=""
                    onClick={() => navigate(`/product/${e._id}`)}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      overflow: "hidden",
                    }} // Set equal width and height for images
                  />
                  <div className="absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-50">
                    <p className="text-white text-sm truncate">{e.name}</p>
                    <div className="flex justify-between items-center mt-1">
                      <StarRating rating={e.rating} />
                      <p className="mx-auto border w-10 rounded-md text-center bg-blue-100 text-blue-800">
                        {e.rating}
                      </p>
                      <p className="text-white">{e.price}</p>
                    </div>
                  </div>
                </div>
                <div className="h-1/4 flex justify-between items-center p-2 bg-[#176B87] rounded-b-xl">
                  <button
                    className="px-3 py-1 border rounded-md text-white bg-yellow-600 hover:bg-yellow-400 transition duration-300 ease-in-out"
                    onClick={() => addToCartHandler(e)}
                  >
                    Add To Cart
                    {/* <img src={carts} alt="" /> */}
                  </button>
                  <button
                    className="text-xl"
                    onClick={() =>
                      handleWishList(e, wishlist[index] ? "del" : "add", index)
                    }
                  >
                    {wishlist[index] ? "❤️" : "🤍"}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Categories;
