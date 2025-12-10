import React, { useEffect, useState } from "react";
// axios is imported, but we'll use axiosSecure
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Define the primary color (assuming Tailwind is configured with 'primary: #35AC86')
const PRIMARY_COLOR = "#35AC86"; 
const PRIMARY_COLOR_LIGHT = "rgba(53, 172, 134, 0.5)"; // Lighter/transparent version for charts

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFees: 0,
    totalScholarships: 0,
    applicationsByUniversity: {},
    applicationsByCategory: {},
  });

  const fetchStats = async () => {
    try {
      // Fetching logic using axiosSecure (as previously fixed)

      // 1. Get users
      const usersRes = await axiosSecure.get("/users");
      const users = Array.isArray(usersRes.data?.data) ? usersRes.data.data : usersRes.data;
      const totalUsers = Array.isArray(users) ? users.length : 0;

      // 2. Get scholarships
      const scholarshipsRes = await axiosSecure.get("/scholarshipUniversity"); 
      const totalScholarships = Array.isArray(scholarshipsRes.data)
        ? scholarshipsRes.data.length
        : 0;

      // 3. Get applications
      const applicationsRes = await axiosSecure.get("/application");
      const applications = Array.isArray(applicationsRes.data?.data)
        ? applicationsRes.data.data
        : [];

      let totalFees = 0;
      const applicationsByUniversityMap = {};
      const applicationsByCategoryMap = {};

      applications.forEach((app) => {
        totalFees += (Number(app.applicationFees) || 0) + (Number(app.serviceCharge) || 0);

        applicationsByUniversityMap[app.universityName] =
          (applicationsByUniversityMap[app.universityName] || 0) + 1;

        applicationsByCategoryMap[app.scholarshipCategory] =
          (applicationsByCategoryMap[app.scholarshipCategory] || 0) + 1;
      });

      setStats({
        totalUsers,
        totalFees,
        totalScholarships,
        applicationsByUniversity: applicationsByUniversityMap,
        applicationsByCategory: applicationsByCategoryMap,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [axiosSecure]);

  // Prepare data for charts
  const universityLabels = Object.keys(stats.applicationsByUniversity);
  const universityCounts = Object.values(stats.applicationsByUniversity);

  const categoryLabels = Object.keys(stats.applicationsByCategory);
  const categoryCounts = Object.values(stats.applicationsByCategory);
  
  // Custom colors for Pie chart for visual distinction
  const pieChartColors = [
    PRIMARY_COLOR_LIGHT, // Primary color light
    "rgba(255, 159, 64, 0.5)", // Orange
    "rgba(153, 102, 255, 0.5)", // Purple
    "rgba(54, 162, 235, 0.5)", // Blue
    "rgba(201, 203, 207, 0.5)", // Gray
  ];

  // ===================================
  //            MODERN LAYOUT
  // ===================================

  const StatCard = ({ title, value, color }) => (
    <div 
      className={`bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center transition-all duration-300 hover:shadow-xl border-t-4 border-${color} min-h-[140px]`}
    >
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{title}</h2>
      <p className={`text-4xl font-extrabold text-${color}`}>{value}</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 border-b pb-2">Admin Overview</h1>

      {/* Stat Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Users" value={stats.totalUsers} color="primary" />
        
        {/* Adjusted to display currency properly */}
        <StatCard 
          title="Total Fees Collected" 
          value={`$${stats.totalFees.toFixed(2)}`} 
          color="green-600" 
        />
        
        <StatCard title="Total Scholarships" value={stats.totalScholarships} color="indigo-600" />
      </div>
      

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Bar Chart: Applications per University */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Applications per University</h3>
          <div className="h-96">
            <Bar
              data={{
                labels: universityLabels,
                datasets: [
                  {
                    label: "Applications Count",
                    data: universityCounts,
                    // Apply primary color
                    backgroundColor: PRIMARY_COLOR_LIGHT, 
                    borderColor: PRIMARY_COLOR,
                    borderWidth: 1,
                    borderRadius: 4,
                  },
                ],
              }}
              options={{ 
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { mode: 'index' }
                },
                scales: {
                    y: { beginAtZero: true }
                }
              }}
            />
          </div>
        </div>

        {/* Pie Chart: Applications per Category */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Applications per Category</h3>
          <div className="flex justify-center items-center h-96">
            <Pie
              data={{
                labels: categoryLabels,
                datasets: [
                  {
                    label: "Applications",
                    data: categoryCounts,
                    // Use custom color array based on primary color
                    backgroundColor: pieChartColors, 
                    borderColor: '#ffffff',
                    borderWidth: 2,
                  },
                ],
              }}
              options={{ 
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { boxWidth: 15 } },
                    tooltip: { mode: 'index' }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;