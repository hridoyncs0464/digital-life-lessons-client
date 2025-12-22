import { Navigate, useLocation } from "react-router";
import useRole from "../hooks/useRole";
import useAuth from "../AuthContext/useAuth";
import Loading from "../Components/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useRole();
  const location = useLocation();

  if (authLoading || roleLoading) {
    return (
          <section className="min-h-[60vh] flex items-center justify-center">
            {/* <span className="loading loading-spinner loading-lg" /> */}
            <Loading></Loading>
          </section>
        );
  }

  // not logged in
  if (!user?.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // not admin
  if (role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
