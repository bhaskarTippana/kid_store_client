/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [categories, setCateories] = useState([]);

  const getData = async () => {
    const res = await axios.get("https://kids-store-api.onrender.com/kids-store/categories");
    setCateories(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`/category/${e.categoryName}`);
  };

  return (
    <>
      {<NavBar />}
      <h1 className="text-xl px-5 pt-3 md:text-2xl lg:text-3xl font-bold lg:px-10">
        Shop by Categories
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.length !== 0
          ? categories.map((e, _) => {
              return (
                <div
                  key={_}
                  onClick={() => {
                    handleClick(e);
                  }}
                  className="border h-40 w-40  grid rounded-2xl  relative md:h-60 md:w-60 lg:h-64 lg:w-80 mx-auto mt-3 md:mt-5 lg:mt-7"
                  style={{
                    background: `url(${e.back_url})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <p className="absolute bottom-0 lg:py-1 text-center w-full text-xl font-bold text-white bg-[#176b87] rounded-b-xl">
                    {e.categoryName}
                  </p>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default Home;
