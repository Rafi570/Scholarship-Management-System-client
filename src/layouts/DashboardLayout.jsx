import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role } = useRole();

  const activeClass =
    "bg-primary/20 text-primary font-medium rounded-lg shadow-sm";

  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* 🔥 Sticky Navbar – always on top */}
      <nav className="flex items-center justify-between h-16 px-4 md:px-10 bg-white shadow-md fixed top-0 left-0 w-full z-50">
        {/* Drawer button for mobile */}
        <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-square lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>

        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-1">
          <span className="text-gray-800">Scholarship</span>
          <span className="text-primary font-extrabold">Finder</span>
        </Link>

        {/* User info desktop */}
        {user && (
          <div className="hidden lg:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">{user.displayName}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="avatar">
              <div className="w-10 rounded-full ring-2 ring-primary/40">
                <img src={user?.photoURL || user?.photo || "https://via.placeholder.com/40"} />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 🔥 Drawer Section – mt-16 so it stays BELOW the navbar */}
      <div className="drawer lg:drawer-open mt-16">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        {/* Main Content */}
        <div className="drawer-content p-4 md:p-8">
          <Outlet />
        </div>

        {/* Sidebar */}
        <div className="drawer-side mt-16 md:mt-0">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

          <aside className="w-72 bg-white shadow-xl min-h-full flex flex-col">

            {/* User Section */}
            {user && (
              <div className="flex items-center gap-3 p-5 border-b border-gray-200">
                <div className="avatar">
                  <div className="w-12 rounded-full ring-2 ring-primary/40">
                    <img src={user?.photoURL || user?.photo || "https://via.placeholder.com/40"} />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">{user.displayName}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs text-gray-400 uppercase">{role}</p>
                </div>
              </div>
            )}

            {/* Menu */}
            <ul className="menu p-4 gap-1 text-gray-700">

              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition ${isActive ? activeClass : ""}`
                }>
                Dashboard Home
              </NavLink>

              <NavLink
                to="/dashboard/my-applicatioin"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition ${isActive ? activeClass : ""}`
                }>
                My Application
              </NavLink>

              <NavLink
                to="/dashboard/my-review"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition ${isActive ? activeClass : ""}`
                }>
                My Review
              </NavLink>

              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition ${isActive ? activeClass : ""}`
                }>
                Profile
              </NavLink>

              {/* Moderator */}
              {role === "moderator" && (
                <>
                  <div className="border-t my-2"></div>

                  <NavLink
                    to="/dashboard/manage-student-applied"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg transition ${isActive ? activeClass : ""}`
                    }>
                    Manage Student Applied
                  </NavLink>

                  <NavLink
                    to="/dashboard/all-application"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg transition ${isActive ? activeClass : ""}`
                    }>
                    All Application
                  </NavLink>

                  <NavLink
                    to="/dashboard/all-review"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg transition ${isActive ? activeClass : ""}`
                    }>
                    Manage Review
                  </NavLink>
                </>
              )}

              {/* Admin */}
              {role === "admin" && (
                <>
                  <div className="border-t my-2"></div>

                  <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg transition ${isActive ? activeClass : ""}`
                    }>
                    Manage Users
                  </NavLink>

                  <NavLink
                    to="/dashboard/add-scholarship"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg transition ${isActive ? activeClass : ""}`
                    }>
                    Add Scholarship
                  </NavLink>

                  <NavLink
                    to="/dashboard/manage-scholarship"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg transition ${isActive ? activeClass : ""}`
                    }>
                    Manage Scholarship
                  </NavLink>
                </>
              )}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
