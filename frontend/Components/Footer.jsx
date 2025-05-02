import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-md">
          {/* Company Info */}
          <div>
            <h3 className="title">PharmaCart</h3>
            <p>
              Your trusted partner for medical supplies and pharmaceuticals.
              We deliver care to your doorstep.
            </p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookF className="icon" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <FaGithub className="icon" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram className="icon" />
              </a>
            </div>
           
          </div>
          

          {/* Quick Links */}
          <div>
            <h3>Quick Links</h3>
            <ul className="links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3>Contact Us</h3>
            <ul className="contact-info">
              <li>
                <FaMapMarkerAlt className="icon" />
                <span>123 Medical Plaza, Healthcare District, NY 10001</span>
              </li>
              <li>
                <FaPhoneAlt className="icon" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <FaEnvelope className="icon" />
                <span>info@pharmacart.com</span>
              </li>
            </ul>
          </div>
        </div>
        </div>
        {/* Bottom Section */}
        <div className="bottom">
          <p>&copy; {new Date().getFullYear()} PharmaCart. All rights reserved.</p>
        </div>
     
    </footer>
  );
};

export { Footer };
