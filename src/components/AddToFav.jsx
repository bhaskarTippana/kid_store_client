/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import axios from "axios";

const AddToFav = () => {
  const [listItems, setListItems] = useState([]);

  const wishlistItems = async () => {
    try {
      const user_id = localStorage.getItem("user");
      const res = await axios.post("http://localhost:5500/wishlistproducts", {
        type: "add",
        id: user_id,
      });
      setListItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    wishlistItems();
  },[]);

  const handleRemove = async (id) => {
    try {
      const user_id = localStorage.getItem("user");
      const res = await axios.post("http://localhost:5500/wishlistproducts", {
        type: "del",
        id: user_id,
        pid: id,
      });
      setListItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      {/* {listItems.length !== 0 ? (
        listItems.map((e, _) => {
          return (
        
          );
        })
      ) : (
        <div>Nothing is there!</div>
      )} */}

      <div className="p-5">
        <h1>My WishList.....</h1>
        <div className="h-fit w-3/4 mx-auto">
          {listItems.length !== 0 ? (
            listItems.map((e, _) => {
              return (
                <div key={_} className="w-full border m-5 grid grid-cols-12">
                <div className="col-span-12 h-full p-2 grid grid-cols-12 border-b-2">
                  <div className="col-span-4 flex items-center justify-center">Product</div>
                  <div className="col-span-2 flex items-center justify-center">Product Name</div>
                  <div className="col-span-2 flex items-center justify-center">Product Price</div>
                  <div className="col-span-2 flex items-center justify-center">Product Rating</div>
                  <div className="col-span-2 flex items-center justify-center">Remove Item</div>
                </div>
                <div className="col-span-12 h-56 grid grid-cols-12 p-3">
                  <div className="col-span-4 flex items-center justify-center h-full"   style={{ 
  backgroundImage: `url(${e.url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}></div>
                  <div className="col-span-2 flex items-center justify-center">{e.name}</div>
                  <div className="col-span-2 flex items-center justify-center">{e.price}</div>
                  <div className="col-span-2 flex items-center justify-center">{e.rating}</div>
                  <div className="col-span-2 flex items-center justify-center" onClick={()=>handleRemove(e._id)}><i className="fa-solid fa-trash-can"></i></div>
                </div>
              </div>
              
              );
            })
          ) : (
            <div>Nothing is there!</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddToFav;
