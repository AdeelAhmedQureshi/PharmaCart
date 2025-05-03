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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl">
        {cardData.map((card, idx) => (
          <div
            key={idx}
            onClick={card.onClick}
            className={`cursor-pointer ${card.bg} ${card.text} w-full h-80 p-14 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 ease-in-out`}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="mb-6">{card.icon}</div>
              <h2 className="text-3xl font-bold mb-4">{card.title}</h2>
              <p className="text-center text-lg text-black">{card.description}</p>
            </div>
          </div>
        ))}
        </div>

      </div>

  );
};
export default Dashboard;
