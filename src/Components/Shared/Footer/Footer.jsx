import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-black text-gray-300 py-12 px-6 transition-colors duration-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* 1. Logo & Description */}
          <div className="flex flex-col gap-4">
        <Link to="/" className="group flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#35AC86] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform">
                    S
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-lg font-black tracking-tighter dark:text-white uppercase">Scholarship</span>
                    <span className="text-[#35AC86] text-sm font-bold">Finder.</span>
                  </div>
                </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Your one-stop platform to explore and apply for scholarships
              worldwide. We help students achieve their academic dreams.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-white uppercase tracking-wider text-sm">Resources</h3>
            <ul className="flex flex-col gap-2">
              <li><Link to="/" className="hover:text-primary transition-colors text-sm">Home</Link></li>
              <li><Link to="/scholarships" className="hover:text-primary transition-colors text-sm">All Scholarships</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors text-sm">Latest Blogs</Link></li>
            </ul>
          </div>

          {/* 3. Support & Policies */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-white uppercase tracking-wider text-sm">Support</h3>
            <ul className="flex flex-col gap-2">
              <li><Link to="/#" className="hover:text-primary transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/#" className="hover:text-primary transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/#" className="hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* 4. Social & Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-white uppercase tracking-wider text-sm">Follow Us</h3>
            <div className="flex gap-4 text-xl">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-md" aria-label="Facebook">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-md" aria-label="Twitter">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-md" aria-label="LinkedIn">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} <span className="text-gray-400 font-semibold">ScholarshipFinder</span>. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 uppercase tracking-widest">
            Built for a better future
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;