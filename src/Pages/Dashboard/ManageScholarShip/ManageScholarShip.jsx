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
  const [uploading, setUploading] = useState(false);
  const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

  // Dark mode detection helper
  const isDarkMode = () => document.documentElement.classList.contains("dark");

  const { data: scholarships = [], refetch } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allScholarships");
      return res.data;
    },
  });

  const handleEdit = (scholarship) => {
    setCurrentScholarship(scholarship);
    setFormData({ ...scholarship });
    setModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const { _id, ...rest } = formData;
      const cleanedData = {
        ...rest,
        ...(formData.applicationDeadline ? { applicationDeadline: new Date(formData.applicationDeadline) } : {}),
      };

      await axiosSecure.patch(`/managesholarship/${_id}`, cleanedData);
      
      Swal.fire({
        title: "Updated!",
        text: "Scholarship updated successfully.",
        icon: "success",
        background: isDarkMode() ? "#111827" : "#fff",
        color: isDarkMode() ? "#fff" : "#000",
        confirmButtonColor: PRIMARY_COLOR,
      });

      setModalOpen(false);
      refetch();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update scholarship.",
        icon: "error",
        background: isDarkMode() ? "#111827" : "#fff",
        color: isDarkMode() ? "#fff" : "#000",
      });
    }
  };

  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This scholarship will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: PRIMARY_COLOR,
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Delete",
      background: isDarkMode() ? "#111827" : "#fff",
      color: isDarkMode() ? "#fff" : "#000",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/managescholarshipdelete/${_id}`);
      Swal.fire({
        title: "Deleted!",
        text: "Scholarship has been removed.",
        icon: "success",
        background: isDarkMode() ? "#111827" : "#fff",
        color: isDarkMode() ? "#fff" : "#000",
      });
      refetch();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete scholarship.",
        icon: "error",
        background: isDarkMode() ? "#111827" : "#fff",
        color: isDarkMode() ? "#fff" : "#000",
      });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("image", file);

    try {
      setUploading(true);
      const res = await fetch(image_API_URL, { method: "POST", body: form });
      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, universityImage: data.data.url }));
        Swal.fire({
          title: "Success!",
          text: "Image uploaded successfully!",
          icon: "success",
          background: isDarkMode() ? "#111827" : "#fff",
          color: isDarkMode() ? "#fff" : "#000",
          confirmButtonColor: PRIMARY_COLOR,
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Image upload failed!",
        icon: "error",
        background: isDarkMode() ? "#111827" : "#fff",
        color: isDarkMode() ? "#fff" : "#000",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white transition-colors">
        Manage <span style={{ color: PRIMARY_COLOR }}>Scholarships</span>
      </h2>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-xl border border-transparent dark:border-gray-800 transition-colors">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {["#", "Scholarship", "University", "Country", "City", "Actions"].map((head) => (
                <th key={head} className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {scholarships.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-400 dark:text-gray-500">No scholarships found.</td>
              </tr>
            ) : (
              scholarships.map((sch, index) => (
                <tr key={sch._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4 dark:text-gray-400">{index + 1}</td>
                  <td className="px-6 py-4 font-medium dark:text-gray-200">{sch.scholarshipName}</td>
                  <td className="px-6 py-4 dark:text-gray-400">{sch.universityName}</td>
                  <td className="px-6 py-4 dark:text-gray-400">{sch.universityCountry}</td>
                  <td className="px-6 py-4 dark:text-gray-400">{sch.universityCity}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => handleEdit(sch)} className="px-3 py-1 rounded text-white shadow-sm hover:opacity-90 transition" style={{ backgroundColor: PRIMARY_COLOR }}>Edit</button>
                    <button onClick={() => handleDelete(sch._id)} className="px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600 shadow-sm transition">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Section */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-3xl shadow-2xl overflow-y-auto max-h-[90vh] animate-fade-in border border-transparent dark:border-gray-800">
            <h3 className="text-xl font-bold mb-6 text-center" style={{ color: PRIMARY_COLOR }}>Edit Scholarship Details</h3>

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
              ].map((field) => (
                <div key={field.key} className="flex flex-col">
                  <label className="text-gray-600 dark:text-gray-400 mb-1 text-sm font-medium">{field.label}</label>
                  <input
                    type={field.type}
                    className="border dark:border-gray-700 dark:bg-gray-800 dark:text-white p-2 rounded-lg outline-none focus:ring-2 focus:ring-green-400 [color-scheme:dark]"
                    value={field.type === "date" ? (formData[field.key] ? new Date(formData[field.key]).toISOString().slice(0, 10) : "") : formData[field.key] || ""}
                    onChange={(e) => setFormData({ ...formData, [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value })}
                  />
                </div>
              ))}

              <div className="flex flex-col md:col-span-2 mt-2">
                <label className="text-gray-600 dark:text-gray-400 mb-1 text-sm font-medium">University Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 p-2 rounded-lg text-sm" />
                {uploading && <span className="text-xs text-yellow-500 mt-1 animate-pulse font-medium">Processing Image...</span>}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button onClick={() => setModalOpen(false)} className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition">Cancel</button>
              <button onClick={handleUpdate} className="px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 shadow-md transition" style={{ backgroundColor: PRIMARY_COLOR }}>Update Scholarship</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarShip;