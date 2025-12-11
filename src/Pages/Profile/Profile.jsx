// pages/Profile.jsx
import React from "react";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl text-center font-bold mb-6 text-gray-800">My <span className="text-primary">Profile</span></h2>

      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 border border-gray-200">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={user?.photoURL || "https://via.placeholder.com/120"}
            alt={user?.displayName || "User Avatar"}
            className="w-32 h-32 rounded-full border-4 border-[#35AC86] object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 flex flex-col gap-3">
          <h3 className="text-xl font-bold text-gray-900">
            {user?.displayName || "Anonymous User"}
          </h3>

          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {user?.email || "N/A"}
          </p>

          {user?.role && (
            <p className="text-gray-600">
              <span className="font-semibold">Role:</span> {user.role}
            </p>
          )}

          {/* Optional details */}
          <p className="text-gray-600">
            <span className="font-semibold">Joined:</span>{" "}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"}
          </p>

        </div>
      </div>
    </div>
  );
};

export default Profile;
