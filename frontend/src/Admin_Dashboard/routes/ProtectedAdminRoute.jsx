import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin")); // user has isAdmin field

  if (!token || !isAdmin) {
    return <Navigate to="/access-denied" replace />;
  }
  
  return children;
};

export default ProtectedAdminRoute;
