import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const PRIMARY_COLOR = "#35AC86";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [role, setRole] = useState("");

  const isDarkMode = () => document.documentElement.classList.contains("dark");

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users", searchText, role],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", { params: { searchText, role } });
      return res.data;
    },
  });

  const updateRole = async (id, newRole) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Set role to: ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: PRIMARY_COLOR,
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, change!",
      background: isDarkMode() ? "#111827" : "#fff",
      color: isDarkMode() ? "#fff" : "#000",
    });

    if (!confirm.isConfirmed) return;
    await axiosSecure.patch(`/users/${id}`, { role: newRole });
    Swal.fire({
      title: "Updated!",
      text: "User role changed.",
      icon: "success",
      background: isDarkMode() ? "#111827" : "#fff",
      color: isDarkMode() ? "#fff" : "#000",
    });
    refetch();
  };

  const deleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: PRIMARY_COLOR,
      confirmButtonText: "Delete",
      background: isDarkMode() ? "#111827" : "#fff",
      color: isDarkMode() ? "#fff" : "#000",
    });

    if (!confirm.isConfirmed) return;
    await axiosSecure.delete(`/users/${id}`);
    Swal.fire({
      title: "Deleted!",
      text: "User removed successfully.",
      icon: "success",
      background: isDarkMode() ? "#111827" : "#fff",
      color: isDarkMode() ? "#fff" : "#000",
    });
    refetch();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
        Manage <span style={{ color: PRIMARY_COLOR }}>Users</span>
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          className="border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-3 rounded-lg flex-1 shadow-sm focus:ring-2 focus:ring-green-400 outline-none transition"
          placeholder="Search by name or email..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          className="border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-green-400 transition"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
          <option value="student">Student</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-xl border border-transparent dark:border-gray-800">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              {["#", "Name", "Email", "Role", "Actions"].map((head) => (
                <th key={head} className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-12 text-gray-400 dark:text-gray-500">No users found.</td>
              </tr>
            ) : (
              users.map((u, index) => (
                <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition">
                  <td className="px-6 py-4 dark:text-gray-400 text-sm">{index + 1}</td>
                  <td className="px-6 py-4 font-medium dark:text-gray-200">{u.name}</td>
                  <td className="px-6 py-4 dark:text-gray-400 text-sm">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight
                      ${u.role === 'admin' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500' : 
                        u.role === 'moderator' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 
                        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2 flex-wrap">
                    {u.role === "student" && (
                      <>
                        <button onClick={() => updateRole(u._id, "moderator")} className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold shadow-sm transition">Mod</button>
                        <button onClick={() => updateRole(u._id, "admin")} className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold shadow-sm transition">Admin</button>
                      </>
                    )}
                    {u.role !== "student" && (
                      <button onClick={() => updateRole(u._id, "student")} className="px-3 py-1 rounded bg-orange-400 hover:bg-orange-500 text-white text-xs font-semibold shadow-sm transition">Demote</button>
                    )}
                    <button onClick={() => deleteUser(u._id)} className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-semibold shadow-sm transition">Delete</button>
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