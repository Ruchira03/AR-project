import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.jpg";
import { signout } from "../../helper/Auth";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import "./navbar.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import Badge from "@mui/material/Badge";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
export default function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const [qty, setqty] = useState(0);
  const [order, setorder] = useState(0);
  useEffect(() => {
    setqty(Number(localStorage.getItem("qty")));
    setorder(Number(localStorage.getItem("order")));
  }, [localStorage.getItem("qty"), localStorage.getItem("order")]);

  return (
    <header>
      <div className="header-inner">
        <img src={logo} alt="logo" />
        <nav className={showLinks ? "mobile-view" : "desktop-view"}>
          <ul>
            <li>
              <a href="/userhomepage">About</a>
            </li>
            <li>
              <a href="/products">Discover</a>
            </li>
            <li>
              <a href="/cart">
                <Badge badgeContent={qty} color="primary">
                  <ShoppingCartRoundedIcon fontSize="medium" />
                </Badge>
              </a>
            </li>
            <li>
              <a href="/orders">Orders</a>
              <Badge badgeContent={order} color="primary">
                <ShoppingBagIcon />
              </Badge>
            </li>
            <li onClick={signout}>
              <a href="/">Logout</a>
            </li>
          </ul>
        </nav>
        <GiHamburgerMenu
          onClick={() => setShowLinks(!showLinks)}
          id="show-menu"
        />
      </div>
    </header>
  );
}
