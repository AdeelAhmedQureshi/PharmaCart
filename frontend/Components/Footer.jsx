import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-header">
          <h2 className="footer-logo">PharmaCart</h2>
          <h3 className="footer-tagline">Your Trusted Online Medicine Partner</h3>
        </div>

        <div className="footer-links">
          <div className="footer-section">
            <h2 className="footer-heading">COMPANY</h2>
            <ul className="footer-list">
              <li>
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h2 className="footer-heading">SUPPORT</h2>
            <ul className="footer-list">
              <li>
                <Link to="/faq" className="footer-link">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/terms" className="footer-link">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-social">
          <Link to="https://www.facebook.com/" className="footer-social-icon">
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
          <Link to="#" className="footer-social-icon">
            <FontAwesomeIcon icon={faGithub} />
          </Link>
          <Link to="https://www.instagram.com/" className="footer-social-icon">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
        </div>

        <button onClick={scrollToTop} className="footer-button">
          Back to Top
        </button>
        <p className="footer-copyright">
          © 2025 PharmaCart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}