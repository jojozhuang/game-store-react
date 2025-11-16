import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Products from "./product/Products";
import Product from "./product/Product";

const App = () => (
  <div>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product" element={<Product />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
    <Footer />
  </div>
);

export default App;
