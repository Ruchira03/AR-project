import React from 'react'
import './footer.scss'
import logo from '../../assets/logo2.png'
import {FaFacebookF, FaTwitter , FaLinkedinIn} from 'react-icons/fa'
import {SiGmail} from 'react-icons/si'


function Footer () { 
    return (
      <>
       
    <footer className="site-footer">
    <div className="container">
      <div className="row">
        <div className="col-sm-12col-md-6">
          <h6>About</h6>
          <img src = {logo} alt="logo"></img>
        </div>

        <div className="col-xs-6col-md-3">
          <h6>Categories</h6>
          <ul className="footer-links">
            <li><a href="/">Chair</a></li>
            <li><a href="/">Coffee Table</a></li>
            <li><a href="/">Sofa</a></li>
            <li><a href="/">Cupboard</a></li>
            <li><a href="/">Drawer</a></li>
            <li><a href="/">Lamp</a></li>
          </ul>
        </div>

        <div className="col-xs-6col-md-3">
          <h6>Quick Links</h6>
          <ul className="footer-links">
            <li><a href="/">About Us</a></li>
            <li><a href="/">Contact Us</a></li>
            <li><a href="/">Contribute</a></li>
            <li><a href="/">Privacy Policy</a></li>
            <li><a href="/">Sitemap</a></li>
          </ul>
        </div>
      </div>
      
    </div>
    <div className="container" id="second">
      <div className="row">
        <div className="col-md-8col-sm-6col-xs-12">
          <p className="copyright-text">Copyright &copy; 2022 All Rights Reserved.
          </p>
        </div>

        <div className="col-md-4col-sm-6 col-xs-12">
          <ul className="social-icons">
            <li><a className="facebook" href="#"><FaFacebookF/></a></li>
            <li><a className="twitter" href="#"><FaTwitter/></a></li>
            <li><a className="dribbble" href="#"><SiGmail/></a></li>
            <li><a className="linkedin" href="#"><FaLinkedinIn/></a></li>   
          </ul>
        </div>
      </div>
    </div>
</footer>      
      </>
    );
}

 export default Footer;  