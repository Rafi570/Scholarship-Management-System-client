import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";

const PRIMARY_COLOR = "#35AC86";

const AllApplication = () => {
  const axiosSecure = useAxiosSecure();

  const { data: apps = [], isLoading } = useQuery({
    queryKey: ["allApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/application");
      return res.data.data || [];
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
        All <span style={{ color: PRIMARY_COLOR }}>Applications</span>
      </h2>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-lg border border-transparent dark:border-gray-800">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {[
                "#",
                "Name",
                "Email",
                "University",
                "Category",
                "Degree",
                "Status",
                "Payment",
                "Applied On",
              ].map((head) => (
                <th
                  key={head}
                  className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-medium"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {apps.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-10 text-gray-400 dark:text-gray-500 text-lg"
                >
                  No applications available.
                </td>
              </tr>
            ) : (
              apps.map((app, index) => (
                <tr
                  key={app._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition duration-150"
                >
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200 font-medium">
                    {app.userName}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-400">
                    {app.userEmail}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-300">
                    {app.universityName}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-400 text-sm">
                    {app.scholarshipCategory}
                  </td>
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-400 text-sm">
                    {app.degree}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`font-semibold capitalize ${
                        app.applicationStatus === "approved"
                          ? "text-green-600 dark:text-green-500"
                          : app.applicationStatus === "rejected" ||
                            app.applicationStatus === "cancel"
                          ? "text-red-600 dark:text-red-500"
                          : "text-yellow-600 dark:text-yellow-500"
                      }`}
                    >
                      {app.applicationStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`font-semibold ${
                        app.paymentStatus === "paid"
                          ? "text-green-600 dark:text-green-500"
                          : "text-red-600 dark:text-red-500"
                      }`}
                    >
                      {app.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-800 dark:text-gray-400 text-sm">
                    {app.applicationDate
                      ? new Date(app.applicationDate).toLocaleDateString()
                      : "N/A"}
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

export default AllApplication;