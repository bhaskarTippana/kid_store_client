/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import baby from "../Assets/baby.avif";
import babu from "../Assets/babu.avif";
import { NavBar } from "./NavBar";
import Footer from "./Footer";
import { redirect, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Register from "./Register";
const LandingPage = () => {
  let dispatch = useDispatch();
  let is = useSelector((e) => e.user);

  async function getAuth() {
    let token = localStorage.getItem("token");
    if (token) {
      try {
        let res = await axios.get("http://localhost:5500/users", {
          headers: {
            token,
          },
        });
        if (res.status === 200) {
          dispatch({ type: "USER_DATA", payload: res.data });
        } else {
          console.log("failed to verify the token");
        }
      } catch (error) {
        console.log("you have token but it is not valid");
      }
    } else {
      console.log("not logged in cannot access all features !");
    }
  }

  useEffect(() => {
    // getTitles();
    getAuth();
  }, []);

  return (

    <>
    <div className="flex flex-col min-h-screen relative">
      <NavBar />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 relative">
        {/* First Image */}
        <div className="md:col-span-6 lg:col-span-6 relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${babu})` }}
          ></div>
        </div>

        {/* Second Image */}
        <div className="md:col-span-6 lg:col-span-6 relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${baby})` }}
          ></div>
        </div>

        {/* Text Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Welcome to KIDS_STORE
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8">
            Where Every Kid's Dream Comes True, Discover a World of Wonder for
            Your Little Ones!
          </p>
          <p className="text-base md:text-md lg:text-lg">
            At KIDS_STORE, we believe in making every childhood magical. Our
            carefully curated collection of kids' essentials brings together
            quality, creativity, and joy. From adorable clothing to educational
            toys, we have got everything your child needs to grow, learn, and
            play.
          </p>
        </div>
      </div>

    </div>
    <Footer />
    </>
  );
};

export default LandingPage;
