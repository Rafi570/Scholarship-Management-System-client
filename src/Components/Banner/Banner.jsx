import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router";

const ScholarshipBanner = () => {
  const navigate = useNavigate();
  const ref = useRef(null);

  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
<section
  ref={ref}
  className="
    relative w-full
    h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[70vh]
    flex flex-col
    overflow-hidden
  "
>

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-[6000ms]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0,0,0,0.6),
              rgba(0,0,0,0.85)
            ),
            url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjc_Mvm7KeWPGJEtBvxxQWo5HRB5rhC6bjH3kFhpeLiHpEVJI9Qd_CKuhbcEhsp5JFS6B7JjQBOQ6sEnc-YjZJZc1hcpU46skigsUYY5jRSslW8Ll_5UPxixso9GmIPfPGR48QHdux3h_qVqxXa4VeMuBTsahz842hHb8LJ6PjMz54MhXUBHmDyovNGi8eXZVwpL1mx6gg_6XRGMSnWoL78949LQqH8CbUo2fm_FF9p1v-xgdRGMlUDPntag1t91xblKB2beyrBNI")
          `,
          backgroundPosition: "center 38%", 
          transform: isInView ? "scale(1.05)" : "scale(1.12)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 sm:px-6 md:px-10 py-16">
        <div className="max-w-5xl text-center">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="
              text-white font-black tracking-tight
              text-3xl sm:text-4xl md:text-5xl lg:text-7xl
              leading-tight
            "
          >
            Unlock Your Future Starts
            <br />
            <motion.span
              initial={{ opacity: 0, backgroundSize: "0% 100%" }}
              animate={
                isInView
                  ? { opacity: 1, backgroundSize: "100% 100%" }
                  : {}
              }
              transition={{ duration: 1.3, delay: 0.4 }}
              className="
                bg-gradient-to-r
                from-primary via-blue-400 to-purple-500
                bg-clip-text text-transparent
                bg-no-repeat bg-left-bottom
              "
              style={{ backgroundSize: "0% 100%" }}
            >
              With a Scholarship
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="
              mt-5 text-white/90
              text-base sm:text-lg md:text-xl lg:text-2xl
            "
          >
            Discover thousands of fully-funded opportunities waiting just for you.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1 }}
            className="mt-8"
          >
            <button
              onClick={() => navigate("/scholarships")}
              className="
                group relative rounded-2xl
                bg-primary text-white font-bold
                shadow-2xl
                px-8 py-4 md:px-12 md:py-5
                text-lg md:text-xl
                transition-all duration-500
                hover:scale-110 hover:shadow-primary/50
                overflow-hidden
              "
            >
              <span className="relative z-10">Find Your Scholarship</span>

              <motion.div
                className="absolute inset-0 bg-white/30"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2 text-white/70">
              <p className="text-xs">Scroll to explore</p>
              <div className="h-10 w-6 rounded-full border-2 border-white/50">
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="mx-auto mt-2 h-3 w-1 rounded-full bg-white"
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
