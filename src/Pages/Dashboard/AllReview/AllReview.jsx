import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PRIMARY_COLOR = "#35AC86";

const AllReview = () => {
  const axiosSecure = useAxiosSecure();

  // FETCH ALL REVIEW
  const { data: reviews = [], isLoading, refetch } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/review/role/modaretor");
      return res.data;
    },
  });

  // DELETE HANDLER
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: PRIMARY_COLOR,
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/role/modaretor/${id}`);
          Swal.fire("Deleted!", "Review has been deleted.", "success");
          refetch();
        } catch (error) {
          // console.log(error);
          Swal.fire("Error!", "Failed to delete review.", "error");
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        All <span style={{ color: PRIMARY_COLOR }}>Reviews</span>
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">#</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">User Name</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">University</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Review</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Rating</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Posted At</th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-400 text-lg"
                >
                  No reviews available.
                </td>
              </tr>
            ) : (
              reviews.map((review, index) => (
                <tr
                  key={review._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-800">{review.userName}</td>
                  <td className="px-6 py-4 text-gray-800">{review.universityName}</td>
                  <td className="px-6 py-4 text-gray-800">{review.reviewText}</td>
                  <td className="px-6 py-4 text-gray-800">{review.rating}</td>
                  <td className="px-6 py-4 text-gray-800">
                    {new Date(review.postedAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="px-3 py-1 text-sm rounded shadow text-white bg-red-500 hover:bg-red-600 transition transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReview;
