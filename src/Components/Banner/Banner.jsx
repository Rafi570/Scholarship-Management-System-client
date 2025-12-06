// src/components/ScholarshipBanner.jsx
import React from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router";
import { useRef } from "react";

const ScholarshipBanner = () => {
  const navigate = useNavigate();
  const ref = useRef(null);

  // এটা true হবে যখন ব্যানারটা viewport-এ দেখা যাবে
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen w-full flex-col overflow-hidden"
    >
      {/* Background with Parallax Feel */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[8000ms]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%),
          url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjc_Mvm7KeWPGJEtBvxxQWo5HRB5rhC6bjH3kFhpeLiHpEVJI9Qd_CKuhbcEhsp5JFS6B7JjQBOQ6sEnc-YjZJZc1hcpU46skigsUYY5jRSslW8Ll_5UPxixso9GmIPfPGR48QHdux3h_qVqxXa4VeMuBTsahz842hHb8LJ6PjMz54MhXUBHmDyovNGi8eXZVwpL1mx6gg_6XRGMSnWoL78949LQqH8CbUo2fm_FF9p1v-xgdRGMlUDPntag1t91xblKB2beyrBNI")`,
          transform: isInView ? "scale(1.05)" : "scale(1.1)",
        }}
      />

      {/* Content */}
      <div className="relative flex flex-1 items-center justify-center px-6 py-20">
        <div className="max-w-6xl text-center">

          {/* Title - Re-animates every time it comes into view */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl font-black tracking-tight text-white 
                       sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Unlock Your Future Starts
            <br />
            <motion.span
              initial={{ opacity: 0, backgroundSize: "0% 100%" }}
              animate={isInView ? {
                opacity: 1,
                backgroundSize: "100% 100%"
              } : {}}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="bg-gradient-to-r from-primary via-blue-400 to-purple-500 
                         bg-clip-text text-transparent 
                         bg-no-repeat bg-left-bottom"
              style={{ backgroundSize: "0% 100%" }}
            >
              With a Scholarship
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-6 text-lg text-white/90 md:text-xl lg:text-2xl"
          >
            Discover thousands of fully-funded opportunities waiting just for you.
          </motion.p>

          {/* Button with Shine + Bounce on Appear */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="mt-12"
          >
            <button
              onClick={() => navigate("/scholarships")}
              className="group relative overflow-hidden rounded-2xl bg-primary px-10 py-6 text-lg font-bold text-white shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-primary/50 md:px-12 md:py-7 md:text-xl"
            >
              <span className="relative z-10">Find Your Scholarship</span>
              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-white/30"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </button>
          </motion.div>

          {/* Scroll Down Indicator - Always Visible & Animated */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-3 text-white/70">
              <p className="text-sm">Scroll to explore</p>
              <div className="h-12 w-7 rounded-full border-2 border-white/50">
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="mx-auto mt-2 h-4 w-1 rounded-full bg-white"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ScholarshipBanner;