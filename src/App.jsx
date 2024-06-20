// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categories from "./components/Categories";
import Product from "./components/Product";
import Summary from "./components/CheckoutForm";
import Login from "./components/Login";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import AddToCart from "./components/AddToCart";
import AddToFav from "./components/AddToFav";
import CheckoutForm from "./components/CheckoutForm";
import ProfilePage from "./components/ProfilePage";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentCancel from "./components/PaymentCancel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/categories" element={<Home />} />
        <Route path="/category/:category" element={<Categories />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cartItems" element={<AddToCart />} />
        <Route path="/wishlist" element={<AddToFav />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
