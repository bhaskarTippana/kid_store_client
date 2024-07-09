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
import { useDispatch, useSelector } from "react-redux";
import cart from "../Assets/carts.svg";
import fav from "../Assets/fav.svg";
import user from "../Assets/user.svg";
import logout from "../Assets/logout.svg";
import login from "../Assets/login.svg";
import { BASE_URL, LOCAL_URL } from "../config";
import SearchItems from "./SearchItems";

export const NavBar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [searchInfo, setSearchInfo] = useState("");
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((e) => e);
  const [title, setTitle] = useState([]);
  const [options, setOptions] = useState(false);
  const getTitles = async () => {
    const res = await axios.get(`${LOCAL_URL}kids-store/titles`);
    setTitle(res.data);
  };

  useEffect(() => {
    getTitles();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const MyOrders = async () => {
    const token = localStorage.getItem("token");

    const payload = {
      action: "MY_ORDER_LIST",
      product:
        selector.user.buyCart.length > 0
          ? selector.user.buyCart
          : selector.user.buyProductsCart,
    };
    try {
      const res = await axios.post(`${LOCAL_URL}cart`, payload, {
        headers: { token: token },
      });

      if (res.status === 200) {
        dispatch({ type: "MY_ORDERS", payload: res.data.myOrders });
      }
    } catch (error) {
      console.error("Error updating orders:", error);
    }
  };

  return (
    <>
      {searchBar ? (
        <SearchInput
          setSearchBar={setSearchBar}
          searchInfo={searchInfo}
          setFocus={setFocus}
          setSearchInfo={setSearchInfo}
          focus={focus}
        />
      ) : (
        <div className="grid grid-cols-12 py-2 place-items-center bg-[#176B87] text-white relative">
          {sidebar ? <SideBar setSidebar={setSidebar} sidebar={sidebar} /> : ""}
          <div className="col-span-6 flex items-center justify-center grid-cols-12 md:col-span-3 lg:col-span-3 lg:w-full">
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
                onClick={() => {
                  selector.user.buyCart.length > 0 ||
                    (selector.user.buyProductsCart.length > 0 && MyOrders());
                  navigate("/");
                }}
                className="h-12 w-[125px] md:h-16 lg:ml-3"
                src={logo}
                alt=""
              />
            </div>
            <div className="hidden lg:col-span-9 lg:grid w-full text-xl lg:ml-3">
              <p
                className="cursor-pointer mx-auto p-1  rounded hover:bg-lime-400 hover:border hover:transition-all"
                onClick={() => navigate("/categories")}
              >
                Categories
              </p>
            </div>
          </div>

          <div className="hidden md:col-span-6 md:block lg:col-span-6">
            <SearchInput
              searchInfo={searchInfo}
              setSearchInfo={setSearchInfo}
              focus={focus}
              setFocus={setFocus}
            />
          </div>

          <div className="col-span-6 flex items-center justify-evenly grid-cols-12 w-full md:col-span-3 lg:col-span-3">
            <div className="col-span-4">
              <img
                className="h-6 w-7 lg:hidden md:hidden"
                src={search}
                alt=""
                onClick={() => {
                  setSearchBar(!searchBar);
                  setFocus(!focus);
                }}
              />
            </div>
            {selector.isLogin && selector?.user?.cart?.length > 0 && (
              <div
                className="col-span-4 cursor-pointer hidden md:block"
                onClick={() => navigate("/cartItems")}
              >
                <div className="relative">
                  <img src={cart} alt="Cart" />
                  <div className="h-5 w-5 rounded-full bg-lime-400 grid place-items-center absolute -top-3 -right-3">
                    <span className="text-white text-[0.8em] font-bold">
                      {selector?.user?.cart?.length}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {selector?.isLogin && selector?.user?.wishlist?.length > 0 && (
              <div className="hidden md:block">
                <span
                  onClick={() => navigate("/wishlist")}
                  className="cursor-pointer"
                >
                  <img src={fav} alt="Wishlist" />
                </span>
              </div>
            )}

            <div className="col-span-4 relative">
              <button
                className="text-xl h-9 w-9 rounded-full bg-lime-500 grid place-items-center hover:bg-lime-600 transition duration-300"
                onClick={() => setOptions(!options)}
              >
                {selector?.user?.firstName
                  ? selector?.user?.firstName.slice(0, 1).toUpperCase()
                  : "@"}
              </button>
              {options && (
                <ul className="absolute top-7 z-50 grid align-middle m-3 w-32 gap-y-3 p-3 bg-black rounded-lg right-2 text-xl text-white shadow-lg">
                  {selector?.isLogin ? (
                    <>
                      <li
                        className="hover:bg-gray-700 cursor-pointer rounded flex py-2 align-middle hover:border"
                        onClick={() => navigate("/profile")}
                      >
                        <img src={user} alt="Profile" className="pr-2" />
                        <p>Profile</p>
                      </li>
                      <li
                        className="hover:bg-gray-700 cursor-pointer rounded flex py-2 align-middle hover:border"
                        onClick={() => handleLogout()}
                      >
                        <img src={logout} alt="Logout" className="pr-2" />
                        <p>Logout</p>
                      </li>
                    </>
                  ) : (
                    <li
                      className="hover:bg-gray-700 cursor-pointer rounded flex py-2 align-middle hover:border"
                      onClick={() => navigate("/login")}
                    >
                      <img src={login} alt="Login" className="pr-2" />
                      <p>Login</p>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {focus && (
        <div
          className="bg-[#0000005d] absolute z-50 top-20 w-full left-0 h-[55em] md:h-screen scrollbar-hide"
          onClick={() =>{setSearchInfo(""); setFocus(false)}}
        >
          <SearchItems
            searchInfo={searchInfo}
            setSearchInfo={setSearchInfo}
            setFocus={setFocus}
          />
        </div>
      )}
    </>
  );
};
