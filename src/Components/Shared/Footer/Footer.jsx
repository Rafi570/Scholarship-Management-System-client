import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#101922] text-gray-300 py-10 px-4 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        {/* Logo & Description */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl">
            Scholarship<span className="text-primary font-bold">Finder</span>
          </h2>
          <p className="text-sm md:w-64">
            Your one-stop platform to explore and apply for scholarships
            worldwide.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-white">Resources</h3>
            <a href="#" className="hover:text-primary transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              All Scholarships
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Dashboard
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-white">Support</h3>
            <a href="#" className="hover:text-primary transition-colors">
              Contact Us
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              FAQ
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Social Links with Icons */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-white">Follow Us</h3>
          <div className="flex gap-4 mt-1 text-xl">
            <a
              href="#"
              className="hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} ScholarshipFinder. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
