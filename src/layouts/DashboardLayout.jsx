import React from "react";
import { Link, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Drawer content */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="flex items-center justify-between h-16 px-4 md:px-10 bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
          {/* Sidebar toggle for mobile */}
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-square btn-ghost md:hidden"
            aria-label="open sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold tracking-tight flex items-center gap-1"
          >
            <span className="text-gray-800">Scholarship</span>
            <span className="text-primary font-extrabold">Finder</span>
          </Link>

          {/* User info right side */}
          <div className="hidden md:flex items-center gap-4">
            {user && (
              <>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">
                    {user.displayName || user.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="avatar">
                  <div className="w-10 rounded-full ring-2 ring-primary/40">
                    <img
                      src={
                        user.photoURL ||
                        user.photo ||
                        "https://via.placeholder.com/40"
                      }
                      alt="User avatar"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>

      {/* Drawer sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="flex flex-col bg-white shadow-md w-64">
          {/* User info */}
          {user && (
            <div className="flex flex-col items-start gap-2 p-4 border-b border-gray-200">
              <div className="avatar">
                <div className="w-12 rounded-full ring-2 ring-primary/40">
                  <img
                    src={
                      user.photoURL ||
                      user.photo ||
                      "https://via.placeholder.com/40"
                    }
                    alt="User avatar"
                  />
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-700">
                  {user.displayName || user.name}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400 capitalize">
                  {role || "User"}
                </p>
              </div>
            </div>
          )}

          {/* Sidebar links */}
          <ul className="menu p-4 gap-2 flex flex-col">
            <li>
              <Link
                to="/dashboard"
                className="rounded-lg hover:bg-primary/10 hover:text-primary transition px-3 py-2"
              >
                Dashboard Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-review"
                className="rounded-lg hover:bg-primary/10 hover:text-primary transition px-3 py-2"
              >
                My Review
              </Link>
            </li>
            {role === "admin" && (
              <>
                <li>
                  <Link
                    to="/dashboard/manage-users"
                    className="rounded-lg hover:bg-primary/10 hover:text-primary transition px-3 py-2"
                  >
                    Manage Users
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/add-scholarship"
                    className="rounded-lg hover:bg-primary/10 hover:text-primary transition px-3 py-2"
                  >
                    Add ScholarShip
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/manage-scholarship"
                    className="rounded-lg hover:bg-primary/10 hover:text-primary transition px-3 py-2"
                  >
                    Manage Scholarship
                  </Link>
                </li>
              </>
            )}
            {role === "moderator" && (
              <>
                <li>
                  <Link
                    to="/dashboard/manage-student-applied"
                    className="rounded-lg hover:bg-primary/10 hover:text-primary transition px-3 py-2"
                  >
                    Manage Student Applied
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/all-review"
                    className="rounded-lg hover:bg-primary/10 hover:text-primary transition px-3 py-2"
                  >
                 Manage Review
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/dashboard/profile"
                className="rounded-lg hover:bg-primary/10 hover:text-primary transition px-3 py-2"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/my-applicatioin"
                className="rounded-lg hover:bg-primary/10 hover:text-primary transition px-3 py-2"
              >
                My Application
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
