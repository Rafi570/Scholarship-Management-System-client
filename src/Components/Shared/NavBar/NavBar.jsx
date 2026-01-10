import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaSun, FaMoon } from "react-icons/fa"; // react-icons install thakte hobe
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const activeLink = "text-primary font-semibold";

  return (
    <nav className="nav-glass shadow-sm px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-1">
          <span className="text-gray-800 dark:text-gray-100">Scholarship</span>
          <span className="text-primary font-extrabold">Finder</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLink to="/" className={({ isActive }) => `text-sm font-medium transition ${isActive ? activeLink : "text-gray-700 dark:text-gray-300 hover:text-primary"}`}>Home</NavLink>
          <NavLink to="/scholarships" className={({ isActive }) => `text-sm font-medium transition ${isActive ? activeLink : "text-gray-700 dark:text-gray-300 hover:text-primary"}`}>All Scholarships</NavLink>
          <NavLink to="/blog" className={({ isActive }) => `text-sm font-medium transition ${isActive ? activeLink : "text-gray-700 dark:text-gray-300 hover:text-primary"}`}>Blog</NavLink>

          {/* Theme Toggle Button (Desktop) */}
          <button 
            onClick={handleTheme} 
            className="btn btn-ghost btn-circle text-orange-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          >
            {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} className="text-gray-600" />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0}>
                <div className="avatar cursor-pointer hover:scale-105 transition" title={user.displayName || "User"}>
                  <div className="w-10 rounded-full ring-2 ring-primary/40">
                    <img src={user.photoURL || user.photo || "https://via.placeholder.com/40"} alt="User" />
                  </div>
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content menu p-3 shadow-lg bg-white dark:bg-gray-800 rounded-xl w-48 border border-gray-100 dark:border-gray-700 mt-2">
                <li><NavLink to="/dashboard" className={({ isActive }) => `${isActive ? activeLink : "dark:text-gray-200"}`}>Dashboard</NavLink></li>
                <li><NavLink to="/dashboard/my-applicatioin" className={({ isActive }) => `${isActive ? activeLink : "dark:text-gray-200"}`}>My Application</NavLink></li>
                <li><button className="hover:text-red-600 dark:text-red-400" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-3">
              <NavLink to="/auth/login" className="px-4 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200 transition">Login</NavLink>
              <NavLink to="/auth/register" className="px-4 py-1.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition">Register</NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={handleTheme} className="btn btn-ghost btn-circle text-orange-400">
            {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} className="text-gray-600" />}
          </button>
          
          <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-square btn-ghost dark:text-white">
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 px-4 pb-4 flex flex-col gap-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pt-4 transition-colors">
          <NavLink to="/" className={({ isActive }) => `py-3 rounded-lg font-medium transition ${isActive ? activeLink : "text-gray-700 dark:text-gray-300 hover:bg-primary/10"}`}>Home</NavLink>
          <NavLink to="/scholarships" className={({ isActive }) => `py-3 rounded-lg font-medium transition ${isActive ? activeLink : "text-gray-700 dark:text-gray-300 hover:bg-primary/10"}`}>All Scholarships</NavLink>
          {user && (
            <NavLink to="/dashboard" className={({ isActive }) => `py-3 rounded-lg font-medium transition ${isActive ? activeLink : "text-gray-700 dark:text-gray-300 hover:bg-primary/10"}`}>Dashboard</NavLink>
          )}

          {user ? (
            <button onClick={handleLogout} className="py-3 text-left rounded-lg text-red-600 font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition">Logout</button>
          ) : (
            <div className="flex flex-col gap-2">
              <NavLink to="/auth/login" className="w-full py-3 text-center rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition">Login</NavLink>
              <NavLink to="/auth/register" className="w-full py-3 text-center rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition">Register</NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;