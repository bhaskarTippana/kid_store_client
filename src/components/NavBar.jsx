/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import logo from "../Assets/logo.svg";
import search from "../Assets/search.svg";
import bar from "../Assets/bars.svg";
import notification from "../Assets/notification.svg";
import cross from "../Assets/cross.svg";
import { SideBar } from "./SideBar";
import axios from "axios";
import SearchInput from "./SearchInput";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
export const NavBar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [cartLength, setCartLength] = useState([]);
  const [wishlist, setWishList] = useState([]);
  const [focus, setFocus] = useState(false);
  const [searchInfo, setSearchInfo] = useState("");
  const navigate = useNavigate();
   const dispatch = useDispatch();
   const selector = useSelector(e=>e.cart);
  const cartRes = async () => {
   
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      const res = await axios.post(
        'http://localhost:5500/cartLength',{},{
          headers:{token}
        }
      );
      // setCartLength(res.data.cart);
      dispatch({ type: "ADD_TO_CART", payload: res.data.cart });
      setWishList(res.data.wishlist);
    }
  };

  const [title, setTitle] = useState([]);
  const getTitles = async () => {
    const res = await axios.get("http://localhost:5500/kids-store/titles");
    setTitle(res.data);
  };

  // console.log(selector);

  // useEffect(() => {
  //   getTitles();
  // });

  useEffect(() => {
    // cartRes();
    // getTitles();
  },[]);

  const handleOpenCart = () => {
    navigate("/cartItems");
  };

  const handleWishlist = () => {
    navigate("/wishlist");
  };
  return (
    <>
      {searchBar ? (
        <SearchInput setSearchBar={setSearchBar} />
      ) : (
        <div className="grid grid-cols-12 py-2 place-items-center bg-[#176B87] text-white relative">
          {sidebar ? <SideBar /> : ""}
          <div className="col-span-6 flex items-center justify-center grid-cols-12 md:col-span-3 lg:col-span-5 lg:w-full">
            <div className="col-span-2 md:mr-3 lg:hidden">
              <img
                className={sidebar ? "h-7" : "h-9"}
                src={sidebar ? cross : bar}
                alt=""
                onClick={() => setSidebar(!sidebar)}
              />
            </div>
            <div className="col-span-10 lg:col-span-3">
              <img
                onClick={() => navigate("/")}
                className="h-12 w-[125px] md:h-16 lg:ml-3"
                src={logo}
                alt=""
              />
            </div>
            <div className="hidden lg:col-span-9 lg:grid lg:grid-cols-12 place-items-center w-full text-xl lg:ml-3">
              <p
                className="col-span-3 cursor-pointer"
                onClick={() => navigate("/categories")}
              >
                Categories
              </p>
              {/* {wishlist.length > 0 && (
                <p
                  className="col-span-3 cursor-pointer flex items-center justify-center"
                  onClick={handleWishlist}
                >
                  Wishlist{" "}
                  <img
                    className="h-5 pl-3"
                    src="https://cdn-icons-png.freepik.com/512/7245/7245022.png"
                  />
                </p>
              )} */}
              <p
                className="col-span-3 cursor-pointer flex items-center justify-center"
                onClick={handleWishlist}
              >
                Wishlist{" "}
                <img
                  className="h-5 pl-3"
                  src="https://cdn-icons-png.freepik.com/512/7245/7245022.png"
                />
              </p>
              <p className="col-span-3 cursor-pointer">About Us</p>
              <p className="col-span-3 cursor-pointer">History</p>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          <div className="hidden md:col-span-6 md:block lg:col-span-4">
            <SearchInput
              setFocus={setFocus}
              searchInfo={searchInfo}
              setSearchInfo={setSearchInfo}
            />
          </div>

          <div className="col-span-6 flex items-center justify-evenly grid-cols-12 w-full md:col-span-3 lg:col-span-2">
            <div className="col-span-4">
              <img
                className="h-6 w-7 lg:hidden md:hidden"
                src={search}
                alt=""
                onClick={() => setSearchBar(!searchBar)}
              />
            </div>
            {/* {selector.length > 0 && (
              <div
                className="col-span-4 cursor-pointer"
                onClick={handleOpenCart}
              >
                <div className="relative">
                  <i className="fa-solid fa-cart-shopping text-2xl"></i>
                  <div className="h-4 w-4 rounded-full bg-green-300 grid place-items-center absolute -top-2 -right-2">
                    <span className=" text-white text-[10px] font-bold">
                      {selector.length}
                    </span>
                  </div>
                </div>
              </div>
            )} */}
            <div className="col-span-4 cursor-pointer" onClick={handleOpenCart}>
              <div className="relative">
                <i className="fa-solid fa-cart-shopping text-2xl"></i>
                <div className="h-4 w-4 rounded-full bg-green-300 grid place-items-center absolute -top-2 -right-2">
                  <span className=" text-white text-[10px] font-bold">
                    {777}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <button
                className="text-xl h-9 w-9 rounded-full bg-lime-500 grid place-items-center"
                onClick={() => navigate("/login")}
              >
                S
              </button>
            </div>
          </div>
        </div>
      )}

      {focus && (
        <div className="col-span-12 grid grid-cols-12 items-center justify-center bg-[#dddddd] absolute z-40 w-screen h-full">
          {title.length !== 0 &&
            title.map((e, _) => {
              return searchInfo === "" ? (
                <div
                  onClick={() => {
                    navigate(`/category/${e.title}`), setFocus(true);
                  }}
                  key={_}
                  className="h-28 w-28 md:h-48 md:w-48 mx-auto rounded-full col-span-4 lg:col-span-3 m-3 border relative"
                  style={{
                    background: `url(${e.title_url})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <p className="absolute bottom-5 text-center w-full font-bold md:text-xl text-white bg-[#dddddd75] rounded-b-xl">
                    {e.title}
                  </p>
                </div>
              ) : e.title.includes(searchInfo) ? (
                <div
                  onClick={() => navigate(`/category/${e.title}`)}
                  key={_}
                  className="h-28 w-28 md:h-48 md:w-48 mx-auto rounded-full col-span-4 lg:col-span-3 m-3 border relative"
                  style={{
                    background: `url(${e.title_url})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <p className="absolute bottom-5 text-center w-full font-bold md:text-xl text-white bg-[#dddddd75] rounded-b-xl">
                    {e.title}
                  </p>
                </div>
              ) : (
                <h1>No Titles Is Matched...</h1>
              );
            })}
        </div>
      )}
    </>
  );
};
