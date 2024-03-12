/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import baby from "../Assets/baby.avif";
import babu from "../Assets/babu.avif";
import { NavBar } from "./NavBar";
import { redirect, useNavigate,Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import Register from "./Register";
const LandingPage = () => {
  let dispatch = useDispatch();
  let is = useSelector(e=>e.user);
  const [title, setTitle] = useState([]);



  const getTitles = async () => {
    const res = await axios.get("http://localhost:5500/kids-store/titles");
    setTitle(res.data);
  };


  async function getAuth() {
    let token = localStorage.getItem("token");
    if (token) {
      try {
        let res = await axios.get("http://localhost:5500/users", {
          headers: {
            token,
          },
        });
        if(res.status === 200){
          dispatch({type:"USER_DATA",payload:res.data})
        }else{
          console.log('failed to verify the token')
        }
      } catch (error) {
        console.log('you have token but it is not valid');
      }
    } else {
      console.log('not logged in cannot access all features !')
    }
  }

  useEffect(() => {
    getTitles();
    getAuth();
  }, []);

  return (
    <div className="relative">
      <NavBar />
      <div className="grid grid-cols-12 relative">
        <div
          className="md:h-80 lg:h-96 hidden md:grid lg:grid md:col-span-6 lg:col-span-6"
          style={{
            background: `url(${baby})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>

        <div
          className="h-64 md:h-80 lg:h-96 col-span-12 md:col-span-6 lg:col-span-6 text-lg md:text-2xl lg:text-3xl text-white font-bold"
          style={{
            background: `url(${babu})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <p className="absolute left-3 right-3 md:top-10 md:right-64 w-fit md:w-[800px] lg:w-[1000px] lg:left-36 lg:top-28 h-fit bg-[#dddddd75] rounded-b-xl md:rounded-xl p-3">
            Welcome to KIDS_STORE - Where Every Kids Dream Comes True! <br />
            <span className="text-xs md:text-lg">
              Discover a World of Wonder for Your Little Ones !....
            </span>
            <br />
            <span className="text-xs md:text-lg">
              At KIDS_STORE, we believe in making every childhood magical. Our
              carefully curated collection of kids essentials brings together
              quality, creativity, and joy. From adorable clothing to
              educational toys, we have got everything your child needs to grow,
              learn, and play.
            </span>
          </p>
          <Link to={"/categories"}>categories</Link>
        </div>

        {/* <div className="col-span-12 grid grid-cols-12 items-center justify-center bg-[#176B873d]">
          {title.length !== 0 &&
            title.map((e, _) => {
              return (
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
              );
            })}
        </div> */}
      </div>
    </div>
  );
};

export default LandingPage;
