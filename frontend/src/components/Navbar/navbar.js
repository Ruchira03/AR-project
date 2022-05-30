import React, {useState} from "react";
import logo from "../../assets/logo.jpg";
import { signout } from "../../helper/Auth";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import "./navbar.scss";
import {GiHamburgerMenu} from "react-icons/gi"

export default function Navbar() {
  const [showLinks, setShowLinks] = useState(false)
  return (
    <header>
      <div className="header-inner">
        <img src={logo} alt="logo" />
        <nav className= {showLinks ? "mobile-view" : "desktop-view"}>
          <ul>
            <li>
              <a href="/userhomepage">About</a>
            </li>
            <li>
              <a href="/products">Discover</a>
            </li>
            <li>
              <a href="/cart">
                <ShoppingCartRoundedIcon fontSize="medium" />
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
        <GiHamburgerMenu onClick={()=> setShowLinks(!showLinks) } id="show-menu"/>
      </div>
    </header>
  );
}
