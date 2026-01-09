import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const activeLink = "text-primary font-semibold";

  return (
    <nav className="backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm px-4 md:px-10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight flex items-center gap-1"
        >
          <span className="text-gray-800">Scholarship</span>
          <span className="text-primary font-extrabold">Finder</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive ? activeLink : "text-gray-700 hover:text-primary"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/scholarships"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive ? activeLink : "text-gray-700 hover:text-primary"
              }`
            }
          >
            All Scholarships
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive ? activeLink : "text-gray-700 hover:text-primary"
              }`
            }
          >
            Blog
          </NavLink>

          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0}>
                <div
                  className="avatar cursor-pointer hover:scale-105 transition"
                  title={user.displayName || "User"}
                >
                  <div className="w-10 rounded-full ring-2 ring-primary/40">
                    <img
                      src={
                        user.photoURL ||
                        user.photo ||
                        "https://via.placeholder.com/40"
                      }
                    />
                  </div>
                </div>
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-3 shadow-lg bg-white rounded-xl w-48 border border-gray-100"
              >
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `${isActive ? activeLink : ""}`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                                <li>
                  <NavLink
                    to="/dashboard/my-applicatioin"
                    className={({ isActive }) =>
                      `${isActive ? activeLink : ""}`
                    }
                  >
                    My Application
                  </NavLink>
                </li>

                <li>
                  <button className="hover:text-red-600" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <NavLink
                to="/auth/login"
                className="px-4 py-1.5 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-100 transition"
              >
                Login
              </NavLink>

              <NavLink
                to="/auth/register"
                className="px-4 py-1.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden btn btn-square btn-ghost"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 px-4 pb-4 flex flex-col gap-3 bg-white backdrop-blur-md border-b border-gray-200 pt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `py-3 rounded-lg font-medium transition ${
                isActive
                  ? activeLink
                  : "text-gray-700 hover:bg-primary/10 hover:text-primary"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/scholarships"
            className={({ isActive }) =>
              `py-3 rounded-lg font-medium transition ${
                isActive
                  ? activeLink
                  : "text-gray-700 hover:bg-primary/10 hover:text-primary"
              }`
            }
          >
            All Scholarships
          </NavLink>

          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `py-3 rounded-lg font-medium transition ${
                  isActive
                    ? activeLink
                    : "text-gray-700 hover:bg-primary/10 hover:text-primary"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="py-3 rounded-lg text-red-600 font-medium hover:bg-red-100 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/auth/login"
                className="w-full py-3 text-center rounded-lg border border-gray-300 text-gray-800 font-semibold hover:bg-gray-100 transition"
              >
                Login
              </NavLink>

              <NavLink
                to="/auth/register"
                className="w-full py-3 text-center rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
