import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const PRIMARY_COLOR = "#35AC86";

const testimonials = [
  {
    id: 1,
    quote: "This platform is a game-changer! I found three relevant scholarships within minutes and successfully secured funding for my Master's degree abroad. Highly recommend!",
    name: "Tanzir Islam",
    program: "M.Sc. in Computer Science",
    rating: 5,
  },
  {
    id: 2,
    quote: "The application tracking feature is excellent. It kept me updated at every stage, reducing so much stress during the application process. Thank you!",
    name: "Farah Chowdhury",
    program: "Undergraduate Business Program",
    rating: 5,
  },
  {
    id: 3,
    quote: "Finding scholarships that match my specific criteria was incredibly easy with the robust filtering options. A truly useful resource.",
    name: "Sohan Khan",
    program: "Ph.D. in Mechanical Engineering",
    rating: 4,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const Extra2 = () => {
  return (
    <motion.section 
      className="py-16 md:py-24  dark:bg-gray-950 transition-colors duration-500"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: PRIMARY_COLOR }}>
            Real Stories
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-4">
            Success <span style={{ color: PRIMARY_COLOR }}>Stories</span> from Our Users
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((story) => (
            <motion.div 
              key={story.id}
              className="bg-gray-50 dark:bg-gray-900 p-8 rounded-[2rem] shadow-xl dark:shadow-none flex flex-col h-full border border-transparent dark:border-gray-800 transition-all hover:border-primary/50 group"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="relative mb-6">
                <FaQuoteLeft className="text-4xl opacity-20 dark:opacity-10 absolute -top-2 -left-2" style={{ color: PRIMARY_COLOR }} />
                <p className="relative z-10 italic text-gray-700 dark:text-gray-300 leading-relaxed">
                  "{story.quote}"
                </p>
              </div>
              
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`w-4 h-4 mr-1 ${i < story.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-700"}`} />
                ))}
              </div>
              
              <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
                <p className="font-black text-lg tracking-tight group-hover:text-primary transition-colors dark:text-white">
                  {story.name}
                </p>
                <p className="text-sm font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wide mt-1">
                  {story.program}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Extra2;