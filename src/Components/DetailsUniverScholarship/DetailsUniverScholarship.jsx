import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const DetailsUniverScholarship = () => {
  const { _id } = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  const { data: scholarship = {}, isLoading } = useQuery({
    queryKey: ["scholarship", _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${_id}`);
      return res.data;
    },
  });

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/review?scholarshipId=${_id}`);
      return res.data;
    },
  });

  const handleApply = () => {
    toast.success("Application feature coming soon!");
  };

  const handlePostReview = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Login to post review");

    const reviewData = {
      scholarshipId: _id,
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL || "",
      universityName: scholarship.universityName,
      scholarshipName: scholarship.scholarshipName,
      rating: Number(rating),
      reviewText,
      postedAt: new Date(),
    };

    try {
      await axiosSecure.post("/review", reviewData);
      toast.success("Review posted successfully!");
      setReviewText("");
      setRating(5);
      refetch();
    } catch (err) {
      toast.error("Failed to post review");
    }
  };

  const StarRating = ({ rating }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </span>
      ))}
      <span className="ml-2 font-medium text-gray-700">{rating}.0</span>
    </div>
  );

  // Countdown logic
  useEffect(() => {
    if (!scholarship.applicationDeadline) return;

    const interval = setInterval(() => {
      const deadline = new Date(scholarship.applicationDeadline);
      const now = new Date();
      const diff = deadline - now;

      if (diff <= 0) {
        setTimeLeft("Deadline Passed");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [scholarship.applicationDeadline]);

  if (isLoading) return <Loading />;

  const isApplicationOpen =
    scholarship.applicationDeadline &&
    new Date(scholarship.applicationDeadline) >= new Date();

  return (
    <div className="min-h-screen bg-white/70 backdrop-blur-md py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white/90 rounded-3xl shadow-xl overflow-hidden mb-12 border border-gray-200">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-96 lg:h-full">
              <img
                src={scholarship.universityImage}
                alt={scholarship.universityName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
                  {scholarship.scholarshipName}
                </h1>
                <p className="text-xl md:text-2xl font-medium mt-2 opacity-95">
                  {scholarship.universityName}
                </p>
                <p className="text-lg opacity-90">
                  {scholarship.universityCity}, {scholarship.universityCountry}
                </p>
              </div>
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 p-5 rounded-2xl text-center">
                    <p className="text-gray-600 text-sm">World Rank</p>
                    <p className="text-3xl font-bold text-blue-600">
                      #{scholarship.universityWorldRank || "N/A"}
                    </p>
                  </div>
                  <div className="bg-green-50 p-5 rounded-2xl text-center">
                    <p className="text-gray-600 text-sm">Application Fee</p>
                    <p className="text-3xl font-bold text-green-600">
                      ${scholarship.applicationFees || 0}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-gray-700">
                  <div className="flex justify-between py-3 border-b">
                    <span className="font-medium">Deadline</span>
                    <span className="font-bold text-red-600">
                      {new Date(scholarship.applicationDeadline).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  {scholarship.stipend && (
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-200">
                      <p className="font-bold text-emerald-800">Scholarship Coverage</p>
                      <p className="text-emerald-700 mt-1">{scholarship.stipend}</p>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-4">About this Scholarship</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {scholarship.scholarshipDescription || "No description available."}
                  </p>
                </div>
              </div>

              {/* Apply Button with Countdown */}
              <div className="mt-10 flex flex-col gap-3 items-start sm:items-center">
                <button
                  onClick={handleApply}
                  disabled={!isApplicationOpen}
                  title={!isApplicationOpen ? "Application deadline has passed" : ""}
                  className={`w-full text-white font-bold text-xl py-5 rounded-2xl shadow-lg transform transition duration-300 ${
                    isApplicationOpen
                      ? "bg-[#35AC86] hover:bg-[#2e9974] cursor-pointer hover:scale-105"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isApplicationOpen ? "Apply for Scholarship" : "Deadline Passed"}
                </button>
                {isApplicationOpen && (
                  <span className="text-gray-700 font-medium mt-1 text-sm">
                    Time left: {timeLeft}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white/90 rounded-3xl shadow-xl p-6 lg:p-12 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Student Reviews</h2>

          {/* Modern Post Review Section */}
          {user ? (
            <div className="bg-[#E0F5EE] p-5 rounded-2xl border mb-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt={user.displayName}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full ring-2 ring-white shadow-md"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{user.displayName}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <form onSubmit={handlePostReview} className="flex flex-col gap-3">
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#35AC86] transition resize-none"
                  rows="4"
                  required
                />

                <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-300 rounded-xl text-lg focus:border-[#35AC86] focus:outline-none"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {r} Star{r < 5 ? "s" : ""}
                      </option>
                    ))}
                  </select>

                  <button
                    type="submit"
                    className="bg-[#35AC86] hover:bg-[#2e9974] text-white font-bold px-6 py-2 rounded-xl shadow-md transition transform hover:scale-105 w-full sm:w-auto"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-2xl mb-8">
              <p className="text-lg text-gray-600">Please log in to write a review</p>
            </div>
          )}

          {/* Reviews List (responsive cards for mobile) */}
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={review.userPhoto || "/default-avatar.png"}
                      alt={review.userName}
                      className="w-12 h-12 rounded-full ring-2 ring-white shadow"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{review.userName}</p>
                      <p className="text-sm text-gray-500">{review.universityName}</p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="text-gray-700 mt-2">{review.reviewText}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(review.postedAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsUniverScholarship;
