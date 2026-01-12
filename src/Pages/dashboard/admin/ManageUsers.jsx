import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../../AuthContext/useAuth";
import Loading from "../../../Components/Loading";

const ManageUsers = () => {
  const { user } = useAuth(); // logged-in admin
  const [users, setUsers] = useState([]);
  const [lessonCounts, setLessonCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const adminEmail = user?.email;

  const fetchUsers = () => {
    if (!adminEmail) return;

    setLoading(true);
    fetch(
      `https://digital-life-lessons-server-omega.vercel.app/admin/users?email=${adminEmail}`
    )
      .then((res) => res.json())
      .then(async (data) => {
        setUsers(data || []);

        // fetch total lessons count per user in parallel
        const counts = {};
        await Promise.all(
          (data || []).map(async (u) => {
            if (!u.email) return;
            try {
              const res = await fetch(
                `https://digital-life-lessons-server-omega.vercel.app/my-lessons?email=${encodeURIComponent(
                  u.email
                )}`
              );
              const lessons = await res.json();
              counts[u.email] = lessons.length;
            } catch {
              counts[u.email] = 0;
            }
          })
        );

        setLessonCounts(counts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load users");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminEmail]);

  const handleRoleChange = (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    if (
      currentRole !== newRole &&
      !window.confirm(`Change role to "${newRole}"?`)
    ) {
      return;
    }

    setUpdatingId(userId);
    fetch(
      `https://digital-life-lessons-server-omega.vercel.app/admin/users/${userId}?email=${encodeURIComponent(
        adminEmail
      )}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole, premium: newRole === "admin" }),
      }
    )
      .then((res) => res.json())
      .then(() => {
        toast.success("User role updated");
        fetchUsers();
      })
      .catch(() => toast.error("Failed to update role"))
      .finally(() => setUpdatingId(null));
  };

  const handleDeleteUser = (userId, email) => {
    if (
      !window.confirm(
        `Are you sure you want to delete this user?\n${email}\nThis cannot be undone.`
      )
    )
      return;

    setUpdatingId(userId);
    fetch(
      `https://digital-life-lessons-server-omega.vercel.app/admin/users/${userId}?email=${encodeURIComponent(
        adminEmail
      )}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then(() => {
        toast.success("User deleted");
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      })
      .catch(() => toast.error("Failed to delete user"))
      .finally(() => setUpdatingId(null));
  };

  if (!adminEmail) {
    return <p className="p-4">Admin email not found. Please log in again.</p>;
  }

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        {/* <spang" /> */}
        <Loading></Loading>
      </section>
    );
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <p className="text-sm text-gray-500">
            Total users: {users.length} · Admin: {adminEmail}
          </p>
        </div>
        <button
          onClick={fetchUsers}
          className="btn btn-sm btn-outline"
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Total Lessons</th>
                <th>Premium</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => {
                const id = u._id?.toString?.() || u._id;
                const isAdmin = u.role === "admin";
                const isCurrentAdmin = u.email === adminEmail;
                const totalLessons = lessonCounts[u.email] ?? 0;

                return (
                  <tr key={id}>
                    <td>{idx + 1}</td>
                    <td>
                      <div>
                        <div className="font-semibold">
                          {u.name || "Unknown User"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(u.createdAt).toLocaleDateString?.() || ""}
                        </div>
                      </div>
                    </td>
                    <td className="text-sm">{u.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          isAdmin ? "badge-warning" : "badge-outline"
                        }`}
                      >
                        {u.role || "user"}
                      </span>
                    </td>
                    <td>{totalLessons}</td>
                    <td>
                      {u.premium ? (
                        <span className="badge badge-primary badge-sm">
                          Premium ⭐
                        </span>
                      ) : (
                        <span className="badge badge-ghost badge-sm">Free</span>
                      )}
                    </td>
                    <td>
                      <div className="flex justify-end gap-2">
                        {!isCurrentAdmin && (
                          <button
                            onClick={() => handleRoleChange(id, u.role)}
                            className="btn btn-xs btn-secondary"
                            disabled={updatingId === id}
                          >
                            {u.role === "admin" ? "Make User" : "Make Admin"}
                          </button>
                        )}

                        {!isCurrentAdmin && (
                          <button
                            onClick={() => handleDeleteUser(id, u.email)}
                            className="btn btn-xs btn-error"
                            disabled={updatingId === id}
                          >
                            Delete
                          </button>
                        )}

                        {isCurrentAdmin && (
                          <span className="text-xs text-gray-400">(You)</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Total Lessons</th>
                <th>Premium</th>
                <th className="text-right">Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </section>
  );
};

export default ManageUsers;
