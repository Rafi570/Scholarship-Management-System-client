import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query'; // Assuming you use TanStack Query (or React Query)
import { Link } from 'react-router'; // For linking to management pages

// Define the primary color (matching #35AC86)
const PRIMARY_COLOR = "primary"; 
const PRIMARY_COLOR_HOVER = "primary/90";
const PRIMARY_COLOR_RING = "primary/30";

// --- Stat Card Component ---
const StatCard = ({ title, value, icon, bgColor, textColor, link }) => (
    <Link to={link || '#'} className="block">
        <div 
            className={`bg-white rounded-xl shadow-lg p-6 flex flex-col items-start justify-between min-h-[160px] transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-t-4 border-${textColor} cursor-pointer`}
        >
            <div className={`p-3 rounded-full bg-${bgColor} text-white mb-4`}>
                {icon}
            </div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h2>
            <p className={`text-3xl font-extrabold text-${textColor} mt-1`}>{value}</p>
        </div>
    </Link>
);

// --- Main Component ---
const ModeratorDashboardHome = () => {
    const axiosSecure = useAxiosSecure();

    // 1. Fetch Application Counts
    const { data: appData = {}, isLoading: isAppLoading } = useQuery({
        queryKey: ['moderator-app-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/application`);
            const applications = Array.isArray(res.data?.data) ? res.data.data : [];
            
            const total = applications.length;
            const pending = applications.filter(app => app.applicationStatus === 'pending').length;
            const approved = applications.filter(app => app.applicationStatus === 'approved').length;
            const rejected = applications.filter(app => app.applicationStatus === 'rejected').length;

            return { total, pending, approved, rejected };
        },
    });

    // 2. Fetch Review Counts
    const { data: reviewData = [], isLoading: isReviewLoading } = useQuery({
        queryKey: ['moderator-reviews'],
        queryFn: async () => {
            // This endpoint fetches all reviews, as moderators usually manage all reviews
            const res = await axiosSecure.get(`/review/role/modaretor`); 
            return Array.isArray(res.data) ? res.data : [];
        },
    });
    
    const totalReviews = reviewData.length;


    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 border-b pb-2">
                Moderator Dashboard
            </h1>
            
            {/* Loading State */}
            {(isAppLoading || isReviewLoading) && (
                 <div className="text-center py-10 text-lg text-primary">Loading statistics...</div>
            )}

            {/* Stat Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                
                <StatCard 
                    title="Total Applications" 
                    value={appData.total || 0} 
                    icon={<i className="fas fa-list-alt text-lg"></i>} 
                    bgColor={PRIMARY_COLOR} 
                    textColor={PRIMARY_COLOR}
                    link="/dashboard/manage-applications"
                />

                <StatCard 
                    title="Pending for Review" 
                    value={appData.pending || 0} 
                    icon={<i className="fas fa-clock text-lg"></i>} 
                    bgColor="orange-500" 
                    textColor="orange-600"
                    link="/dashboard/manage-applications?status=pending"
                />

                <StatCard 
                    title="Total Approved" 
                    value={appData.approved || 0} 
                    icon={<i className="fas fa-check-circle text-lg"></i>} 
                    bgColor="green-500" 
                    textColor="green-600"
                    link="/dashboard/manage-applications?status=approved"
                />
                
                <StatCard 
                    title="Reviews to Manage" 
                    value={totalReviews} 
                    icon={<i className="fas fa-comments text-lg"></i>} 
                    bgColor="indigo-500" 
                    textColor="indigo-600"
                    link="/dashboard/manage-reviews"
                />
            </div>
            

            {/* Quick Actions / Recent Activity Placeholder */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                    <Link
                        to="/dashboard/manage-student-applied"
                        className={`px-5 py-2.5 rounded-lg bg-${PRIMARY_COLOR} text-white font-semibold transition-all duration-300 hover:bg-${PRIMARY_COLOR_HOVER} focus:ring-2 focus:ring-${PRIMARY_COLOR_RING} active:scale-[0.99]`}
                    >
                        Review Pending Applications ({appData.pending || 0})
                    </Link>
                    <Link
                        to="/dashboard/all-review"
                        className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-50 active:scale-[0.99]"
                    >
                        Manage Reviews ({totalReviews})
                    </Link>
                </div>
            </div>

            {/* Note: In a real app, you would add charts here showing approval rates, time-to-approve, etc. */}
        </div>
    );
};

export default ModeratorDashboardHome;