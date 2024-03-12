/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import axios from "axios";
import CartCard from "./CartCard";
import { useDispatch, useSelector } from "react-redux";
const AddToCart = () => {
  const dispatch = useDispatch();
  console.log(useSelector((e) => e.user));
  // const [items, setItems] = useState([]);
  // const handleQuantityChange = (e) => {
  //   setQuantity(parseInt(e.target.value));
  // };
  const items = useSelector((e) => e.cart);
  const [actualCost, setActualCost] = useState(0);
  const [premium, setPremium] = useState(0);

  const handleRemoveItem = () => {
    // Implement the logic to remove the item from the cart
    console.log("Item removed from cart");
  };

  const cartItems = async (req, res) => {
    const user_id = localStorage.getItem("token");
    const response = await axios.post(
      `http://localhost:5500/products/${user_id}`,
      { type: "add" },{
        headers:{
          token:user_id
        }
      }
    );
    // setItems(response.data);
    // console.log(response.data);
    // const productsArray = response.data;

    // Dispatching the action
    // dispatch({ type: "MY_PRODUCTS", payload: productsArray });
  };

  const gst = Math.round(premium * 0.18);
  useEffect(() => {
    cartItems();
  }, [items]);

  return (
    <>
      <NavBar />
      <div className="grid grid-cols-12 m-3 rounded-xl border relative">
        <h1 className="pt-5 px-5 text-3xl font-semibold col-span-12">
          Shopping Cart!
        </h1>
        {/* {items.length !== 0 &&
          items.map((e, _) => {
            return (
              <div
                className="col-span-8 m-3 rounded-xl border bg-gray-100"
                key={_}
              >
                <CartCard
                  e={e}
                  setActualCost={setActualCost}
                  setPremium={setPremium}
                />
              </div>
            );
          })} */}
      {/* {!actualCost <=0 ? <div className="col-span-4 m-3 sticky w-full bottom-0 right-5">
          <div className="h-80 bg-gray-100 w-full rounded-xl border p-5 grid">
            <h1 className="text-2xl">Order Summary</h1>
            <h1 className="border-b-2 pt-1 ">
              Products Price :
              <span className="line-through">$ {actualCost}</span>
            </h1>
            <h1 className="border-b-2 pt-1">
              Discount Price :$ {premium}{" "}
              <span className="pl-10">
                Saved Money : $ {actualCost - premium}
              </span>
            </h1>
            <h1 className="border-b-2 pt-1">GST (18%) : $ {gst}</h1>
            <h1 className="border-b-2 pt-1">
              Total Price : $ {gst + premium}{" "}
            </h1>
            <button className="rounded bg-blue-500 text-white">
              Checkout Now
            </button>
          </div>
        </div>:<div>Nothing is there!</div>} */}

      </div>
    </>
  );
};

export default AddToCart;
