/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import logo from "../Assets/logo.svg";
import {BASE_URL,LOCAL_URL } from "../config";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const [registrationError, setRegistrationError] = useState(null);
  // const [load, setLoad] = useState(false);

  const onSubmit = async (data) => {
    try {
      // setLoad(true);
      const response = await axios.post(
        `${LOCAL_URL}register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Account activated!")
      navigate("/login");
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("User already exists.");
        // setLoad(false);
        setRegistrationError("User already exists.");
        return;
      }
    } finally {
      // setLoad(false);
    }
  };

  const password = watch("password");
  return (
  <>
  <ToastContainer autoClose={3000} transition={Bounce} position="bottom-center" />
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr bg-gray-100 from-blue-100">
      <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 bg-white p-8 rounded-lg shadow-md animate-fade-in">
      <div className="flex justify-center items-center"><img src={logo} alt="" /></div>
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full sm:w-1/2 px-3 mb-4 sm:mb-0">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                onFocus={() => setRegistrationError(null)}
                type="text"
                id="firstName"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs">
                  First Name is required
                </span>
              )}
            </div>
            <div className="w-full sm:w-1/2 px-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                onFocus={() => setRegistrationError(null)}
                type="text"
                id="lastName"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs">
                  Last Name is required
                </span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              onFocus={() => setRegistrationError(null)}
              type="email"
              id="email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                Please enter a valid email address
              </span>
            )}
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full sm:w-1/2 px-3 mb-4 sm:mb-0">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                onFocus={() => setRegistrationError(null)}
                type="password"
                id="password"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  Password must be at least 6 characters
                </span>
              )}
            </div>
            <div className="w-full sm:w-1/2 px-3">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                onFocus={() => setRegistrationError(null)}
                type="password"
                id="confirmPassword"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Register
            </button>
          </div>
        </form>
        <div className="flex align-middle justify-center p-3">
          {" "}
          {registrationError && (
            <p className="text-red-500 text-sm">{registrationError}</p>
          )}
        </div>
        <div className="flex align-middle justify-center p-3">
          {/* {load && <Loader />} */}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  </>
  );
};

export default Register;
