import React, { useState, useEffect } from "react";
import BuyCart from "./BuyCart";
import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import edit from "../Assets/edit.svg";
import email from "../Assets/email.svg";
import AddressForm from "./AddressForm";
import { NavBar } from "./NavBar";
import Footer from "./Footer";
import {BASE_URL,LOCAL_URL } from "../config"
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function CheckoutForm() {
  const [showModal, setShowModal] = useState(false);
  const [Subtotal, setSubTotal] = useState(0);

  const selector = useSelector((e) => e.user);

  const gst = Math.round(Subtotal * 0.18);
  const total = Subtotal + gst;



  const makePayment = async () => {
    const values = Object.values(selector?.address);

    if (values.some((value) => value === "")) {
      toast.error("Address is not there. Stopping payment.");
    } else {

      try {
        const stripe = await loadStripe(
          "pk_test_51PRpGcGQSPaxSENUQdD3q5QYV4x7SQHDQqM8lqEY9ZNNCHklG6SjNfVy2xLcaPkBwwsfrD6w93LB5Gqj4BvkySPp004Ppa9hV5"
        );


        const body = {
          products:
            selector.buyProductsCart.length > 0
              ? selector.buyProductsCart
              : selector.buyCart,
        };

        const headers = {
          "Content-Type": "application/json",
        };

        const res = await axios.post(
          `${LOCAL_URL}checkout-session`,
          body,
          {
            headers,
          }
        );

        const session = res.data;

        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.error(result.error.message);
          // Handle error message display or further actions
        }
      } catch (error) {
        console.error("Error during payment process:", error);
        // Handle error in payment process, such as displaying an error message to the user
      }
    }
  };

  return (
    <>
      <NavBar />
      <ToastContainer autoClose={3000} transition={Bounce} position="bottom-center" />
      <div className="min-w-screen min-h-screen bg-gray-50 py-5">
        <div className="px-5">
          <div className="mb-2">
            <a
              href="/"
              className="focus:outline-none hover:underline text-gray-500 text-sm"
            >
              <i className="mdi mdi-arrow-left text-gray-400"></i>Back
            </a>
          </div>
          <div className="mb-2">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-600">
              Checkout.
            </h1>
          </div>
          <div className="mb-5 text-gray-400">
            <a
              href="/"
              className="focus:outline-none hover:underline text-gray-500"
            >
              Home
            </a>{" "}
            /{" "}
            <a
              href="/categories"
              className="focus:outline-none hover:underline text-gray-500"
            >
              Cart
            </a>{" "}
            / <span className="text-gray-600">Checkout</span>
          </div>
        </div>
        <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
          <div className="w-full">
            <div className="-mx-3 md:flex items-start">
              <div className="px-3 md:w-7/12 lg:pr-10">
                {selector.buyProductsCart &&
                  selector.buyProductsCart.map((e, _) => (
                    <BuyCart key={_} data={e} setSubTotal={setSubTotal} />
                  ))}

                {selector.buyCart &&
                  selector.buyCart.map((e, _) => (
                    <BuyCart key={_} data={e} setSubTotal={setSubTotal} />
                  ))}
                <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                  <div className="w-full flex mb-3 items-center">
                    <div className="flex-grow">
                      <span className="text-gray-600">Subtotal</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">$ {Subtotal}</span>
                    </div>
                  </div>
                  <div className="w-full flex items-center">
                    <div className="flex-grow">
                      <span className="text-gray-600">Taxes (GST)</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">$ {gst}</span>
                    </div>
                  </div>
                </div>
                <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                  <div className="w-full flex items-center">
                    <div className="flex-grow">
                      <span className="text-gray-600">Total</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">$ {total}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3 md:w-5/12">
                <p className="text-xl">Customer </p>
                <div className="flex justify-between w-52 items-center p-4">
                  <p className="h-16 w-16 bg-lime-500 rounded-full grid items-center justify-center text-3xl text-white ">
                    {selector.firstName.slice(0, 1).toUpperCase()}
                  </p>
                  <p>{selector.firstName + " " + selector.lastName}</p>
                </div>
                <p className="border w-full"></p>
                <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <img src={email} alt="" />
                  <p className="cursor-pointer text-sm leading-5 ">
                    {selector.email ? selector.email : "user@email.com"}
                  </p>
                </div>
                <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-2 md:mt-0">
                  <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                    <div className="w-full flex justify-end">
                      <button
                        className="border p-2 flex items-center justify-evenly w-20 m-2"
                        onClick={() => setShowModal(true)}
                      >
                        <p>Edit </p>
                        <p>
                          <img src={edit} alt="" />
                        </p>
                      </button>
                    </div>
                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-2">
                      <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                        Shipping Address
                      </p>
                      <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                        {selector.address?.street +
                          " " +
                          selector.address?.city +
                          " " +
                          selector.address?.postalCode}
                        ,{" "}
                        {selector.address?.state +
                          "," +
                          " " +
                          selector.address?.country +
                          "."}
                      </p>
                    </div>

                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                      <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                        Billing Address
                      </p>
                      <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                        {selector.address?.street +
                          " " +
                          selector.address?.city +
                          " " +
                          selector.address?.postalCode}
                        ,{" "}
                        {selector.address?.state +
                          "," +
                          " " +
                          selector.address?.country +
                          "."}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full justify-center items-center md:justify-start md:items-start"></div>
                </div>
                <button
                  className="mt-3 block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold"
                  onClick={makePayment}
                >
                  <i className="mdi mdi-lock-outline mr-1"></i> PAY NOW
                </button>
              </div>
            </div>
          </div>
        </div>
        {showModal && <AddressForm setShowModal={setShowModal} />}
      </div>
      <Footer />
    </>
  );
}

export default CheckoutForm;
