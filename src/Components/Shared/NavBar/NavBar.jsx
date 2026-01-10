import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const activeLink = "text-[#35AC86] font-bold";
  const normalLink = "text-gray-700 dark:text-gray-200 hover:text-[#35AC86] font-bold transition";

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-[100] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex justify-between items-center h-20">
        
        {/* Logo */}
<Link to="/" className="group flex items-center gap-2">
          <div className="w-10 h-10 bg-[#35AC86] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform">
            S
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-tighter dark:text-white uppercase">Scholarship</span>
            <span className="text-[#35AC86] text-sm font-bold">Finder.</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <div className="flex gap-6">
            <NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink}>Home</NavLink>
            <NavLink to="/scholarships" className={({ isActive }) => isActive ? activeLink : normalLink}>All Scholarships</NavLink>
            <NavLink to="/blog" className={({ isActive }) => isActive ? activeLink : normalLink}>Blog</NavLink>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleTheme} 
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-orange-400 hover:scale-110 transition"
            >
              {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} className="text-gray-600" />}
            </button>

            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="avatar cursor-pointer">
                  <div className="w-10 rounded-full ring-2 ring-[#35AC86] ring-offset-2 dark:ring-offset-gray-900">
                    <img src={user.photoURL || "https://i.ibb.co/mJR9n1C/default-avatar.png"} alt="User" />
                  </div>
                </div>
                <ul tabIndex={0} className="dropdown-content menu p-3 shadow-xl bg-white dark:bg-gray-800 rounded-xl w-52 border dark:border-gray-700 mt-4">
                  <li><NavLink to="/dashboard" className="dark:text-gray-200 font-medium">Dashboard</NavLink></li>
                  <li><NavLink to="/dashboard/my-applicatioin" className="dark:text-gray-200 font-medium">My Applications</NavLink></li>
                  <div className="divider my-1 dark:before:bg-gray-700 dark:after:bg-gray-700"></div>
                  <li><button className="text-red-500 font-bold" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-3">
                <NavLink to="/auth/login" className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:text-gray-200 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition">Login</NavLink>
                <NavLink to="/auth/register" className="px-5 py-2 rounded-lg bg-[#35AC86] text-white font-bold hover:opacity-90 transition">Register</NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Buttons */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={handleTheme} className="text-orange-400 p-2">
            {theme === "dark" ? <FaSun size={22} /> : <FaMoon size={22} className="text-gray-600" />}
          </button>
          
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-800 dark:text-white p-2">
            {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown Style - Now Responsive) */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white dark:bg-gray-900 border-t dark:border-gray-800 ${menuOpen ? "max-h-[500px] py-6" : "max-h-0 py-0"}`}>
        <div className="flex flex-col px-6 gap-4">
          <NavLink onClick={() => setMenuOpen(false)} to="/" className={({ isActive }) => `text-lg font-bold ${isActive ? "text-[#35AC86]" : "dark:text-gray-200"}`}>Home</NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/scholarships" className={({ isActive }) => `text-lg font-bold ${isActive ? "text-[#35AC86]" : "dark:text-gray-200"}`}>All Scholarships</NavLink>
          <NavLink onClick={() => setMenuOpen(false)} to="/blog" className={({ isActive }) => `text-lg font-bold ${isActive ? "text-[#35AC86]" : "dark:text-gray-200"}`}>Blog</NavLink>
          
          {user && (
            <>
              <NavLink onClick={() => setMenuOpen(false)} to="/dashboard" className="text-lg font-bold dark:text-gray-200">Dashboard</NavLink>
              <NavLink onClick={() => setMenuOpen(false)} to="/dashboard/my-applicatioin" className="text-lg font-bold dark:text-gray-200">My Application</NavLink>
            </>
          )}

          <div className="border-t dark:border-gray-800 pt-4 mt-2">
            {user ? (
              <button onClick={handleLogout} className="w-full py-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 font-bold">Logout</button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link onClick={() => setMenuOpen(false)} to="/auth/login" className="w-full py-3 text-center rounded-lg border dark:border-gray-700 dark:text-white font-bold">Login</Link>
                <Link onClick={() => setMenuOpen(false)} to="/auth/register" className="w-full py-3 text-center rounded-lg bg-[#35AC86] text-white font-bold">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;