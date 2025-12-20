

import { Outlet } from "react-router";
import { NavLink } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-5">
      
      {/* Sidebar */}
      <aside className="bg-base-200 p-5 md:col-span-1">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>

        <ul className="menu gap-1">
          <li>
            <NavLink to="/dashboard/add-lesson">
              Add Lesson
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-lessons">
              My Lessons
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              Back to Home
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Content */}
      <main className="p-6 md:col-span-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;



















// import { Outlet } from "react-router";
// import { NavLink } from "react-router";

// const DashboardLayout = () => {
//   return (
//     <div className="min-h-screen grid grid-cols-1 md:grid-cols-5">
      
//       {/* Sidebar */}
//       <aside className="bg-base-200 p-5 md:col-span-1">
//         <h2 className="text-xl font-bold mb-4">Dashboard</h2>

//         <ul className="menu gap-1">
//           <li>
//             <NavLink to="/dashboard/add-lesson">
//               Add Lesson
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/dashboard/my-lessons">
//               My Lessons
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/dashboard/profile">
//               Profile
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/">
//               Back to Home
//             </NavLink>
//           </li>
//         </ul>
//       </aside>

//       {/* Content */}
//       <main className="p-6 md:col-span-4">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;
