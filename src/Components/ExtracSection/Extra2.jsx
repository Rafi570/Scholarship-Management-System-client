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
    quote: "Finding scholarships that match my specific criteria (country, degree level, and subject) was incredibly easy with the robust filtering options. A truly useful resource.",
    name: "Sohan Khan",
    program: "Ph.D. in Mechanical Engineering",
    rating: 4,
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const Extra2 = () => {
  return (
    <motion.section 
      className="py-16 md:py-24"
      initial="hidden"

      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: PRIMARY_COLOR }}>
            Real Stories
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-2">
            Success <span style={{ color: PRIMARY_COLOR }}>Stories</span> from Our Users
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            See how students achieved their academic dreams with the help of our platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((story) => (
            <motion.div 
              key={story.id}
              className="bg-gray-50 p-6 rounded-xl shadow-lg flex flex-col h-full transition duration-300 border-b-4 hover:shadow-2xl"
              style={{ borderColor: PRIMARY_COLOR }}
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <FaQuoteLeft className="text-3xl mb-4" style={{ color: PRIMARY_COLOR }} />
              
              {/* Quote Text */}
              <p className="italic text-gray-700 mb-4 flex-grow">
                "{story.quote}"
              </p>
              
              {/* Rating Stars */}
              <div className="flex items-center mb-3">
                {[...Array(story.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 w-4 h-4 mr-1" />
                ))}
              </div>
              
              {/* User Info */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                <p className="font-bold text-lg" style={{ color: PRIMARY_COLOR }}>
                  {story.name}
                </p>
                <p className="text-sm text-gray-500">
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