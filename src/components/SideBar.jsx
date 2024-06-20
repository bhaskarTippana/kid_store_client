/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FaListAlt, FaShoppingCart, FaHeart, FaTimes } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
export const SideBar = ({ setSidebar, sidebar }) => {
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setSidebar((prev) => !prev);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-900 opacity-90  text-white text-xl w-full transform ${
        sidebar ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50 md:hidden`}
    >
      <button
        className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-md"
        onClick={toggleDrawer}
      >
        <FaTimes size={20} />
      </button>
      <div
        className="w-full flex items-center pl-5 py-4 hover:bg-gray-700 transition-colors cursor-pointer"
        onClick={() => {
          navigate("/categories");
          toggleDrawer();
        }}
      >
        <FaListAlt className="mr-3" />
        Categories
      </div>
      <div
        className="w-full flex items-center pl-5 py-4 hover:bg-gray-700 transition-colors cursor-pointer"
        onClick={() => {
          navigate("/cartItems");
          toggleDrawer();
        }}
      >
        <FaShoppingCart className="mr-3" />
        Cart Items
      </div>
      <div
        className="w-full flex items-center pl-5 py-4 hover:bg-gray-700 transition-colors cursor-pointer"
        onClick={() => {
          navigate("/wishlist");
          toggleDrawer();
        }}
      >
        <FaHeart className="mr-3" />
        Wish List
      </div>
    </div>
  );
};

SideBar.propTypes = {
  setSidebar: PropTypes.func.isRequired,
  sidebar: PropTypes.bool.isRequired,
};
