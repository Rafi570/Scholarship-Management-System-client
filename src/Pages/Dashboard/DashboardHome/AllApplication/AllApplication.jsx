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
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        All <span style={{ color: PRIMARY_COLOR }}>Applications</span>
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">
                #
              </th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">
                Name
              </th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">
                Email
              </th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">
                University
              </th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">
                Category
              </th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">
                Degree
              </th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">
                Status
              </th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-gray-700 font-medium">
                Applied On
              </th>
            </tr>
          </thead>

          <tbody>
            {apps.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-10 text-gray-400 text-lg"
                >
                  No applications available.
                </td>
              </tr>
            ) : (
              apps.map((app, index) => (
                <tr
                  key={app._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4 text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 text-gray-800">{app.userName}</td>
                  <td className="px-6 py-4 text-gray-800">{app.userEmail}</td>
                  <td className="px-6 py-4 text-gray-800">
                    {app.universityName}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {app.scholarshipCategory}
                  </td>
                  <td className="px-6 py-4 text-gray-800">{app.degree}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`font-semibold ${
                        app.applicationStatus === "approved"
                          ? "text-green-600"
                          : app.applicationStatus === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {app.applicationStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`font-semibold ${
                        app.paymentStatus === "paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {app.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-800">
                    {new Date(app.applicationDate).toLocaleDateString()}
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
