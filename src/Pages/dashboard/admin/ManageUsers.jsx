import React, { useEffect, useState } from "react";
import useAuth from "../../../AuthContext/useAuth";

const ManageUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch(`http://localhost:3100/admin/users?email=${user.email}`);
    const data = await res.json();
    setUsers(data);
  };

  const handleRoleChange = async (id, role) => {
    await fetch(`http://localhost:3100/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await fetch(`http://localhost:3100/admin/users/${id}`, { method: "DELETE" });
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Premium</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="select select-bordered select-sm"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>{u.premium ? "Yes ⭐" : "No"}</td>
                <td>
                  <button onClick={() => handleDelete(u._id)} className="btn btn-ghost btn-xs">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
