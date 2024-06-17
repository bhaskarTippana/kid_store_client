
import React, { useState } from "react";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "USA",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://kids-store-api.onrender.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("User registered successfully");
      } else {
        const error = await response.json();
        alert("Error: " + error.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering the user");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
    >
      <h1 className="text-2xl font-bold mb-4">User Registration</h1>
      {[
        "firstName",
        "lastName",
        "password",
        "email",
        "street",
        "city",
        "state",
        "postalCode",
      ].map((field) => (
        <div key={field} className="mb-4">
          <label htmlFor={field} className="block text-gray-700 capitalize">
            {field}:
          </label>
          <input
            type={field === "password" ? "password" : "text"}
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
      ))}
      <div className="mb-4">
        <label htmlFor="country" className="block text-gray-700">
          Country:
        </label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        >
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="Mexico">Mexico</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Register
      </button>
    </form>
  );
};

export default AddressForm;
