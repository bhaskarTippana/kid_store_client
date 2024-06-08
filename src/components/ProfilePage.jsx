import React, { useState } from "react";
import babu from "../Assets/babu.avif";
const ProfilePage = () => {
  const [showOrders, setShowOrders] = useState(true);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 mb-4 md:mb-0">
            <img
              src={babu}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-lime-500"
            />
            <div className="mt-4 md:mt-0 text-center md:text-left">
              <h1 className="text-3xl font-bold">John Doe</h1>
              <p className="text-gray-600">johndoe@example.com</p>
            </div>
          </div>
          <button
            className="bg-lime-500 text-white px-6 py-3 rounded-full hover:bg-lime-600 transition duration-300"
            onClick={() => setShowOrders(!showOrders)}
          >
            {showOrders ? "Show Wishlist" : "Show Orders"}
          </button>
        </div>

        <div className="mt-6">
          {showOrders ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Order History</h2>
              <ul className="space-y-4">
                {/* Placeholder for order history */}
                <li className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition duration-300">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-bold">Order #12345</h3>
                      <p className="text-gray-600">Date: 2023-06-01</p>
                      <p className="text-gray-600">Total: $59.99</p>
                    </div>
                    <button className="bg-lime-500 text-white px-4 py-2 rounded-full hover:bg-lime-600 transition duration-300">
                      View Details
                    </button>
                  </div>
                </li>
                <li className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition duration-300">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-bold">Order #12346</h3>
                      <p className="text-gray-600">Date: 2023-05-15</p>
                      <p className="text-gray-600">Total: $89.99</p>
                    </div>
                    <button className="bg-lime-500 text-white px-4 py-2 rounded-full hover:bg-lime-600 transition duration-300">
                      View Details
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Placeholder for wishlist items */}
                <li className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition duration-300">
                  <img
                    src={babu}
                    alt="Product"
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <h3 className="text-lg font-bold">Product 1</h3>
                  <p className="text-gray-600">$29.99</p>
                  <button className="mt-2 bg-lime-500 text-white px-4 py-2 rounded-full hover:bg-lime-600 transition duration-300">
                    Add to Cart
                  </button>
                </li>
                <li className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition duration-300">
                  <img
                    src={babu}
                    alt="Product"
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <h3 className="text-lg font-bold">Product 2</h3>
                  <p className="text-gray-600">$49.99</p>
                  <button className="mt-2 bg-lime-500 text-white px-4 py-2 rounded-full hover:bg-lime-600 transition duration-300">
                    Add to Cart
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
