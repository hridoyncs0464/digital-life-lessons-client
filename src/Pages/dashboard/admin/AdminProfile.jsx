import { useEffect, useState } from "react";
import useAuth from "../../../AuthContext/useAuth";
import useRole from "../../../hooks/useRole";

const AdminProfile = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLessons: 0,
    reportedLessons: 0,
    approvedLessonsToday: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    // minimal admin stats using existing endpoints
    Promise.all([
      fetch(`http://localhost:3100/admin/users?email=${user.email}`).then(res => res.json()),
      fetch(`http://localhost:3100/admin/lessons?email=${user.email}`).then(res => res.json()),
      fetch(`http://localhost:3100/reported-lessons?email=${user.email}`).then(res => res.json()),
    ])
      .then(([users, lessons, reported]) => {
        const today = new Date().toDateString();
        const approvedLessonsToday = lessons.filter(
          l =>
            l.status === "approved" &&
            l.createdAt &&
            new Date(l.createdAt).toDateString() === today
        ).length;

        setStats({
          totalUsers: users.length,
          totalLessons: lessons.length,
          reportedLessons: reported.length,
          approvedLessonsToday,
        });
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </section>
    );
  }

  const adminEmail = user?.email || "admin1234@gmail.com";
  const displayName = user?.displayName || "Admin";
  const photoUrl =
    user?.photoURL ||
    "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=300&q=60";

  return (
    <section className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row gap-6 items-center">
        <div className="avatar">
          <div className="w-28 h-28 rounded-full ring ring-white ring-offset-2 ring-offset-purple-500 overflow-hidden">
            <img src={photoUrl} alt={displayName} className="object-cover w-full h-full" />
          </div>
        </div>

        <div className="flex-1">
          <p className="uppercase tracking-widest text-xs md:text-sm mb-2 opacity-80">
            Admin Profile
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{displayName}</h1>
          <p className="text-sm md:text-base text-indigo-100 mb-1">{adminEmail}</p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="badge badge-warning badge-lg text-xs font-semibold">
              Admin ⭐
            </span>
            <span className="badge badge-outline badge-lg text-xs border-white/60 text-white/80">
              Role: {role || "admin"}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="stat bg-base-100 rounded-2xl shadow">
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{stats.totalUsers}</div>
          <div className="stat-desc">All registered lesson users</div>
        </div>

        <div className="stat bg-base-100 rounded-2xl shadow">
          <div className="stat-title">Total Lessons</div>
          <div className="stat-value text-secondary">{stats.totalLessons}</div>
          <div className="stat-desc">Across the entire platform</div>
        </div>

        <div className="stat bg-base-100 rounded-2xl shadow">
          <div className="stat-title">Reported Lessons</div>
          <div className="stat-value text-error">{stats.reportedLessons}</div>
          <div className="stat-desc">Pending moderation</div>
        </div>

        <div className="stat bg-base-100 rounded-2xl shadow">
          <div className="stat-title">Lessons Approved Today</div>
          <div className="stat-value text-success">{stats.approvedLessonsToday}</div>
          <div className="stat-desc">Activity snapshot for today</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-base-100 rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Quick Admin Actions</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/dashboard/admin/manage-users" className="btn btn-sm btn-primary">
            Manage Users
          </a>
          <a href="/dashboard/admin/manage-lessons" className="btn btn-sm btn-secondary">
            Manage Lessons
          </a>
          <a href="/dashboard/admin/reported-lessons" className="btn btn-sm btn-error">
            Review Reports
          </a>
          <a href="/dashboard/admin/lesson-requests" className="btn btn-sm btn-accent">
            Lesson Requests
          </a>
        </div>
      </div>
    </section>
  );
};

export default AdminProfile;
