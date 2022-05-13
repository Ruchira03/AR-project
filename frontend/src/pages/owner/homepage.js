import React from "react";
import logo from "../../assets/logo.jpg";
import "../../components/Navbar/navbar.scss";

function homepage() {
  return (
    <div>
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
      <h1>home</h1>
    </div>
  );
}

export default homepage;
