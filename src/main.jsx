import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import AuthProvider from "./AuthContext/AuthProvider";
import AdminRoute from "./Router/AdminRoute.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import "./index.css";

// Layouts
import MainLayout from "./Layouts/MainLayout.jsx";
import DashboardLayout from "./Layouts/DashboardLayout.jsx";

// Pages (Public)
import Home from "./Pages/Home.jsx";
import PublicLessons from "./Pages/PublicLessons.jsx";
import LessonDetails from "./Pages/LessonDetails.jsx";
import Pricing from "./Pages/Pricing.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Notfound from "./Pages/Notfound.jsx";

// Pages (Dashboard - User)
import AddLesson from "./Pages/dashboard/AddLesson.jsx";
import MyLessons from "./Pages/dashboard/MyLessons.jsx";
import Profile from "./Pages/dashboard/Profile.jsx";

// Pages (Dashboard - Admin)
import AdminHome from "./Pages/dashboard/admin/AdminHome.jsx";
import ManageUsers from "./Pages/dashboard/admin/ManageUsers.jsx";
import ManageLessons from "./Pages/dashboard/admin/ManageLessons.jsx";
import ReportedLessons from "./Pages/dashboard/admin/ReportedLessons.jsx";
import LessonRequests from "./Pages/dashboard/LessonRequests.jsx";
import AdminProfile from "./Pages/dashboard/admin/AdminProfile.jsx";

// Components
import Loading from "./Components/Loading.jsx";
import { Toaster } from "react-hot-toast";
import PaymentSuccess from "./Pages/PaymentSuccess.jsx";
import PaymentCancel from "./Pages/PaymentCancel.jsx";
import MyFavorites from "./Pages/dashboard/MyFavorites.jsx";
import TopContributors from "./Pages/TopContributors.jsx";
import UserLessons from "./Pages/UserLessons.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Help from "./Pages/Help.jsx";
import Terms from "./Pages/Terms.jsx";
import Refund from "./Pages/Refund.jsx";
import Privacy from "./Pages/Privacy.jsx";

const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Notfound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/public-lessons", element: <PublicLessons /> },
      {
        path: "/lessons/:id",
        element: <LessonDetails />,
        loader: ({ params }) =>
          fetch(
            `https://digital-life-lessons-server-omega.vercel.app/lessons/${params.id}`
          ),
      },
      { path: "/pricing", element: <Pricing /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/payment/success", element: <PaymentSuccess /> },
      { path: "/payment/cancel", element: <PaymentCancel /> },
      { path: "/top-contributors", element: <TopContributors /> },
      { path: "/user-lessons/:email", element: <UserLessons /> },
      {
  path: "/about",
  element: <About />,
},
{
  path: "/contact",
  element: <Contact />,
},
{
  path: "/help",
  element: <Help />,
},
{
  path: "/terms",
  element: <Terms />,
},
{
  path: "/privacy",
  element: <Privacy />,
},
{
  path: "/refund",
  element: <Refund />,
},
    ],
  },

  // DASHBOARD ROUTES (USER)
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Profile /> },
      { path: "add-lesson", element: <AddLesson /> },
      { path: "my-lessons", element: <MyLessons /> },
      { path: "my-favorites", element: <MyFavorites /> },
      { path: "profile", element: <Profile /> },

      // ADMIN ROUTES
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-lessons",
        element: (
          <AdminRoute>
            <ManageLessons />
          </AdminRoute>
        ),
      },
      {
        path: "admin/reported-lessons",
        element: (
          <AdminRoute>
            <ReportedLessons />
          </AdminRoute>
        ),
      },
      {
        path: "admin/profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "admin/lesson-requests",
        element: (
          <AdminRoute>
            <LessonRequests />
          </AdminRoute>
        ),
      },
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
