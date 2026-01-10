import React from "react";
import useAuth from "../../hooks/useAuth";

const PRIMARY_COLOR = "#35AC86";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-transparent transition-colors duration-300">
      {/* Heading - dark:text-white added */}
      <h2 className="text-2xl text-center font-bold mb-6 text-gray-800 dark:text-white">
        My <span style={{ color: PRIMARY_COLOR }}>Profile</span>
      </h2>

      {/* Main Card - dark:bg-gray-900/80 and dark:border-gray-800 added */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 border border-gray-200 dark:border-gray-800 transition-all">
        
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={user?.photoURL || "https://via.placeholder.com/120"}
            alt={user?.displayName || "User Avatar"}
            className="w-32 h-32 rounded-full border-4 object-cover shadow-inner"
            style={{ borderColor: PRIMARY_COLOR }}
          />
        </div>

        {/* User Info */}
        <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
          {/* dark:text-white for name */}
          <h3 className="text-2xl font-black text-gray-900 dark:text-white">
            {user?.displayName || "Anonymous User"}
          </h3>

          {/* User Details - dark:text-gray-400 added */}
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-bold text-gray-800 dark:text-gray-200">Email:</span> {user?.email || "N/A"}
            </p>

            {user?.role && (
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-bold text-gray-800 dark:text-gray-200">Role:</span>{" "}
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-bold uppercase">
                  {user.role}
                </span>
              </p>
            )}

            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-bold text-gray-800 dark:text-gray-200">Joined:</span>{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;