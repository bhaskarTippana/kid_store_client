/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
export const SideBar = () => {
  const navigate = useNavigate();
  return (
    <div className="h-60 w-full bg-gray-400 grid text-white text-xl rounded-b-lg absolute top-16 z-50 lg:hidden">
      <div
        className="w-full rounded-lg items-center flex  pl-5 hover:border hover:bg-[#176B87]"
        onClick={() => navigate("/categories")}
      >
        Categories
      </div>
      <div className="w-full rounded-lg items-center flex   pl-5 hover:border hover:bg-[#176B87]">
        Nothing
      </div>
      <div className="w-full rounded-lg items-center flex  pl-5 hover:border hover:bg-[#176B87]">
        About US
      </div>
      <div className="w-full rounded-lg items-center flex  pl-5 hover:border hover:bg-[#176B87]">
        History
      </div>
    </div>
  );
};
