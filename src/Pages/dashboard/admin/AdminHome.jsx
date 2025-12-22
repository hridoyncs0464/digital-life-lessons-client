import React, { useEffect, useMemo, useState } from "react";
import useAuth from "../../../AuthContext/useAuth";
import Loading from "../../../Components/Loading";

const AdminHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPublicLessons: 0,
    totalReportedLessons: 0,
    todaysNewLessons: 0,
  });
  const [topContributors, setTopContributors] = useState([]);
  const [lessonGrowth, setLessonGrowth] = useState([]); // last 7 days
  const [userGrowth, setUserGrowth] = useState([]); // last 7 days
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const load = async () => {
      try {
        const [usersRes, lessonsRes, reportedRes, contributorsRes] =
          await Promise.all([
            fetch(
              `https://digital-life-lessons-server-omega.vercel.app/admin/users?email=${user.email}`
            ),
            fetch(
              `https://digital-life-lessons-server-omega.vercel.app/admin/lessons?email=${user.email}`
            ),
            fetch(
              `https://digital-life-lessons-server-omega.vercel.app/reported-lessons?email=${user.email}`
            ),
            fetch(
              "https://digital-life-lessons-server-omega.vercel.app/top-contributors"
            ),
          ]);

        const users = await usersRes.json();
        const lessons = await lessonsRes.json();
        const reported = await reportedRes.json();
        const contributors = await contributorsRes.json();

        const totalUsers = users.length;
        const totalPublicLessons = lessons.filter(
          (l) => l.status === "approved"
        ).length;
        const totalReportedLessons = reported.length;

        const todayStr = new Date().toDateString();
        const todaysNewLessons = lessons.filter(
          (l) =>
            l.createdAt && new Date(l.createdAt).toDateString() === todayStr
        ).length;

        // Build simple 7-day growth arrays for lessons & users
        const build7DayGrowth = (items, dateField) => {
          const days = [];
          const now = new Date();
          for (let i = 6; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(now.getDate() - i);
            const label = d.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            });
            const count = items.filter((item) => {
              const ts = item[dateField];
              if (!ts) return false;
              const t = new Date(ts);
              return t.toDateString() === d.toDateString();
            }).length;
            days.push({ label, count });
          }
          return days;
        };

        const lessonGrowthData = build7DayGrowth(lessons, "createdAt");
        const userGrowthData = build7DayGrowth(users, "createdAt");

        setStats({
          totalUsers,
          totalPublicLessons,
          totalReportedLessons,
          todaysNewLessons,
        });
        setTopContributors(contributors || []);
        setLessonGrowth(lessonGrowthData);
        setUserGrowth(userGrowthData);
      } catch (err) {
        console.error("Admin dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.email]);

  const maxLessonCount = useMemo(
    () => lessonGrowth.reduce((max, d) => (d.count > max ? d.count : max), 1),
    [lessonGrowth]
  );

  const maxUserCount = useMemo(
    () => userGrowth.reduce((max, d) => (d.count > max ? d.count : max), 1),
    [userGrowth]
  );

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        {/* <span className="loading loading-spinner loading-lg" /> */}
        <Loading></Loading>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-1">
          <p className="uppercase tracking-widest text-xs md:text-sm mb-2 opacity-80">
            Admin Overview
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Platform Analytics
          </h1>
          <p className="text-sm md:text-base text-indigo-100">
            Monitor users, lessons, and community activity in one place.
          </p>
        </div>

        <div className="bg-white/10 rounded-2xl px-4 py-3 text-sm">
          <p className="opacity-80">Signed in as</p>
          <p className="font-semibold">{user?.email}</p>
          <p className="mt-1 text-xs bg-black/20 inline-block px-2 py-1 rounded-full">
            Admin · Control Center
          </p>
        </div>
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat bg-base-100 rounded-2xl shadow">
          <div className="stat-title">Total users</div>
          <div className="stat-value text-primary">{stats.totalUsers}</div>
          <div className="stat-desc">All registered lesson users</div>
        </div>

        <div className="stat bg-base-100 rounded-2xl shadow">
          <div className="stat-title">Public lessons</div>
          <div className="stat-value text-secondary">
            {stats.totalPublicLessons}
          </div>
          <div className="stat-desc">Approved & visible content</div>
        </div>

        <div className="stat bg-base-100 rounded-2xl shadow">
          <div className="stat-title">Reported lessons</div>
          <div className="stat-value text-error">
            {stats.totalReportedLessons}
          </div>
          <div className="stat-desc">Need moderation</div>
        </div>

        <div className="stat bg-base-100 rounded-2xl shadow">
          <div className="stat-title">New lessons today</div>
          <div className="stat-value text-success">
            {stats.todaysNewLessons}
          </div>
          <div className="stat-desc">Fresh community activity</div>
        </div>
      </div>

      {/* Growth mini-charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-base-100 rounded-2xl shadow p-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Lesson growth (7 days)</h2>
            <span className="text-xs text-gray-500">
              Lessons created per day
            </span>
          </div>
          <div className="flex items-end gap-2 h-32">
            {lessonGrowth.map((d) => (
              <div
                key={d.label}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 to-purple-400"
                  style={{
                    height:
                      d.count === 0
                        ? "4px"
                        : `${(d.count / maxLessonCount) * 100}%`,
                  }}
                />
                <span className="text-[10px] text-gray-500">{d.label}</span>
                <span className="text-[10px] font-semibold">{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-base-100 rounded-2xl shadow p-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">User growth (7 days)</h2>
            <span className="text-xs text-gray-500">New users per day</span>
          </div>
          <div className="flex items-end gap-2 h-32">
            {userGrowth.map((d) => (
              <div
                key={d.label}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-emerald-500 to-teal-400"
                  style={{
                    height:
                      d.count === 0
                        ? "4px"
                        : `${(d.count / maxUserCount) * 100}%`,
                  }}
                />
                <span className="text-[10px] text-gray-500">{d.label}</span>
                <span className="text-[10px] font-semibold">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top contributors + quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-base-100 rounded-2xl shadow p-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">
              Most active contributors (7 days)
            </h2>
            <span className="text-xs text-gray-500">
              Top lesson creators this week
            </span>
          </div>

          {topContributors.length === 0 ? (
            <p className="text-sm text-gray-500">
              No contributors in the last 7 days yet.
            </p>
          ) : (
            <div className="space-y-3">
              {topContributors.map((c) => (
                <div
                  key={c.email}
                  className="flex items-center justify-between bg-base-200/60 rounded-xl px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden">
                        {c.photo ? (
                          <img
                            src={c.photo}
                            alt={c.name}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <span className="text-xs flex items-center justify-center h-full w-full text-gray-500">
                            {c.name?.charAt(0) || "U"}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {c.name || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-500">{c.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {c.lessonCount} lessons
                    </p>
                    {c.premium && (
                      <p className="text-[11px] text-primary">
                        Premium creator
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-base-100 rounded-2xl shadow p-5">
          <h2 className="text-lg font-semibold mb-3">Quick actions</h2>
          <div className="flex flex-col gap-2">
            <a
              href="/dashboard/admin/manage-users"
              className="btn btn-sm btn-primary w-full"
            >
              Manage users
            </a>
            <a
              href="/dashboard/admin/manage-lessons"
              className="btn btn-sm btn-secondary w-full"
            >
              Review lessons
            </a>
            <a
              href="/dashboard/admin/reported-lessons"
              className="btn btn-sm btn-error w-full"
            >
              Flagged content
            </a>
            <a
              href="/dashboard/admin/lesson-requests"
              className="btn btn-sm btn-accent w-full"
            >
              Lesson requests
            </a>
            <a
              href="/dashboard/admin/profile"
              className="btn btn-sm btn-outline w-full"
            >
              Admin profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminHome;

// import React, { useEffect, useState } from "react";
// import useAuth from "../../../AuthContext/useAuth";

// const AdminHome = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalLessons: 0,
//     pendingLessons: 0,
//     reportedLessons: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.email) return;

//     const fetchStats = async () => {
//       try {
//         // Fetch all data in parallel
//         const [usersRes, lessonsRes, pendingRes, reportedRes] = await Promise.all([
//           fetch(`https://digital-life-lessons-server-omega.vercel.app/admin/users?email=${user.email}`),
//           fetch(`https://digital-life-lessons-server-omega.vercel.app/admin/lessons?email=${user.email}`),
//           fetch(`https://digital-life-lessons-server-omega.vercel.app/admin/lesson-requests?email=${user.email}`),
//           fetch(`https://digital-life-lessons-server-omega.vercel.app/reported-lessons?email=${user.email}`),
//         ]);

//         const users = await usersRes.json();
//         const lessons = await lessonsRes.json();
//         const pending = await pendingRes.json();
//         const reported = await reportedRes.json();

//         setStats({
//           totalUsers: users.length,
//           totalLessons: lessons.length,
//           pendingLessons: pending.length,
//           reportedLessons: reported.length,
//         });
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching admin stats:", err);
//       }
//     };

//     fetchStats();
//   }, [user.email]);

//   if (loading) return <p className="p-6">Loading admin stats...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="p-4 bg-white shadow rounded-lg">
//           <h2 className="text-lg font-medium">Total Users</h2>
//           <p className="text-2xl font-bold">{stats.totalUsers}</p>
//         </div>
//         <div className="p-4 bg-white shadow rounded-lg">
//           <h2 className="text-lg font-medium">Total Lessons</h2>
//           <p className="text-2xl font-bold">{stats.totalLessons}</p>
//         </div>
//         <div className="p-4 bg-white shadow rounded-lg">
//           <h2 className="text-lg font-medium">Pending Lessons</h2>
//           <p className="text-2xl font-bold">{stats.pendingLessons}</p>
//         </div>
//         <div className="p-4 bg-white shadow rounded-lg">
//           <h2 className="text-lg font-medium">Reported Lessons</h2>
//           <p className="text-2xl font-bold">{stats.reportedLessons}</p>
//         </div>
//       </div>

//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
//         <div className="flex flex-wrap gap-4">
//           <a href="/dashboard/admin/manage-users" className="btn btn-primary">
//             Manage Users
//           </a>
//           <a href="/dashboard/admin/manage-lessons" className="btn btn-secondary">
//             Manage Lessons
//           </a>
//           <a href="/dashboard/admin/reported-lessons" className="btn btn-warning">
//             Reported Lessons
//           </a>
//           <a href="/dashboard/admin/profile" className="btn btn-info">
//             Admin Profile
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminHome;
