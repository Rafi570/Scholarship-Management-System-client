import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

const PRIMARY_COLOR = "#35AC86";

const AddScholarShip = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    universityImage: "",
    universityCountry: "",
    universityCity: "",
    universityWorldRank: "",
    subjectCategory: "",
    scholarshipCategory: "",
    degree: "",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    applicationDeadline: "",
  });

  const [uploading, setUploading] = useState(false);

  // Helper function to check dark mode
  const isDarkMode = () => document.documentElement.classList.contains("dark");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ========================= Upload Image =========================
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append("image", file);

    try {
      setUploading(true);
      const res = await fetch(image_API_URL, {
        method: "POST",
        body: formDataImg,
      });
      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          universityImage: data.data.url,
        }));
        Swal.fire({
          title: "Success!",
          text: "Image uploaded successfully!",
          icon: "success",
          background: isDarkMode() ? "#111827" : "#fff",
          color: isDarkMode() ? "#fff" : "#000",
          confirmButtonColor: PRIMARY_COLOR,
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Image upload failed!",
          icon: "error",
          background: isDarkMode() ? "#111827" : "#fff",
          color: isDarkMode() ? "#fff" : "#000",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong during upload!",
        icon: "error",
        background: isDarkMode() ? "#111827" : "#fff",
        color: isDarkMode() ? "#fff" : "#000",
      });
    } finally {
      setUploading(false);
    }
  };

  // ========================= Submit Form =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tuitionFees: Number(formData.tuitionFees) || 0,
      applicationFees: Number(formData.applicationFees) || 0,
      serviceCharge: Number(formData.serviceCharge) || 0,
      universityWorldRank: Number(formData.universityWorldRank) || 0,
      postedUserEmail: user?.email,
      scholarshipPostDate: new Date(),
    };

    try {
      const res = await axios.post("/scholarship", payload);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Scholarship Added Successfully!",
          icon: "success",
          background: isDarkMode() ? "#111827" : "#fff",
          color: isDarkMode() ? "#fff" : "#000",
          confirmButtonColor: PRIMARY_COLOR,
        });
        e.target.reset();
        setFormData((prev) => ({ ...prev, universityImage: "" }));
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while saving!",
        icon: "error",
        background: isDarkMode() ? "#111827" : "#fff",
        color: isDarkMode() ? "#fff" : "#000",
      });
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        Add <span style={{ color: PRIMARY_COLOR }}>Scholarship</span>
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 space-y-5 transition-all"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* Inputs - Added dark: classes to override or complement .input-field */}
          <input
            required
            name="scholarshipName"
            type="text"
            placeholder="Scholarship Name"
            className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
            onChange={handleChange}
          />
          <input
            required
            name="universityName"
            type="text"
            placeholder="University Name"
            className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
            onChange={handleChange}
          />

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 dark:text-gray-400 text-sm font-medium">University Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 p-2 rounded-lg text-sm"
            />
            {uploading && <span className="text-sm text-yellow-600 mt-1 animate-pulse">Uploading...</span>}
            {formData.universityImage && (
              <div className="relative mt-2 w-24 h-16">
                <img
                  src={formData.universityImage}
                  alt="University Preview"
                  className="h-full w-full object-cover rounded-lg shadow-md border-2"
                  style={{ borderColor: PRIMARY_COLOR }}
                />
              </div>
            )}
          </div>

          <input
            required
            name="universityCountry"
            type="text"
            placeholder="Country"
            className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            onChange={handleChange}
          />
          <input
            required
            name="universityCity"
            type="text"
            placeholder="City"
            className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            onChange={handleChange}
          />
          <input
            name="universityWorldRank"
            type="number"
            placeholder="World Rank (optional)"
            className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            onChange={handleChange}
          />

          {/* Selects */}
          <select
            required
            name="subjectCategory"
            className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            onChange={handleChange}
          >
            <option value="">Select Subject Category</option>
            <option value="All Subjects">All Subjects</option>
            <option value="Engineering">Engineering</option>
            <option value="Business">Business</option>
            <option value="Medical">Medical</option>
            <option value="Humanities">Humanities</option>
          </select>

          <select
            required
            name="scholarshipCategory"
            className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            onChange={handleChange}
          >
            <option value="">Select Scholarship Category</option>
            <option value="Full fund">Full Fund</option>
            <option value="Partial fund">Partial Fund</option>
          </select>

          <select
            required
            name="degree"
            className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            onChange={handleChange}
          >
            <option value="">Select Degree</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
            <option value="Bachelor, Masters, PhD">Bachelor, Masters, PhD</option>
          </select>

          <input
            name="tuitionFees"
            type="number"
            placeholder="Tuition Fees (optional)"
            className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            onChange={handleChange}
          />
          <input
            name="applicationFees"
            type="number"
            placeholder="Application Fees (optional)"
            className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            onChange={handleChange}
          />
          <input
            name="serviceCharge"
            type="number"
            placeholder="Service Charge (optional)"
            className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            onChange={handleChange}
          />
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 dark:text-gray-400 text-sm font-medium">Application Deadline</label>
            <input
              required
              name="applicationDeadline"
              type="date"
              className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-white [color-scheme:dark]"
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all shadow-lg transform active:scale-[0.98]"
          style={{ backgroundColor: PRIMARY_COLOR }}
        >
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarShip;