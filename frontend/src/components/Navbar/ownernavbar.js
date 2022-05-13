import React from "react";
import logo from "../../assets/logo.jpg";
import "./navbar.scss";

export default function Navbar() {
  return (
    <header>
      <div className="header-inner">
        <img src={logo} alt="logo" />
        <nav>
          <ul>
            <li>
              <a href="/ownerhome">Products</a>
            </li>
            <li>
              <a href="/addproduct">Add Products</a>
            </li>
            <li>
              <a href="/">Categories</a>
            </li>
            <li>
              <a href="/">Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
