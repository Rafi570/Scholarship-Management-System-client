import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

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
        Swal.fire("Success!", "Image uploaded successfully!", "success");
      } else {
        Swal.fire("Error!", "Image upload failed!", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Image upload failed!", "error");
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
        Swal.fire("Success!", "Scholarship Added Successfully!", "success");
        e.target.reset();
        setFormData((prev) => ({ ...prev, universityImage: "" }));
      }
    } catch (err) {
      Swal.fire("Error!", "Something went wrong!", "error");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Add <span className="text-primary">Scholarship</span>
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200 space-y-5"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            required
            name="scholarshipName"
            type="text"
            placeholder="Scholarship Name"
            className="input-field"
            onChange={handleChange}
          />
          <input
            required
            name="universityName"
            type="text"
            placeholder="University Name"
            className="input-field"
            onChange={handleChange}
          />

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">University Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border p-2 rounded"
            />
            {uploading && <span className="text-sm text-gray-500 mt-1">Uploading...</span>}
            {formData.universityImage && (
              <img
                src={formData.universityImage}
                alt="University"
                className="mt-2 h-20 w-auto rounded shadow"
              />
            )}
          </div>

          <input
            required
            name="universityCountry"
            type="text"
            placeholder="Country"
            className="input-field"
            onChange={handleChange}
          />
          <input
            required
            name="universityCity"
            type="text"
            placeholder="City"
            className="input-field"
            onChange={handleChange}
          />
          <input
            name="universityWorldRank"
            type="number"
            placeholder="World Rank (optional)"
            className="input-field"
            onChange={handleChange}
          />
          <select
            required
            name="subjectCategory"
            className="input-field"
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
            className="input-field"
            onChange={handleChange}
          >
            <option value="">Select Scholarship Category</option>
            <option value="Full fund">Full Fund</option>
            <option value="Partial fund">Partial Fund</option>
          </select>
          <select
            required
            name="degree"
            className="input-field"
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
            className="input-field"
            onChange={handleChange}
          />
          <input
            name="applicationFees"
            type="number"
            placeholder="Application Fees (optional)"
            className="input-field"
            onChange={handleChange}
          />
          <input
            name="serviceCharge"
            type="number"
            placeholder="Service Charge (optional)"
            className="input-field"
            onChange={handleChange}
          />
          <input
            required
            name="applicationDeadline"
            type="date"
            className="input-field"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition shadow-md"
        >
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarShip;
