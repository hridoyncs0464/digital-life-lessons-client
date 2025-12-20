import React, { useEffect, useState } from "react";
import useAuth from "../../../AuthContext/useAuth";

const AdminHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLessons: 0,
    pendingLessons: 0,
    reportedLessons: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchStats = async () => {
      try {
        // Fetch all data in parallel
        const [usersRes, lessonsRes, pendingRes, reportedRes] = await Promise.all([
          fetch(`http://localhost:3100/admin/users?email=${user.email}`),
          fetch(`http://localhost:3100/admin/lessons?email=${user.email}`),
          fetch(`http://localhost:3100/admin/lesson-requests?email=${user.email}`),
          fetch(`http://localhost:3100/reported-lessons?email=${user.email}`),
        ]);

        const users = await usersRes.json();
        const lessons = await lessonsRes.json();
        const pending = await pendingRes.json();
        const reported = await reportedRes.json();

        setStats({
          totalUsers: users.length,
          totalLessons: lessons.length,
          pendingLessons: pending.length,
          reportedLessons: reported.length,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      }
    };

    fetchStats();
  }, [user.email]);

  if (loading) return <p className="p-6">Loading admin stats...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-medium">Total Users</h2>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-medium">Total Lessons</h2>
          <p className="text-2xl font-bold">{stats.totalLessons}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-medium">Pending Lessons</h2>
          <p className="text-2xl font-bold">{stats.pendingLessons}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-lg font-medium">Reported Lessons</h2>
          <p className="text-2xl font-bold">{stats.reportedLessons}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <a href="/dashboard/admin/manage-users" className="btn btn-primary">
            Manage Users
          </a>
          <a href="/dashboard/admin/manage-lessons" className="btn btn-secondary">
            Manage Lessons
          </a>
          <a href="/dashboard/admin/reported-lessons" className="btn btn-warning">
            Reported Lessons
          </a>
          <a href="/dashboard/admin/profile" className="btn btn-info">
            Admin Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
