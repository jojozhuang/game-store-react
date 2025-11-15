import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Products from "./product/Products";
import Product from "./product/Product";

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route exact path="/product" component={Product} />
      <Route path="/product/:id" component={Product} />
    </Switch>
    <Footer />
  </div>
);

export default App;
