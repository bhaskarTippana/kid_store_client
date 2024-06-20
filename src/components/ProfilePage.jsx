import React, { useState, useEffect } from "react";
import babu from "../Assets/babu.avif";
import { useSelector, useDispatch } from "react-redux";
import deleted from "../Assets/delete.svg";
import axios from "axios";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";
import Footer from "./Footer";
import { BASE_URL, LOCAL_URL } from "../config";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [showOrders, setShowOrders] = useState(true);
  const [editingAddress, setEditingAddress] = useState(false);
  const selector = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addressForm, setAddressForm] = useState({
    street: selector.address?.street || "",
    city: selector.address?.city || "",
    state: selector.address?.state || "",
    postalCode: selector.address?.postalCode || "",
    country: selector.address?.country || "",
  });

  useEffect(() => {
    const userIn = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get(`${LOCAL_URL}users`, {
            headers: { token: token },
          });
      
          if (res.status === 200) {
            dispatch({ type: "USER_DATA", payload: res.data });
            dispatch({ type: "USER_LOGIN", payload: true });
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    userIn();
  }, []);



  const openModal = (product) => {
 
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleRemove = async (e) => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        let res = await axios.post(
          `${LOCAL_URL}cart`,
          {
            action: "DELETE_WISHLIST",
            product: e,
          },
          {
            headers: {
              token,
            },
          }
        );
        const ress = await axios.post(
          `${LOCAL_URL}cart`,
          { action: "DELETE_CART", product: e },
          { headers: { token } }
        );
        if (ress.status === 200) {
          toast.error("Deleted! Your cart is lighter.");
          dispatch({ type: "DELETE_FROM_CART", payload: e });
        }
        if (res.status === 200) {
          toast.error("Removed! Continue exploring.");
       
          dispatch({ type: "DELETE_FROM_WISHLIST", payload: e });
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
  
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm({ ...addressForm, [name]: value });
  };

  const handleAddressSubmit = async (e) => {
   
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (token) {
        let res = await axios.post(`${LOCAL_URL}address`, addressForm, {
          headers: {
            token,
          },
        });
        if (res.status === 200) {
          toast.success("Address Updated Successfully ...!");
          
          dispatch({ type: "UPDATE_ADDRESS", payload: addressForm });
          setEditingAddress(false);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addToCartHandler = async (e) => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        let res = await axios.post(
          `${LOCAL_URL}cart`,
          {
            action: "ADD_CART",
            product: e,
          },
          {
            headers: {
              token,
            },
          }
        );
        if (res.status === 200) {
       
          toast.success("Great choice! It's in your cart.");
          dispatch({
            type: "ADD_TO_CART",
            payload: res.data.cart,
          });
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <NavBar />
      <ToastContainer
        autoClose={3000}
        transition={Bounce}
        position="bottom-center"
      />
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 mb-4 md:mb-0">
              <img
                src={selector.url ? selector.url : babu}
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-contain border-4 border-lime-500"
              />
              <div className="mt-4 md:mt-0 text-center md:text-left">
                <h1 className="text-3xl font-bold">
                  {selector.firstName + " " + selector.lastName}
                </h1>
                <p className="text-gray-600">{selector.email}</p>
                <div className="mt-4 text-gray-600">
                  {editingAddress ? (
                    <form onSubmit={handleAddressSubmit} className="space-y-2">
                      <div>
                        <label className="block text-sm">Street:</label>
                        <input
                          type="text"
                          name="street"
                          value={addressForm.street}
                          onChange={handleAddressChange}
                          className="w-full border rounded px-2 py-1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm">City:</label>
                        <input
                          type="text"
                          name="city"
                          value={addressForm.city}
                          onChange={handleAddressChange}
                          className="w-full border rounded px-2 py-1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm">State:</label>
                        <input
                          type="text"
                          name="state"
                          value={addressForm.state}
                          onChange={handleAddressChange}
                          className="w-full border rounded px-2 py-1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm">Postal Code:</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={addressForm.postalCode}
                          onChange={handleAddressChange}
                          className="w-full border rounded px-2 py-1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm">Country:</label>
                        <select
                          name="country"
                          value={addressForm.country}
                          onChange={handleAddressChange}
                          className="w-full border rounded px-2 py-1"
                        >
                          <option value="">Select Country</option>
                          <option value="USA">USA</option>
                          <option value="Canada">Canada</option>
                          <option value="India">India</option>
                          <option value="Australia">Australia</option>
                          <option value="Switzerland">Switzerland</option>
                        </select>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="submit"
                          className="bg-lime-500 text-white px-4 py-2 rounded-full hover:bg-lime-600 transition duration-300"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingAddress(false)}
                          className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p>
                        Street:{" "}
                        {selector.address?.street || "No street provided"}
                      </p>
                      <p>
                        City: {selector.address?.city || "No city provided"}
                      </p>
                      <p>
                        State: {selector.address?.state || "No state provided"}
                      </p>
                      <p>
                        Postal Code:{" "}
                        {selector.address?.postalCode ||
                          "No postal code provided"}
                      </p>
                      <p>
                        Country:{" "}
                        {selector.address?.country || "No country provided"}
                      </p>
                      <button
                        onClick={() => setEditingAddress(true)}
                        className="mt-2 bg-lime-500 text-white px-4 py-2 rounded-full hover:bg-lime-600 transition duration-300"
                      >
                        Edit Address
                      </button>
                    </>
                  )}
                </div>
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
                {selector.myOrders.map((i, _) => {
                  return (
                    <ul className="space-y-4" key={_}>
                      <li className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition duration-300">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-bold">Order #{i.id}</h3>
                            <p className="text-gray-600">
                              Date: {new Date().toISOString().split("T")[0]}
                            </p>

                            {i.items.length > 0 && (
                              <p className="text-gray-600">
                                Total Price: $
                                {(
                                  i.items.reduce((total, item) => {
                                    const price = parseFloat(
                                      item.price.replace("$", "")
                                    );
                                    const discountedPrice =
                                      price - (price * item.discount) / 100;

                                    const quantity = item.quantity || 1;

                                    const totalPriceForItem =
                                      discountedPrice * quantity;

                                    return total + totalPriceForItem;
                                  }, 0) * 1.18
                                ).toFixed(2)}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => openModal(i)}
                            className="bg-lime-500 h-fit text-white px-4 py-2 rounded-full hover:bg-lime-600 transition duration-300"
                          >
                            View Details
                          </button>
                        </div>
                      </li>
                    </ul>
                  );
                })}
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {selector.wishlist.map((item, index) => (
                    <li
                      className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-md transition duration-300"
                      key={index}
                    >
                      <img
                        src={item.url}
                        alt="Product"
                        className="w-full h-48 rounded-lg mb-2"
                      />
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <p className="text-gray-600">{item.price}</p>
                      <div className="flex justify-between mt-4">
                        <button
                          className="bg-lime-500 text-white px-4 py-2 rounded-full hover:bg-lime-600 transition duration-300"
                          onClick={() => addToCartHandler(item)}
                        >
                          Add to Cart
                        </button>
                        <button
                          className="cursor-pointer rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-200 transition duration-300"
                          onClick={() => handleRemove(item)}
                        >
                          <img src={deleted} alt="Remove" className="h-6 w-6" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {showModal && (
          <Modal closeModal={closeModal} selectedProduct={selectedProduct}>
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">
                Order #{selectedProduct.id} Details
              </h2>
              <ul className="space-y-2">
                {selectedProduct.items.map((item, index) => (
                  <li key={index} className="border-b pb-2 mb-2">
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">Price: {item.price}</p>
                  </li>
                ))}
              </ul>
              <button
                onClick={closeModal}
                className="mt-4 bg-lime-500 text-white px-4 py-2 rounded-full hover:bg-lime-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </Modal>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
