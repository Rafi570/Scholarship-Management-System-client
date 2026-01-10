import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How do I apply for a scholarship?",
    answer: "You can apply by filling out the application form on the scholarship detail page."
  },
  {
    question: "Are international students eligible?",
    answer: "Yes, many scholarships are open to international students. Check the eligibility section."
  },
  {
    question: "Is there an application fee?",
    answer: "Some scholarships have a small fee, while others are free to apply."
  },
  {
    question: "Can I apply for multiple scholarships?",
    answer: "Yes, you can apply for as many scholarships as you are eligible for."
  },
  {
    question: "What documents are required?",
    answer: "Usually transcripts, recommendation letters, and a personal statement."
  },
  {
    question: "When will I know the results?",
    answer: "Results are typically announced within a few weeks after the application deadline."
  }
];

const Extra1 = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const PRIMARY_COLOR = "#35AC86";

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-16 px-6  dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black mb-10 text-[#1e3a8a] dark:text-white text-center">
          Frequently <span style={{ color: PRIMARY_COLOR }}>Asked</span> Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`border-b border-gray-200 dark:border-gray-800 pb-4 cursor-pointer transition-all ${
                activeIndex === index ? "translate-x-2" : ""
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center py-2">
                <h3 className={`text-lg font-bold transition-colors ${
                  activeIndex === index ? "text-[#35AC86]" : "text-[#1e3a8a] dark:text-gray-200"
                }`}>
                  {faq.question}
                </h3>
                <span className={`text-2xl transition-transform duration-300 ${
                  activeIndex === index ? "rotate-45 text-primary" : "dark:text-gray-400"
                }`}>
                  {activeIndex === index ? "×" : "+"}
                </span>
              </div>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Extra1;