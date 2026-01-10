import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FiCalendar, FiGlobe, FiDollarSign, FiAward, FiClock } from "react-icons/fi";

const PRIMARY_COLOR = "#35AC86";

const DetailsUniverScholarship = () => {
  const { _id } = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState("");

  const { data: scholarship = {}, isLoading } = useQuery({
    queryKey: ["scholarship", _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${_id}`);
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/review?scholarshipId=${_id}`);
      return res.data;
    },
  });

  const handleApply = async () => {
    if (!user) return toast.error("Please login to apply");
    
    // Redirecting to a checkout or application form is usually better, 
    // but keeping your logic of direct post here:
    const applicationData = {
      scholarshipId: scholarship._id,
      userId: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      universityName: scholarship.universityName,
      scholarshipName: scholarship.scholarshipName,
      scholarshipCategory: scholarship.scholarshipCategory || "",
      degree: scholarship.degree || "",
      applicationFees: Number(scholarship.applicationFees) || 0,
      serviceCharge: Number(scholarship.serviceCharge) || 0,
      applicationStatus: "pending",
      paymentStatus: "unpaid",
      applicationDate: new Date(),
      feedback: "",
    };

    try {
      const res = await axiosSecure.post("/application", applicationData);
      if (res.data.success) {
        toast.success("Application submitted successfully 🎉");
        navigate('/dashboard/my-applicatioin');
      }
    } catch (err) {
      toast.error("Failed to submit application.");
    }
  };

  useEffect(() => {
    if (!scholarship.applicationDeadline) return;
    const interval = setInterval(() => {
      const diff = new Date(scholarship.applicationDeadline) - new Date();
      if (diff <= 0) {
        setTimeLeft("Deadline Passed");
        clearInterval(interval);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    }, 1000);
    return () => clearInterval(interval);
  }, [scholarship.applicationDeadline]);

  if (isLoading) return <Loading />;

  const isApplicationOpen = scholarship.applicationDeadline && new Date(scholarship.applicationDeadline) >= new Date();

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#030712] py-12 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* HERO SECTION */}
        <div className="relative bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden mb-12 border border-gray-100 dark:border-gray-800">
          <div className="grid lg:grid-cols-2">
            
            {/* Image Side */}
            <div className="relative h-[400px] lg:h-auto group">
              <img
                src={scholarship.universityImage}
                alt={scholarship.universityName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="px-4 py-1.5 bg-emerald-500 text-white text-xs font-black uppercase tracking-widest rounded-full mb-4 inline-block">
                  {scholarship.scholarshipCategory}
                </span>
                <h1 className="text-4xl md:text-5xl font-black leading-tight">
                  {scholarship.scholarshipName}
                </h1>
                <div className="flex items-center gap-2 mt-3 text-gray-200">
                  <FiGlobe className="text-emerald-400" />
                  <p className="text-lg font-medium">{scholarship.universityName}</p>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-14 flex flex-col justify-between bg-white dark:bg-gray-900">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="p-6 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30">
                  <div className="flex items-center gap-3 mb-2 text-blue-600 dark:text-blue-400">
                    <FiAward size={20} />
                    <span className="text-xs font-black uppercase tracking-widest">World Rank</span>
                  </div>
                  <p className="text-3xl font-black text-gray-800 dark:text-white">#{scholarship.universityWorldRank || "N/A"}</p>
                </div>

                <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30">
                  <div className="flex items-center gap-3 mb-2 text-emerald-600 dark:text-emerald-400">
                    <FiDollarSign size={20} />
                    <span className="text-xs font-black uppercase tracking-widest">Application Fee</span>
                  </div>
                  <p className="text-3xl font-black text-gray-800 dark:text-white">${scholarship.applicationFees || 0}</p>
                </div>
              </div>

              <div className="space-y-5 mb-10">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                   <div className="flex items-center gap-3 text-gray-500">
                      <FiCalendar />
                      <span className="font-bold text-sm uppercase">Deadline</span>
                   </div>
                   <span className="font-black text-red-500">
                     {new Date(scholarship.applicationDeadline).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                   </span>
                </div>
                
                {isApplicationOpen && (
                  <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/20">
                    <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                        <FiClock className="animate-pulse" />
                        <span className="font-bold text-sm uppercase">Time Remaining</span>
                    </div>
                    <span className="font-black text-emerald-700 dark:text-emerald-400">{timeLeft}</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleApply}
                disabled={!isApplicationOpen}
                className={`group relative w-full py-5 rounded-[1.5rem] font-black text-xl uppercase tracking-widest overflow-hidden transition-all shadow-xl active:scale-95 ${
                  isApplicationOpen 
                  ? "bg-[#35AC86] text-white hover:shadow-emerald-500/20" 
                  : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                }`}
              >
                <span className="relative z-10">{isApplicationOpen ? "Apply Now" : "Admission Closed"}</span>
                {isApplicationOpen && <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>}
              </button>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl p-8 lg:p-14 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-10 w-2 bg-emerald-500 rounded-full"></div>
            <h2 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">Student Reviews</h2>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/30 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
              <p className="text-gray-400 text-lg font-medium">No reviews yet — be the first to share your experience!</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-3xl border border-gray-100 dark:border-gray-800">
              <table className="min-w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {["Student", "Rating", "Review", "Date"].map((h) => (
                      <th key={h} className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {reviews.map((review) => (
                    <tr key={review._id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <img src={review.userPhoto || "/default-avatar.png"} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/20 shadow-sm" alt="User" />
                          <span className="font-bold text-gray-800 dark:text-gray-100">{review.userName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < review.rating ? "opacity-100" : "opacity-20"}>★</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-gray-600 dark:text-gray-400 text-sm max-w-md">{review.reviewText}</td>
                      <td className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-tighter">
                        {new Date(review.postedAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsUniverScholarship;