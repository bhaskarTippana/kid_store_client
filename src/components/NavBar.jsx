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
export const NavBar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [cartLength, setCartLength] = useState([]);
  const [wishlist, setWishList] = useState([]);
  const [focus, setFocus] = useState(false);
  const [searchInfo, setSearchInfo] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((e) => e.user);
  const [title, setTitle] = useState([]);
  const getTitles = async () => {
    const res = await axios.get("http://localhost:5500/kids-store/titles");
    setTitle(res.data);
  };

  const AddedProducts = async () => {
    try {
      if (token) {
        const res = await axios.post(
          "http://localhost:5500/cart",
          {},
          {
            headers: {
              token,
            },
          }
        );
        dispatch({ type: "USER_DATA", payload: res.data });
      } else {
        navigate("/login");
      }
    } catch (error) {}
  };


  useEffect(() => {
    getTitles();
   AddedProducts();
  }, []);

  const handleOpenCart = () => {
    navigate("/cartItems");
  };
  return (
    <>
      {searchBar ? (
        <SearchInput setSearchBar={setSearchBar} />
      ) : (
        <div className="grid grid-cols-12 py-2 place-items-center bg-[#176B87] text-white relative">
          {sidebar ? <SideBar /> : ""}
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
                onClick={() => navigate("/")}
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
              setFocus={setFocus}
              searchInfo={searchInfo}
              setSearchInfo={setSearchInfo}
            />
          </div>

          <div className="col-span-6 flex items-center justify-evenly grid-cols-12 w-full md:col-span-3 lg:col-span-3">
            <div className="col-span-4">
              <img
                className="h-6 w-7 lg:hidden md:hidden"
                src={search}
                alt=""
                onClick={() => setSearchBar(!searchBar)}
              />
            </div>
            {selector.cart.length > 0 && (
              <div
                className="col-span-4 cursor-pointer"
                onClick={handleOpenCart}
              >
                <div className="relative">
                  <i className="fa-solid fa-cart-shopping text-3xl"></i>
                  <div className="h-5 w-5 rounded-full bg-lime-400 grid place-items-center absolute -top-3 -right-3">
                    <span className=" text-white text-[0.8em] font-bold">
                      {selector.cart.length}
                    </span>
                  </div>
                </div>
              </div>
            )}
           {selector.wishlist.length>0 && <span onClick={() => navigate("/wishlist")}>C</span>}
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
              ) : (
                e.title.includes(searchInfo) && (
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
                )
              );
            })}
        </div>
      )}
    </>
  );
};
