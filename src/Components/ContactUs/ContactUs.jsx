import React from "react";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

const ContactUs = () => {
  return (
    <section className="bg-white min-h-screen text-gray-800">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold" style={{ color: "#35AC86" }}>
          Contact Us
        </h1>
        <p className="mt-4 text-gray-600 text-lg sm:text-xl">
          Reach out to us for any inquiries or support regarding scholarships.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pb-20 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
        {/* Address Card */}
        <div className="flex items-start space-x-4 bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[#35AC86] transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <HiOutlineLocationMarker className="text-[#35AC86] text-3xl mt-1" />
          <div>
            <h3 className="text-xl font-bold mb-1" style={{ color: "#35AC86" }}>
              Address
            </h3>
            <p className="text-gray-600">
              123 Scholarship St, Dhaka, Bangladesh
            </p>
          </div>
        </div>

        {/* Email Card */}
        <div className="flex items-start space-x-4 bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[#35AC86] transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <HiOutlineMail className="text-[#35AC86] text-3xl mt-1" />
          <div>
            <h3 className="text-xl font-bold mb-1" style={{ color: "#35AC86" }}>
              Email
            </h3>
            <p className="text-gray-600">support@scholarship-system.com</p>
          </div>
        </div>

        {/* Phone Card */}
        <div className="flex items-start space-x-4 bg-white rounded-2xl p-6 shadow-lg border-t-4 border-[#35AC86] transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <HiOutlinePhone className="text-[#35AC86] text-3xl mt-1" />
          <div>
            <h3 className="text-xl font-bold mb-1" style={{ color: "#35AC86" }}>
              Phone
            </h3>
            <p className="text-gray-600">+880 123 456 789</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
