/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, {useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = ({setModal}) => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const [registrationError, setRegistrationError] = useState(null);

  // const getUser =async ()=>{
  //   const res = await axios.get("http://localhost:5500/users");
  //   console.log(res);
  // }


  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // localStorage.setItem("user",response.data.user._id);
      navigate("/login")
      setModal(true);
    } catch (error) {
      if (error.response.status === 400) {
        setRegistrationError("User already exists.");
        return; // Exit the function early if user already exists
      }
    }
  };

  const password = watch("password");
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00000075]">
      <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 bg-white p-8 rounded-lg shadow-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Register
        </h2>
        {registrationError && (
          <div className="mb-4 text-red-500 text-sm">{registrationError}</div>
        )}
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
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button className="text-blue-500 hover:underline" onClick={() => navigate('/login')}>
              Sign in
            </button>
          </p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Or continue with:</p>
          <button className="mt-2 w-full bg-red-500 text-white p-3 rounded-md font-semibold hover:bg-red-600 focus:outline-none focus:bg-red-600">
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
