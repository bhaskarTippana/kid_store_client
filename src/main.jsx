/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios"; // Import axios
import { useDispatch } from "react-redux";
import App from "./App.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/store";

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

    userIn(); // Call the async function
  }, [dispatch]);

  return <App />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Main />
  </Provider>
);
