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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="group bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl dark:shadow-none transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/50"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden h-56">
        <img
          src={scholar.universityImage}
          alt={scholar.universityName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay for better text readability on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {scholar.universityWorldRank && (
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-lg backdrop-blur-sm">
            RANK #{scholar.universityWorldRank}
          </div>
        )}

        {/* Badge for Scholarship Category (Optional but looks good) */}
        <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 text-primary px-3 py-1 rounded-lg text-xs font-bold">
           {scholar.scholarshipCategory || "Scholarship"}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-bold text-xl line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
          {scholar.scholarshipName}
        </h3>

        <p className="text-primary font-bold text-sm mt-2 uppercase tracking-wide">
          {scholar.universityName}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {scholar.universityCity}, {scholar.universityCountry}
        </p>

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-widest">Tuition Fee</span>
              <span className="font-black text-green-600 dark:text-green-400 text-2xl">
                {fee !== "N/A" ? `$${fee}` : "Free"}
              </span>
            </div>
            <div className="text-right flex flex-col">
               <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-widest text-right">Deadline</span>
               <span className="text-gray-700 dark:text-gray-300 font-bold text-sm">
                {new Date(scholar.applicationDeadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-auto pt-6">
          <Link to={`/scholarship/${scholar._id}`}>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 transition shadow-lg shadow-primary/20 active:shadow-none"
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