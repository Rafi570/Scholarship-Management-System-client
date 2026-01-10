import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import SingleTopUniversity from "../../Components/singleTopUniversity/singleTopUniversity";
import Loading from "../../Components/Loading/Loading";

const AllScholarShip = () => {
  const { user } = useAuth();
  const axios = useAxios();

  // filters
  const [search, setSearch] = useState("");
  const [subjectCategory, setSubjectCategory] = useState("");
  const [scholarshipCategory, setScholarshipCategory] = useState("");
  const [degree, setDegree] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1); // pagination
  const limit = 9;

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "all-scholarships",
      search,
      subjectCategory,
      scholarshipCategory,
      degree,
      sortBy,
      page,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (subjectCategory) params.append("subjectCategory", subjectCategory);
      if (scholarshipCategory) params.append("scholarshipCategory", scholarshipCategory);
      if (degree) params.append("degree", degree);
      if (sortBy) params.append("sortBy", sortBy);
      params.append("page", page);
      params.append("limit", limit);

      const res = await axios.get(`/scholarshipUniversity?${params.toString()}`);
      return res.data;
    },
  });

  const handleSearch = () => setPage(1) || refetch();

  const totalPages = data ? Math.ceil(data.total / limit) : 1;

  // Reusable styling for filters
  const filterClass = "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg p-2 focus:ring-2 focus:ring-primary outline-none transition-colors";

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen transition-colors duration-300">
      <h2 className="text-3xl font-black mb-6 text-gray-900 dark:text-white uppercase tracking-tight">
        All <span className="text-primary">Scholarships</span>
      </h2>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-3 mb-10 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
        <input
          type="text"
          placeholder="Search Scholarship or University..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${filterClass} flex-1`}
        />
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:flex gap-2">
          <select value={subjectCategory} onChange={(e) => setSubjectCategory(e.target.value)} className={filterClass}>
            <option value="">All Subjects</option>
            <option value="Engineering">Engineering</option>
            <option value="Science">Science</option>
            <option value="Arts">Arts</option>
          </select>

          <select value={scholarshipCategory} onChange={(e) => setScholarshipCategory(e.target.value)} className={filterClass}>
            <option value="">All Categories</option>
            <option value="Full fund">Full fund</option>
            <option value="Partial fund">Partial fund</option>
          </select>

          <select value={degree} onChange={(e) => setDegree(e.target.value)} className={filterClass}>
            <option value="">All Degrees</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={filterClass}>
            <option value="">Sort By</option>
            <option value="nameAsc">Name: A-Z</option>
            <option value="rankAsc">Rank: Low-High</option>
            <option value="postDateDesc">Newest First</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="bg-primary text-white font-bold px-6 py-2 rounded-lg hover:bg-primary/90 transition shadow-md shadow-primary/20 active:scale-95"
        >
          Search
        </button>
      </div>

      {/* Scholarship Cards */}
      {isLoading ? (
        <Loading />
      ) : data?.data?.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 dark:text-gray-400">No scholarships found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.data.map((scholar) => (
              <SingleTopUniversity key={scholar._id} scholar={scholar} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-12 gap-4 pb-10">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-5 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-xl disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow-sm font-semibold"
            >
              Previous
            </button>
            
            <span className="text-sm font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-5 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-xl disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow-sm font-semibold"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllScholarShip;