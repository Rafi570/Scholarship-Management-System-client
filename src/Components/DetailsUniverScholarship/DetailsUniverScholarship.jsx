import React, { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const DetailsUniverScholarship = () => {
  const { _id } = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
   const navigate = useNavigate();

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

  const handleApply = async () => {
    if (!user) return toast.error("Please login to apply");

    if (!scholarship || !scholarship._id) {
      return toast.error("Scholarship not found");
    }

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
      applicationStatus: "pending", // default
      paymentStatus: "unpaid", // default
      applicationDate: new Date(),
      feedback: "", // empty initially
    };

    try {
      const res = await axiosSecure.post("/application", applicationData);
      if (res.data.success) {
        toast.success("Application submitted successfully 🎉");
        navigate('/dashboard/my-applicatioin')
      } else {
        toast.error(res.data.message || "Failed to submit application");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error! Failed to submit application.");
    }
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
      toast.success("Your review has been posted 🎉");
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
          className={`text-lg ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
      <span className="ml-2 font-medium text-gray-700">{rating}.0</span>
    </div>
  );

  // Countdown
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
        {/* HERO */}
        <div className="bg-white/90 rounded-3xl shadow-xl overflow-hidden mb-12 border border-gray-200">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-96 lg:h-full">
              <img
                src={scholarship.universityImage}
                alt={scholarship.universityName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
                  {scholarship.scholarshipName}
                </h1>
                <p className="text-xl md:text-2xl font-medium mt-2 opacity-95">
                  {scholarship.universityName}
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
                      {new Date(
                        scholarship.applicationDeadline
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* APPLY BUTTON */}
              <div className="mt-10 flex flex-col gap-3 items-start sm:items-center">
                <button
                  onClick={handleApply}
                  disabled={!isApplicationOpen}
                  className={`w-full text-white font-bold text-xl py-5 rounded-2xl shadow-lg transition ${
                    isApplicationOpen
                      ? "bg-[#35AC86] hover:bg-[#2e9974]"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isApplicationOpen
                    ? "Apply for Scholarship"
                    : "Deadline Passed"}
                </button>
                {isApplicationOpen && (
                  <p className="text-gray-700 font-medium text-sm">
                    Time left: {timeLeft}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white/90 rounded-3xl shadow-xl p-6 lg:p-12 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Student Reviews
          </h2>

          {/* POST REVIEW */}
          {user ? (
            <div className="bg-[#E0F5EE] p-6 rounded-2xl mb-8 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt={user.displayName}
                  className="w-14 h-14 rounded-full shadow"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {user.displayName}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <form onSubmit={handlePostReview} className="flex flex-col gap-4">
                <div className="relative">
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full p-4 pt-6 border-2 border-gray-200 rounded-xl shadow-sm focus:border-[#35AC86] outline-none"
                    rows="4"
                    required
                  />
                  <label className="absolute top-2 left-4 text-gray-500 text-sm">
                    Write your experience...
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-300 rounded-xl text-lg focus:border-[#35AC86] outline-none"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {r} Star{r < 5 ? "s" : ""}
                      </option>
                    ))}
                  </select>

                  <button
                    type="submit"
                    className="bg-[#35AC86] hover:bg-[#2e9974] text-white font-bold px-6 py-2 rounded-xl shadow-md w-full sm:w-auto"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-2xl mb-8">
              <p className="text-lg text-gray-600">
                Please log in to write a review
              </p>
            </div>
          )}

          {/* REVIEW TABLE */}
          {reviews.length === 0 ? (
            <p className="text-center text-gray-500 py-10 text-lg">
              No reviews yet — be the first!
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border">
              <table className="min-w-full text-left text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Student</th>
                    <th className="px-4 py-3 font-semibold">Rating</th>
                    <th className="px-4 py-3 font-semibold">Review</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review._id} className="border-t">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <img
                          src={review.userPhoto || "/default-avatar.png"}
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="font-medium">{review.userName}</span>
                      </td>

                      <td className="px-4 py-3">
                        <StarRating rating={review.rating} />
                      </td>

                      <td className="px-4 py-3">{review.reviewText}</td>

                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(review.postedAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
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
