import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const PRIMARY_COLOR = "#35AC86";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [role, setRole] = useState("");

  // Fetch Users
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", searchText, role],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: { searchText, role },
      });
      return res.data;
    },
  });

  // PATCH - Update Role
  const updateRole = async (id, newRole) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Set role to: ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: PRIMARY_COLOR,
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, change!",
    });

    if (!confirm.isConfirmed) return;

    await axiosSecure.patch(`/users/${id}`, { role: newRole });
    Swal.fire("Updated!", "User role changed.", "success");

    refetch();
  };

  // DELETE - Remove User
  const deleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: PRIMARY_COLOR,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    await axiosSecure.delete(`/users/${id}`);
    Swal.fire("Deleted!", "User removed successfully.", "success");

    refetch();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Manage <span style={{ color: PRIMARY_COLOR }}>Users</span>
      </h2>

      {/* Search */}
      <input
        type="text"
        className="border p-3 rounded-lg w-full mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 transition"
        placeholder="Search by name or email..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Role Filter */}
      <select
        className="border p-3 rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 transition"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="moderator">Moderator</option>
        <option value="student">Student</option>
      </select>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-700">
                #
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">
                Role
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-400 text-lg"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u, index) => (
                <tr key={u._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium">{u.name}</td>
                  <td className="px-6 py-4">{u.email}</td>

                  {/* Role Badge */}
                  <td className="px-6 py-4">
                    <span
                      className="px-3 py-1 rounded text-sm font-medium"
                      style={{
                        background:
                          u.role === "admin"
                            ? "#fde047"
                            : u.role === "moderator"
                            ? "#bfdbfe"
                            : "#bbf7d0",
                      }}
                    >
                      {u.role}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 flex gap-2 flex-wrap">
                    {/* Promote / Demote */}
                    {u.role === "student" && (
                      <>
                        <button
                          className="px-3 py-1 rounded text-sm shadow transition hover:scale-105"
                          style={{ background: "#bfdbfe" }}
                          onClick={() => updateRole(u._id, "moderator")}
                        >
                          → Moderator
                        </button>

                        <button
                          className="px-3 py-1 rounded text-sm shadow transition hover:scale-105"
                          style={{ background: "#fde047" }}
                          onClick={() => updateRole(u._id, "admin")}
                        >
                          → Admin
                        </button>
                      </>
                    )}

                    {u.role === "moderator" && (
                      <button
                        className="px-3 py-1 rounded text-sm shadow transition hover:scale-105"
                        style={{ background: "#fecaca" }}
                        onClick={() => updateRole(u._id, "student")}
                      >
                        Demote
                      </button>
                    )}

                    {u.role === "admin" && (
                      <button
                        className="px-3 py-1 rounded text-sm shadow transition hover:scale-105"
                        style={{ background: "#fecaca" }}
                        onClick={() => updateRole(u._id, "student")}
                      >
                        Demote
                      </button>
                    )}

                    {/* Delete Button */}
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm shadow hover:bg-red-600 transition hover:scale-105"
                      onClick={() => deleteUser(u._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
