
import { createBrowserRouter, RouterProvider } from "react-router";
// import MainLayout from "../layouts/MainLayout";
// import DashboardLayout from "../layouts/DashboardLayout";
// import PrivateRoute from "./PrivateRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import AuthProvider from "./AuthContext/AuthProvider";
import "./index.css";

// Pages
import Home from "./Pages/Home.jsx";
import Notfound from "./Pages/Notfound.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";

// import Home from "../pages/Home";
// import PublicLessons from "../Pages/PublicLessons";
// import LessonDetails from "../pages/LessonDetails";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import Pricing from "../pages/Pricing";
// import ErrorPage from "../pages/ErrorPage";

// Dashboard Pages
// import AddLesson from "../pages/dashboard/AddLesson";
// import MyLessons from "../pages/dashboard/MyLessons";
// import Profile from "../pages/dashboard/Profile";
import PublicLessons from "./Pages/PublicLessons";
import LessonDetails from "./Pages/LessonDetails";
import Pricing from "./Pages/Pricing.jsx";
import AddLesson from "./Pages/dashboard/AddLesson.jsx";
import MyLessons from "./Pages/dashboard/MyLessons.jsx";
import Profile from "./Pages/dashboard/Profile.jsx";
import MainLayout from "./Layouts/MainLayout.jsx";
import DashboardLayout from "./Layouts/DashboardLayout.jsx";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Loading from "./Components/Loding.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Notfound></Notfound>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/public-lessons", element: <PublicLessons></PublicLessons> },
      { path: "/lessons/:id", element: <LessonDetails /> },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register /> },
      { path: "/pricing", element: <Pricing/> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
      <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { path: "add-lesson", element: <AddLesson /> },
      { path: "my-lessons", element: <MyLessons /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]); 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider
        router={router}
        fallbackElement={<Loading message="Preparing application..." />}
      />
    </AuthProvider>
  </StrictMode>
  );
// export default router;








// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { createBrowserRouter } from "react-router";
// import { RouterProvider } from "react-router/dom";
// import Bills from "./Pages/PublicLessons.jsx";
// import Home from "./Pages/Home.jsx";
// import RootLayout from "./Layouts/RootLayout.jsx";
// import Login from "./Pages/Login.jsx";
// import Register from "./Pages/Register.jsx";
// import MyPayBills from "./Pages/MyPayBills.jsx";
// import BillDetails from "./Pages/LessonDetails.jsx";
// import Loading from "./Components/Loding.jsx";
// import AllBills from "./Pages/AllBills.jsx";
// import Notfound from "./Pages/Notfound.jsx";
// import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "bills",
//         element: <PublicLessons></PublicLessons>,
//       },
//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "register",
//         element: <Register />,
//       },

//       {
//         path: "my-pay-bills",
//         element: (
//           <PrivateRoute>
//             <MyPayBills />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "bills/:id",
//         loader: ({ params }) =>
//           fetch(
//             `https://utility-bill-sys-server.vercel.app/bills/${params.id}`
//           ),
//         element: (
//           <PrivateRoute>
//             <BillDetails />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "all-bills",
//         loader: () =>
//           fetch("https://utility-bill-sys-server.vercel.app/all-bills"),
//         element: <AllBills />,
//       },
//       {
//         path: "*",
//         element: <Notfound></Notfound>,
//       },
//     ],
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <AuthProvider>
//       <RouterProvider
//         router={router}
//         fallbackElement={<Loading message="Preparing application..." />}
//       />
//     </AuthProvider>
//   </StrictMode>
// );
