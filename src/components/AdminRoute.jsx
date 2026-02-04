import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

const AdminRoute = ({ children }) => {
  const { isAdmin } = useAdmin();
  return isAdmin ? children : <Navigate to="/admin-login" />;
};

export default AdminRoute;
