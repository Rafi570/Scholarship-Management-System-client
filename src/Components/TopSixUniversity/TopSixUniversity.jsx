// components/TopSixUniversity.jsx

import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import { motion } from "framer-motion";
import SingleTopUniversity from "../singleTopUniversity/singleTopUniversity";
import useAuth from "../../hooks/useAuth";

const TopSixUniversity = () => {
  const PRIMARY_COLOR = "#35AC86";
  const axiosSecure = useAxiosSecure();
  const {loading}=useAuth()
  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["top-cheapest"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships/cheapest");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold text-center mb-14 text-gray-800"
        >
          🎓 Top <span style={{ color: PRIMARY_COLOR }}>Affordable</span>  Scholarships
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {scholarships.map((scholar) => (
            <SingleTopUniversity key={scholar._id} scholar={scholar} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSixUniversity;
