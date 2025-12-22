// src/Pages/dashboard/Profile.jsx
import React, { useContext, useEffect, useState } from "react";
import useTitle from "../../Components/usetTitle";
import { AuthContext } from "../../AuthContext/AuthContext";
import useRole from "../../hooks/useRole";
import Loading from "../../Components/Loading";

const Profile = () => {
  useTitle("My Profile | Dashboard");
  const { user } = useContext(AuthContext);
  const { role, premium, roleLoading } = useRole();
  const [stats, setStats] = useState({
    lessons: 0,
    favorites: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.email || !user?.uid) {
        setStats({ lessons: 0, favorites: 0, loading: false });
        return;
      }

      try {
        const [lessonsRes, favRes] = await Promise.all([
          fetch(
            `https://digital-life-lessons-server-omega.vercel.app/stats/my-lessons-count?email=${encodeURIComponent(
              user.email
            )}`
          ),
          fetch(
            `https://digital-life-lessons-server-omega.vercel.app/stats/my-favorites-count?userId=${encodeURIComponent(
              user.uid
            )}`
          ),
        ]);

        const lessonsData = await lessonsRes.json();
        const favData = await favRes.json();

        setStats({
          lessons: lessonsData.count || 0,
          favorites: favData.count || 0,
          loading: false,
        });
      } catch (err) {
        setStats({ lessons: 0, favorites: 0, loading: false });
      }
    };

    fetchStats();
  }, [user]);

  if (!user || roleLoading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        {/* <span className="loading loading-spinner loading-lg" /> */}
        <Loading></Loading>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto">
      {/* Header card */}
      <div className="bg-base-200 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow">
        <div className="avatar">
          <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
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
              <span className="badge badge-success gap-1">⭐ Premium</span>
            ) : (
              <span className="badge badge-warning gap-1">Free Plan</span>
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
          <li>
            • Display name and photo can be updated from your auth provider.
          </li>
          <li>• Premium badge is controlled by your plan in the system.</li>
        </ul>
      </div>
    </section>
  );
};

export default Profile;
