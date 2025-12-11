import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import NavBar from "../Components/Shared/NavBar/NavBar";
import Footer from "../Components/Shared/Footer/Footer";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role } = useRole();

  const activeClass =
    "bg-primary/20 text-primary font-medium rounded-lg shadow-sm";

  return (


      <div className="drawer lg:drawer-open max-w-7xl mx-auto">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        {/* Main Content */}
        <div className="drawer-content flex flex-col min-h-screen">
          {/* Top Navigation */}
          <nav className="flex items-center justify-between h-16 px-4 md:px-10 bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost md:hidden"
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

            <Link
              to="/"
              className="text-xl font-bold tracking-tight flex items-center gap-1"
            >
              <span className="text-gray-800">Scholarship</span>
              <span className="text-primary font-extrabold">Finder</span>
            </Link>

            <div className="hidden md:flex items-center gap-4">
              {user && (
                <>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">
                      {user.displayName}
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

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-8 bg-gray-50">
            <Outlet />
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

          <aside className="flex flex-col bg-white shadow-md w-64">
            {/* User Info */}
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
                    {user.displayName}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-xs text-gray-400">{role}</p>
                </div>
              </div>
            )}

            {/* Menu */}
            <ul className="menu p-4 gap-1 flex flex-col text-gray-700">
              {/* Common Links */}
              {/* <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition ${isActive ? activeClass : ""}`
                  }
                >
                  Dashboard Home
                </NavLink>
              </li> */}
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition ${
                    isActive ? activeClass : ""
                  }`
                }
              >
                Dashboard Home
              </NavLink>

              <li>
                <NavLink
                  to="/dashboard/my-applicatioin"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition ${
                      isActive ? activeClass : ""
                    }`
                  }
                >
                  My Application
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/my-review"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition ${
                      isActive ? activeClass : ""
                    }`
                  }
                >
                  My Review
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg transition ${
                      isActive ? activeClass : ""
                    }`
                  }
                >
                  Profile
                </NavLink>
              </li>

              {/* Moderator */}
              {role === "moderator" && (
                <>
                  <div className="border-t my-2"></div>

                  <li>
                    <NavLink
                      to="/dashboard/manage-student-applied"
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-lg transition ${
                          isActive ? activeClass : ""
                        }`
                      }
                    >
                      Manage Student Applied
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/all-application"
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-lg transition ${
                          isActive ? activeClass : ""
                        }`
                      }
                    >
                      All Application
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/all-review"
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-lg transition ${
                          isActive ? activeClass : ""
                        }`
                      }
                    >
                      Manage Review
                    </NavLink>
                  </li>
                </>
              )}

              {/* Admin */}
              {role === "admin" && (
                <>
                  <div className="border-t my-2"></div>

                  <li>
                    <NavLink
                      to="/dashboard/manage-users"
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-lg transition ${
                          isActive ? activeClass : ""
                        }`
                      }
                    >
                      Manage Users
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/add-scholarship"
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-lg transition ${
                          isActive ? activeClass : ""
                        }`
                      }
                    >
                      Add Scholarship
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/manage-scholarship"
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-lg transition ${
                          isActive ? activeClass : ""
                        }`
                      }
                    >
                      Manage Scholarship
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </aside>
        </div>
      </div>


  );
};

export default DashboardLayout;
