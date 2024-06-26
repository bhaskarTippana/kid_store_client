/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Loader from "./Loader";
import { GoogleLogin } from "@react-oauth/google";
import logo from "../Assets/logo.svg";
import {BASE_URL,LOCAL_URL } from "../config";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [err, setErr] = useState("");
  // const [load, setLoad] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const username = watch("username");

  const onSubmit = async (data) => {
    try {
      const key = username && username.includes("@") ? "email" : "firstName";
  
      const response = await axios.post(
        `${LOCAL_URL}login`,
        { [key]: data.username, password: data.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Hello! You're now logged in.");
      window.location.href = "/";
    } catch (error) {
      setErr(error.response?.data?.message || "An error occurred. Please try again.");
     
    } finally {
    
    }
  };

  return (
   <>
    <ToastContainer autoClose={3000} transition={Bounce} position="bottom-center" />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr bg-gray-100 from-blue-100">
      <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 bg-white p-8 rounded-lg shadow-md animate-fade-in">
      <div className="flex justify-center items-center"><img src={logo} alt="" /></div>
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username or Email
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { required: true })}
              onFocus={() => setErr("")}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.username && (
              <span className="text-red-500">
                Username or Email is required
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onFocus={() => setErr("")}
              {...register("password", { required: true })}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
            <div className="flex align-middle justify-center p-3">
              <p className="text-red-700">{err}</p>
            </div>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Create new account
            </a>
          </p>
        </div>
        <div className="flex align-middle justify-center p-3">
          {/* {load && <Loader />} */}
        </div>
      </div>
    </div>
   </>
  );
};

export default Login;


