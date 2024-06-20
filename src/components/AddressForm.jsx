import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {BASE_URL,LOCAL_URL } from "../config"

const AddressForm = ({setShowModal}) => {
  const [addressForm, setAddressForm] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const selector = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm({ ...addressForm, [name]: value });
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (token) {
        let res = await axios.post(
          `${LOCAL_URL}address`,
          addressForm,
          {
            headers: {
              token,
            },
          }
        );
        if (res.status === 200) {
          dispatch({ type: "UPDATE_ADDRESS", payload: addressForm });
          setShowModal(false);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-8 max-w-md mx-auto rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Address</h2>
        <form onSubmit={handleAddressSubmit}>
          <div className="mb-4">
            <label htmlFor="street" className="block text-gray-700">
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={addressForm.street}
              onChange={handleAddressChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={addressForm.city}
              onChange={handleAddressChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block text-gray-700">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={addressForm.state}
              onChange={handleAddressChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="postalCode" className="block text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={addressForm.postalCode}
              onChange={handleAddressChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={addressForm.country}
              onChange={handleAddressChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Save Address
            </button>
          </div>
        </form>
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-600 focus:outline-none"
          onClick={() => setShowModal(false)}
        >
          <span className="sr-only">Close</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
