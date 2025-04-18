import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar'
import Shop from "./Pages/Shop";
import LoginSignup from "./Pages/LoginSignup";
import Product from "./Pages/Product";
import ShopCategory from "./Pages/ShopCategory";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png"
import women_banner from "./Components/Assets/banner_women.png"
import kid_banner from "./Components/Assets/banner_kids.png"
import Orders from "./Components/Orders/Orders";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/mens" element={<ShopCategory banner = {men_banner} category="men" />} />
        <Route path="/womens" element={<ShopCategory banner = {women_banner} category="women" />} />
        <Route path="/kids" element={<ShopCategory banner = {kid_banner} category="kid" />} />
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/user-auth" element={<LoginSignup />} />
        <Route path="/orders" element={<Orders />} />


      </Routes>

      <Footer/>

    </>
  );
}

export default App;


