import React from "react";
import logo from "../../assets/logo.jpg";
import { signout } from "../../helper/Auth";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import "./navbar.scss";

export default function Navbar() {
  return (
    <header>
      <div className="header-inner">
        <img src={logo} alt="logo" />
        <nav>
          <ul>
            <li>
              <a href="/userhomepage">About</a>
            </li>
            <li>
              <a href="/products">Discover</a>
            </li>
            <li>
              <a href="/cart">
                <ShoppingCartRoundedIcon fontSize="small" />
                Cart
              </a>
            </li>
            <li>
              <a href="/orders">Orders</a>
            </li>
            <li onClick={signout}>
              <a href="/">Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
