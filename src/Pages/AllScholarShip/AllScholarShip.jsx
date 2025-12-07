// pages/AllScholarShip.jsx
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import SingleTopUniversity from "../../Components/singleTopUniversity/singleTopUniversity";
import Loading from "../../Components/Loading/Loading";
// import SingleTopUniversity from "../../components/SingleTopUniversity";

const AllScholarShip = () => {
  const { user } = useAuth();
  const axios = useAxios();

  // search & filters
  const [search, setSearch] = useState("");
  const [subjectCategory, setSubjectCategory] = useState("");
  const [scholarshipCategory, setScholarshipCategory] = useState("");
  const [degree, setDegree] = useState("");

  const { data: scholarships = [], isLoading, refetch } = useQuery({
    queryKey: ["all-scholarships", search, subjectCategory, scholarshipCategory, degree],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (subjectCategory) params.append("subjectCategory", subjectCategory);
      if (scholarshipCategory) params.append("scholarshipCategory", scholarshipCategory);
      if (degree) params.append("degree", degree);

      const res = await axios.get(`/scholarshipUniversity?${params.toString()}`);
      return res.data;
    },
  });


  const handleSearch = () => refetch();

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All <span className="text-primary">Scholarships</span></h2>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by Scholarship or University"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 flex-1"
        />
        <select
          value={subjectCategory}
          onChange={(e) => setSubjectCategory(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="">All Subjects</option>
          <option value="Engineering">Engineering</option>
          <option value="Science">Science</option>
          <option value="Arts">Arts</option>
        </select>
        <select
          value={scholarshipCategory}
          onChange={(e) => setScholarshipCategory(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="">All Categories</option>
          <option value="Full fund">Full fund</option>
          <option value="Partial fund">Partial fund</option>
        </select>
        <select
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="">All Degrees</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
          <option value="PhD">PhD</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-[#35AC86] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#2F9B6F] transition"
        >
          Search
        </button>
      </div>

      {/* Scholarship Cards */}
      {isLoading ? (
        <p>Loading...</p>
      ) : scholarships.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No scholarships found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholar) => (
            <SingleTopUniversity key={scholar._id} scholar={scholar} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllScholarShip;
