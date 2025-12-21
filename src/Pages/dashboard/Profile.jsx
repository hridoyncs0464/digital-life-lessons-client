// src/Pages/dashboard/Profile.jsx
import React, { useContext, useEffect, useState } from "react";
import useTitle from "../../Components/usetTitle";
import { AuthContext } from "../../AuthContext/AuthContext";
import useRole from "../../hooks/useRole";
// import { AuthContext } from "../../AuthContext/AuthContext";
// import useRole from "../../hooks/useRole";
// import useTitle from "../../Components/usetTitle";

const Profile = () => {
  useTitle("My Profile | Dashboard");
  const { user } = useContext(AuthContext);
  const { role, premium, roleLoading } = useRole();
  const [stats, setStats] = useState({ lessons: 0, favorites: 0, loading: true });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.email) return;

      try {
        // Optional: adjust when you create real stats endpoints
        const [lessonsRes, favRes] = await Promise.all([
          fetch(`http://localhost:3100/public-lessons?authorEmail=${user.email}`),
          fetch(`http://localhost:3100/public-lessons?favoriteOf=${user.email}`)
        ]);

        const lessonsData = await lessonsRes.json();
        const favData = await favRes.json();

        setStats({
          lessons: Array.isArray(lessonsData) ? lessonsData.length : 0,
          favorites: Array.isArray(favData) ? favData.length : 0,
          loading: false,
        });
      } catch {
        setStats({ lessons: 0, favorites: 0, loading: false });
      }
    };

    fetchStats();
  }, [user]);

  if (!user || roleLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto">
      {/* Header card */}
      <div className="bg-base-200 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow">
        <div className="avatar">
          <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={
                user.photoURL ||
                "https://i.ibb.co/4pDNDk1/avatar.png"
              }
              alt="User avatar"
            />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            {user.displayName || "User"}
          </h1>
          <p className="text-gray-600 mb-2">{user.email}</p>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="badge badge-outline">
              Role: {role === "admin" ? "Admin" : "User"}
            </span>
            {premium ? (
              <span className="badge badge-success gap-1">
                ⭐ Premium
              </span>
            ) : (
              <span className="badge badge-warning gap-1">
                Free Plan
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Lessons Created</h2>
            <p className="text-3xl font-bold">
              {stats.loading ? "…" : stats.lessons}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Lessons Saved</h2>
            <p className="text-3xl font-bold">
              {stats.loading ? "…" : stats.favorites}
            </p>
          </div>
        </div>
      </div>

      {/* Info text */}
      <div className="mt-6 bg-base-100 p-5 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Account Info</h3>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• Email cannot be changed (Firebase security).</li>
          <li>• Display name and photo can be updated from your auth provider.</li>
          <li>• Premium badge is controlled by your plan in the system.</li>
        </ul>
      </div>
    </section>
  );
};

export default Profile;
