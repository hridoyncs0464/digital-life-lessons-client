import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { role, loading } = useRole();

  if (loading) return <p>Checking admin access...</p>;

  if (role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
