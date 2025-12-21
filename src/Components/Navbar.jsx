import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";
import useRole from "../hooks/useRole";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const { premium } = useRole(); // premium from MongoDB
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser().then(() => navigate("/login"));
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-primary font-semibold" : "";

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Left: Logo */}
      <div className="navbar-start">
        <NavLink to="/" className="text-2xl font-bold">
          Digital<span className="text-primary">Life</span>Lessons
        </NavLink>
      </div>

      {/* Center Menu (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/public-lessons" className={navLinkClass}>
              Public Lessons
            </NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink
                  to="/dashboard/add-lesson"
                  className={navLinkClass}
                >
                  Add Lesson
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/my-lessons"
                  className={navLinkClass}
                >
                  My Lessons
                </NavLink>
              </li>

              {/* Show Upgrade menu link only when NOT Premium */}
              {!premium && (
                <li>
                  <NavLink to="/pricing" className={navLinkClass}>
                    Upgrade
                  </NavLink>
                </li>
              )}
            </>
          )}
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end gap-2">
        {/* If NOT logged in → Login & Signup buttons */}
        {!user ? (
          <>
            <NavLink to="/login" className="btn btn-sm">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-sm btn-primary">
              Signup
            </NavLink>
          </>
        ) : (
          // If logged in → Avatar dropdown (your requested snippet)
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="User"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <li className="font-semibold text-sm">
                <span>{user.displayName || "User"}</span>
              </li>
              <li>
                <NavLink to="/dashboard/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              {!premium && (
                <li>
                  <NavLink to="/pricing">Upgrade to Premium</NavLink>
                </li>
              )}
              {premium && (
                <li>
                  <span className="badge badge-success badge-lg">
                    Premium ⭐
                  </span>
                </li>
              )}
              <li>
                <button onClick={handleLogout} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
