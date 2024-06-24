import React from "react";
// Hooks
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Components
import Header from "./Components/Header.js";
import Product from "./Components/Product.js";
import ProductDetails from "./Components/ProductDetails.js";
import Basket from "./Components/Basket.js";
import Signup from "./Components/Signup.js";
import Signin from "./Components/Signin.js";
import ForgotPassword from "./Components/ForgotPassword.js";
import Profile from "./Components/Profile.js";
import LocalStorage from "./script/LocalStorage.js";
import EditProfile from "./Components/EditProfile.js";
import Footer from "./Components/Footer.js";
import Home from "./Components/Home.js";
import Featured from "./Components/Featured.js";
import Recommended from "./Components/Recommended.js";
import CheckoutStep1 from "./Components/CheckoutStep1.js";
import CheckoutStep2 from "./Components/CheckoutStep2.js";
import CheckoutStep3 from "./Components/CheckoutStep3.js";
import ScrollToTop from "./Components/ScrollToTop.js";

import "./App.css";

function App() {
  const [searchVal, setSearchVal] = useState(""); // Used for searching products
  const [quantity, setQuantity] = useState(0); // Used for updating the quantity in the basket
  const [isOpened, setOpen] = useState(false); // Used for open/close basket

  useEffect(() => {
    // Get the quantity in the basket
    const basket = LocalStorage.getStorage("basket");
    setQuantity(basket.length);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Header setSearchVal={setSearchVal} quantity={quantity} setOpen={setOpen} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Product searchVal={searchVal} />} />
          <Route path="/product/:id" element={<ProductDetails setQuantity={setQuantity} setOpen={setOpen} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/featured" element={<Featured />} />
          <Route path="/recommended" element={<Recommended />} />
          <Route path="/checkout/step1" element={<CheckoutStep1 />} />
          <Route path="/checkout/step2" element={<CheckoutStep2 />} />
          <Route path="/checkout/step3" element={<CheckoutStep3 />} />
        </Routes>
        <Basket isOpened={isOpened} setOpen={setOpen} setQuantity={setQuantity} />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
