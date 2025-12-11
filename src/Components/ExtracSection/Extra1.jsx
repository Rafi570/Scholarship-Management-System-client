import React, { useState } from "react";
import { motion } from "framer-motion";

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
    <div className="p-10 rounded-lg ">
        <div className="max-w-3xl mx-auto">
             <h2 className="text-3xl font-bold mb-6 text-[#1e3a8a] text-center">Frequently <span style={{ color: PRIMARY_COLOR }}>Asked</span> Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="border-b border-gray-300 pb-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[#1e3a8a]">{faq.question}</h3>
              <span className="text-xl">{activeIndex === index ? "-" : "+"}</span>
            </div>
            {activeIndex === index && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-2 text-gray-700"
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
        </div>
     
    </div>
  );
};

export default Extra1;
