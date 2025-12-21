import { Outlet, NavLink } from "react-router";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { role, loading } = useRole();

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-5">
      
      <aside className="bg-base-200 p-5 md:col-span-1">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>

        <ul className="menu gap-1">

          {/* USER LINKS */}
          {role === "user" && (
            <>
              {/* <li><NavLink to="/dashboard">Dashboard Home</NavLink></li> */}
              <li><NavLink to="/dashboard/add-lesson">Add Lesson</NavLink></li>
              <li><NavLink to="/dashboard/my-lessons">My Lessons</NavLink></li>
              <li><NavLink to="/dashboard/profile">Profile</NavLink></li>
            </>
          )}

          {/* ADMIN LINKS */}
          {role === "admin" && (
            <>
              <li><NavLink to="/dashboard/admin">Admin Dashboard</NavLink></li>
              <li><NavLink to="/dashboard/admin/lesson-requests">Lesson Requests</NavLink></li>
            </>
          )}

          <li><NavLink to="/">Back to Home</NavLink></li>
        </ul>
      </aside>

      <main className="p-6 md:col-span-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
