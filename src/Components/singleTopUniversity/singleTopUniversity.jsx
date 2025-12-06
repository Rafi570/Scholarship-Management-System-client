// components/SingleTopUniversity.jsx

import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const SingleTopUniversity = ({ scholar }) => {
  const fee =
    scholar.tuitionFees && Number(scholar.tuitionFees) > 0
      ? scholar.tuitionFees.toLocaleString()
      : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: false, amount: 0.2 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-200"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={scholar.universityImage}
          alt={scholar.universityName}
          className="w-full h-56 object-cover"
        />

        {scholar.universityWorldRank && (
          <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold shadow">
            #{scholar.universityWorldRank}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-bold text-xl line-clamp-2 text-gray-900">
          {scholar.scholarshipName}
        </h3>

        <p className="text-primary font-semibold mt-1">
          {scholar.universityName}
        </p>

        <p className="text-sm text-gray-600 mt-2">
          {scholar.universityCity}, {scholar.universityCountry}
        </p>

        <div className="mt-4 text-sm">
          <div className="flex justify-between">
            <span className="font-bold text-green-600 text-xl">${fee}</span>
            <span className="text-gray-500 font-medium">
              Due: {new Date(scholar.applicationDeadline).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Only View Button (same level) */}
        <div className="mt-auto pt-6">
          <Link to={`/scholarship/${scholar._id}`}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition shadow-md"
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default SingleTopUniversity;
