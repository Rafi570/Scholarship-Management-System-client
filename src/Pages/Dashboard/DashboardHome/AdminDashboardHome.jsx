import React, { useEffect, useState } from "react";
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
  PointElement,
} from "chart.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiUsers, FiDollarSign, FiAward, FiPieChart, FiBarChart2 } from "react-icons/fi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement);

const PRIMARY_COLOR = "#35AC86";

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
      const [usersRes, scholarshipsRes, applicationsRes] = await Promise.all([
        axiosSecure.get("/users"),
        axiosSecure.get("/scholarshipUniversity"),
        axiosSecure.get("/application")
      ]);

      const users = usersRes.data?.data || usersRes.data || [];
      const scholarships = scholarshipsRes.data || [];
      const applications = applicationsRes.data?.data || [];

      let totalFees = 0;
      const universityMap = {};
      const categoryMap = {};

      applications.forEach((app) => {
        totalFees += (Number(app.applicationFees) || 0) + (Number(app.serviceCharge) || 0);
        universityMap[app.universityName] = (universityMap[app.universityName] || 0) + 1;
        categoryMap[app.scholarshipCategory] = (categoryMap[app.scholarshipCategory] || 0) + 1;
      });

      setStats({
        totalUsers: users.length,
        totalFees,
        totalScholarships: scholarships.length,
        applicationsByUniversity: universityMap,
        applicationsByCategory: categoryMap
      });
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };

  useEffect(() => { fetchStats(); }, [axiosSecure]);

  const isDark = document.documentElement.classList.contains('dark');

  // Modern Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: isDark ? '#9CA3AF' : '#6B7280',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { size: 12, weight: '600' }
        }
      },
      tooltip: {
        backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
        titleColor: isDark ? '#F3F4F6' : '#111827',
        bodyColor: isDark ? '#D1D5DB' : '#374151',
        borderColor: isDark ? '#374151' : '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: isDark ? '#6B7280' : '#9CA3AF', font: { size: 11 } },
        grid: { color: isDark ? 'rgba(75, 85, 99, 0.1)' : 'rgba(0,0,0,0.05)', drawBorder: false }
      },
      x: {
        ticks: { color: isDark ? '#6B7280' : '#9CA3AF', font: { size: 11 } },
        grid: { display: false }
      }
    }
  };

  const StatCard = ({ title, value, icon: Icon, gradient }) => (
    <div className={`relative overflow-hidden bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group`}>
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700 ${gradient}`}></div>
      <div className="flex items-center gap-5">
        <div className={`p-4 rounded-2xl ${gradient} text-white shadow-lg`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{title}</p>
          <h2 className="text-3xl font-black text-gray-800 dark:text-white mt-1">{value}</h2>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 md:p-10 bg-[#F9FAFB] dark:bg-[#030712] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Analytics</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">Monitoring university scholarship trends and user activity.</p>
        </div>
        <button 
           onClick={fetchStats}
           className="px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm transition-all active:scale-95">
          Refresh Data
        </button>
      </div>

      {/* Premium Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Users" value={stats.totalUsers} icon={FiUsers} gradient="bg-gradient-to-br from-blue-500 to-indigo-600" />
        <StatCard title="Revenue" value={`$${stats.totalFees.toLocaleString()}`} icon={FiDollarSign} gradient="bg-gradient-to-br from-emerald-400 to-teal-600" />
        <StatCard title="Scholarships" value={stats.totalScholarships} icon={FiAward} gradient="bg-gradient-to-br from-amber-400 to-orange-600" />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Bar Chart - 3 Columns wide */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-8">
            <FiBarChart2 className="text-emerald-500" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Distribution by University</h3>
          </div>
          <div className="h-[350px]">
            <Bar
              data={{
                labels: Object.keys(stats.applicationsByUniversity),
                datasets: [{ 
                  label: "Applications", 
                  data: Object.values(stats.applicationsByUniversity), 
                  backgroundColor: 'rgba(53, 172, 134, 0.85)', 
                  hoverBackgroundColor: PRIMARY_COLOR,
                  borderRadius: 12,
                  barThickness: 28,
                }]
              }}
              options={chartOptions}
            />
          </div>
        </div>

        {/* Pie Chart - 2 Columns wide */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-8">
            <FiPieChart className="text-amber-500" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Scholarship Categories</h3>
          </div>
          <div className="h-[350px] relative">
            <Pie
              data={{
                labels: Object.keys(stats.applicationsByCategory),
                datasets: [{ 
                    data: Object.values(stats.applicationsByCategory), 
                    backgroundColor: [PRIMARY_COLOR, "#6366F1", "#F59E0B", "#EF4444", "#8B5CF6"], 
                    borderWidth: 4,
                    borderColor: isDark ? "#111827" : "#FFFFFF",
                    hoverOffset: 15
                }]
              }}
              options={{ 
                responsive: true, 
                maintainAspectRatio: false, 
                plugins: { 
                    legend: { position: 'bottom', labels: { color: isDark ? '#9CA3AF' : '#4B5563', padding: 25, font: { size: 12, weight: '600' }, usePointStyle: true } } 
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