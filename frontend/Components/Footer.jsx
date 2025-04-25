import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import Font Awesome icons
import {
  faFacebook,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons"; // Social media icons
import "./Footer.css";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-logo">PharmaCart</h2>
        <h3 className="footer-tagline">Your Trusted Online Medicine Partner</h3>

        <div className="footer-links">
          <div>
            <h2 className="footer-heading">Company</h2>
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
          <div>
            <h2 className="footer-heading">Support</h2>
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

        {/* Social Media Icons with Font Awesome */}
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
          ↑ Back to Top
        </button>
        <h3 className="footer-copyright">
          &copy; 2025 PharmaCart. All rights reserved.
        </h3>
      </div>
    </footer>
  );
}
