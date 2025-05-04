import React, { useState, useEffect } from "react";
import "./Checkout.css";
import { useContext } from "react";
import { LogInContext } from "../Context/UserContext";

export default function CheckoutComponent({ userData }) {
  const { userFullName, userEmail ,userAddress,userPhoneNumber} = useContext(LogInContext);
  const [formData, setFormData] = useState({
    fullName: userFullName || "",
    email: userEmail || "",
    address: userAddress || "",
    postalCode: "",
    paymentMethod: "credit_card",
    phoneNumber: userPhoneNumber || "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    email: "",
    postalCode: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        fullName: userData.fullName || "",
        email: userData.email || "",
        address: userData.address || "",
        phoneNumber: userData.phoneNumber || "",
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateInp(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Submitted:", formData);
    const hasErrors = Object.values(errors).some((err) => err !== "");
    const hasEmptyFields = Object.values(formData).some(
      (val) => val.trim() === ""
    );

    if (hasErrors || hasEmptyFields) {
      alert("Please fill all required fields correctly.");
      return;
    }

    alert("Order submitted successfully!");
  };

  function validateInp(name, value) {
    if (name === "fullName") {
      if (!value) {
        setErrors((prev) => ({ ...prev, [name]: "*FullName is Required" }));
      } else if (value.length < 3) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*FullName must be 3 Characters long",
        }));
      } else if (!/^[A-Za-z ]+$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*FullName can contain only letters and spaces",
        }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } else if (name === "email") {
      const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!value) {
        setErrors((prev) => ({ ...prev, [name]: "*Email is Required" }));
      } else if (!re.test(value)) {
        setErrors((prev) => ({ ...prev, [name]: "*Invalid Email" }));
      } else if (/\s/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*Email must not contain spaces",
        }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } else if (name === "phoneNumber") {
      const re = /^03\d{9}$/;
      if (!value) {
        setErrors((prev) => ({ ...prev, [name]: "*PhoneNumber is Required" }));
      } else if (!re.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*Invalid PhoneNumber Format (e.g., 03XXXXXXXXX)",
        }));
      } else if (value.length !== 11) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*Phone number must be exactly 11 digits",
        }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } else if (name === "address") {
      if (!value) {
        setErrors((prev) => ({ ...prev, [name]: "*Address is Required" }));
      } else if (value.length < 10) {
        setErrors((prev) => ({ ...prev, [name]: "*Incomplete Address" }));
      } else if (!/\d/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*Address should include house/street number",
        }));
      } else if (/[@#*]/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*Address contains invalid characters",
        }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } else if (name === "postalCode") {
      if (!value) {
        setErrors((prev) => ({ ...prev, [name]: "*Postal Code is Required" }));
      } else if (!/^\d+$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*Postal Code must be numeric only",
        }));
      } else if (value.length !== 5) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*Postal Code must be exactly 5 digits",
        }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  }

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h1 className="checkout-title">Checkout</h1>
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && <p>{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p>{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Full Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <p>{errors.address}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
              {errors.postalCode && <p>{errors.postalCode}</p>}
            </div>
          </div>

          <div className="form-group">
            <p
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "15px",
              }}
            >
              Payment Method
            </p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit_card"
                  checked={formData.paymentMethod === "credit_card"}
                  onChange={handleChange}
                />
                Credit/Debit Card
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === "paypal"}
                  onChange={handleChange}
                />
                PayPal
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
}
