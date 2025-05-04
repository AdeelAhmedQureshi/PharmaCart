import React from "react";
import { FaPlusCircle, FaTrashAlt, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; 

const Dashboard = () => {
  const navigate = useNavigate();
  
  const cardData = [
    {
      id: 1,
      title: "Add Product",
      description: "Add new products to your inventory",
      icon: <FaPlusCircle className="card-icon" size={70} />,
      bgClass: "card-green",
      onClick: () => navigate("/addproduct"),
    },
    {
      id: 2,
      title: "Delete Product",
      description: "Remove products from your inventory",
      icon: <FaTrashAlt className="card-icon" size={70} />,
      bgClass: "card-red",
      onClick: () => navigate("/deleteproduct"),
    },
    {
      id: 3,
      title: "Update Product",
      description: "Modify existing product details",
      icon: <FaEdit className="card-icon" size={70} />,
      bgClass: "card-blue",
      onClick: () => navigate("/updateproduct"),
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-inner">
        <h1 className="dashboard-title">
          Inventory Management Dashboard
        </h1>
        
        <div className="card-grid">
          {cardData.map((card) => (
            <div
              key={card.id}
              onClick={card.onClick}
              className={`dashboard-card ${card.bgClass}`}
            >
              <div className="card-icon-wrapper">{card.icon}</div>
              <h2 className="card-title">{card.title}</h2>
              <p className="card-description">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
