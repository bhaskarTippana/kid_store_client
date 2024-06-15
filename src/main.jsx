/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { useDispatch } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { GoogleOAuthProvider } from '@react-oauth/google';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userIn = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get("http://localhost:5500/users", {
            headers: { token: token },
          });
          console.log(res.data, "opopop");
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
  <GoogleOAuthProvider clientId="25996951861-91hotg0eq52ffadj39v40vr9npabejt1.apps.googleusercontent.com">
  <Provider store={store}>
      <Main />
  </Provider>
  </GoogleOAuthProvider>
);
