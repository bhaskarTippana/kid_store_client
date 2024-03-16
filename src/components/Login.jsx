/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const username = watch("username"); // Watching the "username" field
  const onSubmit = async (data) => {
    try {
      // Determine whether to use "email" or "firstName" based on username
      const key = username && username.includes("@") ? "email" : "firstName";
      // Send the data to the backend
      const response = await axios.post(
        "https://kids-store-api.onrender.com/login",
        { [key]: data.username, password: data.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token",response.data.token);
      window.location.href="/";
      // localStorage.setItem("user",response.data.userId);
      // Handle successful login, such as redirecting the user
    } catch (error) {
      console.error("Error:", error.response.data);
      // Handle login error, such as displaying an error message to the user
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00000075]">
      <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 bg-white p-8 rounded-lg shadow-md animate-fade-in">
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
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Dont have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Create new account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
