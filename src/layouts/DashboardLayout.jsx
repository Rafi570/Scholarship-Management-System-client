import React, { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role } = useRole();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const html = document.querySelector("html");
    html.setAttribute("data-theme", savedTheme);
    if (savedTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, []);

  // Updated active class for better contrast in both modes
  const activeClass =
    "bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary font-bold rounded-lg shadow-sm";

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

      {/* 🔥 Sticky Navbar */}
      <nav className="flex items-center justify-between h-16 px-4 md:px-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-md fixed top-0 left-0 w-full z-50 transition-colors duration-300">
        {/* Drawer button for mobile */}
        <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-square lg:hidden dark:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>

        {/* Logo */}
        {/* <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-1">
          <span className="text-gray-800 dark:text-gray-100">Scholarship</span>
          <span className="text-primary font-extrabold">Finder</span>
        </Link> */}
<Link to="/" className="group flex items-center gap-2">
          <div className="w-10 h-10 bg-[#35AC86] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform">
            S
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-tighter dark:text-white uppercase">Scholarship</span>
            <span className="text-[#35AC86] text-sm font-bold">Finder.</span>
          </div>
        </Link>
        {/* User info desktop */}
        {user && (
          <div className="hidden lg:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{user.displayName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
            <div className="avatar">
              <div className="w-10 rounded-full ring-2 ring-primary/40">
                <img src={user?.photoURL || user?.photo || "https://via.placeholder.com/40"} alt="User" />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 🔥 Drawer Section */}
      <div className="drawer lg:drawer-open mt-16">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        {/* Main Content Area */}
        <div className="drawer-content p-4 md:p-8 bg-gray-50 dark:bg-gray-950">
          <Outlet />
        </div>

        {/* Sidebar */}
        <div className="drawer-side mt-16 lg:mt-0 z-40">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

          <aside className="w-72 bg-white dark:bg-gray-900 shadow-xl min-h-full flex flex-col border-r border-gray-100 dark:border-gray-800 transition-colors duration-300">

            {/* User Section Sidebar */}
            {user && (
              <div className="flex items-center gap-3 p-5 border-b border-gray-200 dark:border-gray-800">
                <div className="avatar">
                  <div className="w-12 rounded-full ring-2 ring-primary/40">
                    <img src={user?.photoURL || user?.photo || "https://via.placeholder.com/40"} alt="Avatar" />
                  </div>
                </div>

                <div className="overflow-hidden">
                  <h3 className="font-bold text-gray-700 dark:text-gray-200 truncate">{user.displayName}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-tighter">{role}</p>
                </div>
              </div>
            )}

            {/* Menu Links */}
            <ul className="menu p-4 gap-1 text-gray-700 dark:text-gray-300">

              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? activeClass : ""}`
                }>
                Dashboard Home
              </NavLink>

              <NavLink
                to="/dashboard/my-applicatioin"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? activeClass : ""}`
                }>
                My Application
              </NavLink>

              <NavLink
                to="/dashboard/my-review"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? activeClass : ""}`
                }>
                My Review
              </NavLink>

              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? activeClass : ""}`
                }>
                Profile
              </NavLink>

              {/* Moderator Links */}
              {role === "moderator" && (
                <>
                  <div className="border-t border-gray-100 dark:border-gray-800 my-2"></div>
                  <p className="text-[10px] font-bold text-gray-400 px-3 mb-1 uppercase tracking-widest">Moderation</p>
                  
                  <NavLink
                    to="/dashboard/manage-student-applied"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg transition-all ${isActive ? activeClass : ""}`
                    }>
                    Manage Student Applied
                  </NavLink>

                  <NavLink
                    to="/dashboard/all-application"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg transition-all ${isActive ? activeClass : ""}`
                    }>
                    All Application
                  </NavLink>

                  <NavLink
                    to="/dashboard/all-review"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg transition-all ${isActive ? activeClass : ""}`
                    }>
                    Manage Review
                  </NavLink>
                </>
              )}

              {/* Admin Links */}
              {role === "admin" && (
                <>
                  <div className="border-t border-gray-100 dark:border-gray-800 my-2"></div>
                  <p className="text-[10px] font-bold text-gray-400 px-3 mb-1 uppercase tracking-widest">Administration</p>

                  <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg transition-all ${isActive ? activeClass : ""}`
                    }>
                    Manage Users
                  </NavLink>

                  <NavLink
                    to="/dashboard/add-scholarship"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg transition-all ${isActive ? activeClass : ""}`
                    }>
                    Add Scholarship
                  </NavLink>

                  <NavLink
                    to="/dashboard/manage-scholarship"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg transition-all ${isActive ? activeClass : ""}`
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