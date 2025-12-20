
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
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

              <li>
                <NavLink to="/pricing" className={navLinkClass}>
                  Upgrade
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end gap-2">
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
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 rounded-full">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="User Avatar"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-52"
            >
              <li className="font-semibold text-sm">
                {user?.displayName || "User"}
              </li>
              <li>
                <NavLink to="/dashboard/profile">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
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




























// import React, { use } from "react";
// import { NavLink, useNavigate } from "react-router";
// import { AuthContext } from "../AuthContext/AuthContext";
// import useTitle from "./usetTitle";



// const Navbar = () => {
//     useTitle("Navbar");
//   const { user, logOutUser } = use(AuthContext);
//   const navigate = useNavigate();

//   const beforeLoginLinks = (
//     <>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       <li>
//         <NavLink to="/all-bills">Bills</NavLink>
//       </li>
//     </>
//   );

//   const afterLoginLinks = (
//     <>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       <li>
//         <NavLink to="/all-bills">Bills</NavLink>
//       </li>
//       <li>
//         <NavLink to="/my-pay-bills">My Pay Bills</NavLink>
//       </li>
//     </>
//   );

//   const handleLogout = () => {
//     logOutUser().then(() => {
//       navigate("/login");
//     });
//   };

//   return (
//     <div className="navbar bg-base-100 shadow-sm">
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </div>
//           <ul
//             tabIndex="-1"
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//           >
//             {user ? afterLoginLinks : beforeLoginLinks}
//           </ul>
//         </div>
//         <NavLink to="/" className="btn font-bold text-2xl btn-ghost">
//           Pay<span className="text-primary">Bill</span>
//         </NavLink>
//       </div>

//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           {user ? afterLoginLinks : beforeLoginLinks}
//         </ul>
//       </div>

//       <div className="navbar-end gap-2">
//         {user ? (
//           <div className="flex items-center gap-2">
//             {/* Avatar: first letter of email only */}
//             <div className="avatar placeholder">
//               <div className="bg-primary text-primary-content rounded-full w-8 h-8 flex items-center justify-center">
//                 <span className="text-xs">{user?.email?.charAt(0).toUpperCase() || "U"}</span>
//               </div>
//             </div>                               

//             <button onClick={handleLogout} className="btn btn-sm btn-ghost">
//               Logout
//             </button>
//           </div>
//         ) : (
//           <div className="flex gap-2">
//             <NavLink to="/login" className="btn btn-sm">
//               Login
//             </NavLink>
//             <NavLink to="/register" className="btn btn-sm btn-primary">
//               Register
//             </NavLink>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;



















