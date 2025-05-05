import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBox,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clean up
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userFullName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLogIn");
    // Reset context state if using context or global state management
    setisLogIn(false); 
    setUserEmail("");
    setUserFullName("");
    setIsAdmin(false);
    alert("You have been logged out.");
    navigate("/"); // Navigate to home/login
  };

  const menuItems = [
    { path: "/dashboard", icon: <FaHome />, text: "Dashboard" },
    { path: "/dashboard/profile", icon: <FaUser />, text: "Profile" },
    { path: "/dashboard/customers", icon: <FaUsers />, text: "Customers" },
    { path: "/dashboard/products", icon: <FaBox />, text: "Products" },
  ];    

  return (
    <div
      className={`h-screen bg-[#2a4365] text-white transition-all duration-300 shadow-2xl flex flex-col justify-between ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Admin Info */}
        <div className="flex items-center justify-center gap-4 p-3">
          <img
            src="/assets/adminPic.jpg"
            alt="Admin"
            className="w-10 h-10 rounded-full"
          />
          {isOpen && (
            <div className="text-center">
              <h3 className="text-lg font-bold text-white">PharmaCart</h3>
              <h3 className="text-md font-semibold truncate">Admin</h3>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-8 px-3 mt-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex flex-col items-center text-center gap-1 p-3 rounded-lg cursor-pointer transition-all hover:bg-blue-700 text-sm font-semibold"
            >
              <div className="text-xl">{item.icon}</div>
              {isOpen && <span>{item.text}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="mb-6 px-3">
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center w-full p-3 rounded-lg bg-blue-800 hover:bg-blue-700 transition-all text-sm font-semibold"
        >
          <FaSignOutAlt className="text-xl mb-1" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
export default Sidebar;
