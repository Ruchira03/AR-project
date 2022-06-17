import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { API } from "./backend";
import Homepage from "./pages/home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import "./App.scss";
import Ownerlogin from "./pages/owner/login";
import Ownerhomepage from "./pages/owner/homepage";
import Addproduct from "./pages/owner/addproduct";
import Products from "./pages/products";
import Editproduct from "./pages/owner/editproduct";
import ProductDisplay from "./pages/Product_display";
import Cart from "./pages/cart";
import Order from "./pages/order";
import Ownerorder from "./pages/owner/Order";
function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/userhomepage" element={<Homepage />} />
          <Route path="/ownerlogin" element={<Ownerlogin />} />
          <Route path="/ownerhome" element={<Ownerhomepage />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/products" element={<Products />} />
          <Route path="/editproduct" element={<Editproduct />} />
          <Route path="/productdisplay" element={<ProductDisplay />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/owner/orders" element={<Ownerorder />} />
        </>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
