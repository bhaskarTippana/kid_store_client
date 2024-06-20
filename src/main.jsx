/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { useDispatch } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { BASE_URL, LOCAL_URL } from "./config.js";

const Main = () => {
  const dispatch = useDispatch();

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
  }, [dispatch]);

  return <App />;
};
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Main />
  </Provider>
);
