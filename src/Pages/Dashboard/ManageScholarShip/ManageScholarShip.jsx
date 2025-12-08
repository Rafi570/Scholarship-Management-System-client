import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PRIMARY_COLOR = "#35AC86";

const ManageScholarShip = () => {
  const axiosSecure = useAxiosSecure();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentScholarship, setCurrentScholarship] = useState(null);
  const [formData, setFormData] = useState({});

  // ================================
  // 🔥 Fetch Scholarships
  // ================================
  const { data: scholarships = [], refetch } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarshipUniversity");
      return res.data;
    },
  });

  // ================================
  // 🟢 Open Edit Modal
  // ================================
  const handleEdit = (scholarship) => {
    setCurrentScholarship(scholarship);
    setFormData({ ...scholarship });
    setModalOpen(true);
  };

  // ================================
  // 🟢 Update Scholarship
  // ================================
  const handleUpdate = async () => {
    try {
      const { _id, ...rest } = formData;

      // Convert date fields to proper format
      const cleanedData = {
        ...rest,
        ...(formData.applicationDeadline
          ? { applicationDeadline: new Date(formData.applicationDeadline) }
          : {}),
        ...(formData.scholarshipPostDate
          ? { scholarshipPostDate: new Date(formData.scholarshipPostDate) }
          : {}),
      };

      await axiosSecure.patch(`/managesholarship/${_id}`, cleanedData);
      Swal.fire("Updated!", "Scholarship updated successfully.", "success");
      setModalOpen(false);
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to update scholarship.", "error");
    }
  };

  // ================================
  // 🔴 Delete Scholarship
  // ================================
  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This scholarship will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: PRIMARY_COLOR,
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/managescholarshipdelete/${_id}`);
      Swal.fire("Deleted!", "Scholarship has been removed.", "success");
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to delete scholarship.", "error");
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Manage <span style={{ color: PRIMARY_COLOR }}>Scholarships</span>
      </h2>

      {/* ========================= Table: small data only ========================= */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                #
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Scholarship
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                University
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Country
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                City
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {scholarships.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-400 text-lg"
                >
                  No scholarships added yet.
                </td>
              </tr>
            ) : (
              scholarships.map((sch, index) => (
                <tr
                  key={sch._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{sch.scholarshipName}</td>
                  <td className="px-4 py-2">{sch.universityName}</td>
                  <td className="px-4 py-2">{sch.universityCountry}</td>
                  <td className="px-4 py-2">{sch.universityCity}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(sch)}
                      className="px-3 py-1 rounded text-white"
                      style={{ backgroundColor: PRIMARY_COLOR }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sch._id)}
                      className="px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600"
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

      {/* ========================= Modal: full data ========================= */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-2xl overflow-y-auto max-h-[90vh] animate-fade-in">
            <h3
              className="text-xl font-bold mb-4 text-center"
              style={{ color: PRIMARY_COLOR }}
            >
              Edit Scholarship
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Scholarship Name", key: "scholarshipName", type: "text" },
                { label: "University Name", key: "universityName", type: "text" },
                { label: "University Country", key: "universityCountry", type: "text" },
                { label: "University City", key: "universityCity", type: "text" },
                { label: "World Rank", key: "universityWorldRank", type: "number" },
                { label: "Subject Category", key: "subjectCategory", type: "text" },
                { label: "Scholarship Category", key: "scholarshipCategory", type: "text" },
                { label: "Degree", key: "degree", type: "text" },
                { label: "Tuition Fees", key: "tuitionFees", type: "number" },
                { label: "Application Fees", key: "applicationFees", type: "number" },
                { label: "Service Charge", key: "serviceCharge", type: "number" },
                { label: "Application Deadline", key: "applicationDeadline", type: "date" },
                { label: "Posted By (Email)", key: "postedUserEmail", type: "text" },
              ].map((field) => (
                <div key={field.key} className="flex flex-col">
                  <label className="text-gray-600 mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    className="border p-2 rounded"
                    value={
                      field.type === "date"
                        ? formData[field.key]
                          ? new Date(formData[field.key]).toISOString().slice(0, 10)
                          : ""
                        : formData[field.key] || ""
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field.key]:
                          field.type === "number"
                            ? Number(e.target.value)
                            : e.target.value,
                      })
                    }
                  />
                </div>
              ))}

              <div className="flex flex-col md:col-span-2">
                <label className="text-gray-600 mb-1">University Image URL</label>
                <input
                  type="text"
                  className="border p-2 rounded"
                  value={formData.universityImage || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, universityImage: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded text-white"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarShip;
