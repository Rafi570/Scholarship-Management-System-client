import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth'; // Assuming you have a useAuth hook to get user data
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

// Define colors and styles
const PRIMARY_COLOR = "primary"; 
const ALERT_COLOR = "red-500";
const SUCCESS_COLOR = "green-600";
const INFO_COLOR = "blue-600";

// --- Stat Card Component (Reused and adapted for student stats) ---
const StatCard = ({ title, value, icon, color, link }) => (
    <Link to={link || '#'} className="block h-full">
        <div 
            className={`bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between min-h-[160px] transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-${color} cursor-pointer`}
        >
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h2>
                <div className={`text-${color} text-2xl`}>{icon}</div>
            </div>
            <p className={`text-4xl font-extrabold text-${color} mt-4`}>{value}</p>
        </div>
    </Link>
);

// --- Main Component ---
const StudentDashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); // Get the current logged-in user

    const userEmail = user?.email;

    // 1. Fetch Student Application Data
    const { data: appData = [], isLoading: isAppLoading } = useQuery({
        queryKey: ['student-applications', userEmail],
        queryFn: async () => {
            if (!userEmail) return [];
            // Filter applications by the logged-in user's email
            const res = await axiosSecure.get(`/application?email=${userEmail}`);
            return Array.isArray(res.data?.data) ? res.data.data : [];
        },
        enabled: !!userEmail, // Only run the query if the email is available
    });

    // 2. Aggregate Stats
    const totalApplications = appData.length;
    const pendingCount = appData.filter(app => app.applicationStatus === 'pending').length;
    const approvedCount = appData.filter(app => app.applicationStatus === 'approved').length;
    const unpaidCount = appData.filter(app => app.paymentStatus === 'unpaid').length;
    
    // 3. Fetch Student Review Data
    const { data: reviewData = [], isLoading: isReviewLoading } = useQuery({
        queryKey: ['student-reviews', userEmail],
        queryFn: async () => {
            if (!userEmail) return [];
            // Filter reviews by the logged-in user's email
            const res = await axiosSecure.get(`/review?email=${userEmail}`);
            return Array.isArray(res.data) ? res.data : [];
        },
        enabled: !!userEmail,
    });
    
    const totalReviews = reviewData.length;
    const hasUnreviewedApplications = approvedCount > totalReviews;

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 border-b pb-2">
                Welcome Back, {user?.displayName || 'Student'}!
            </h1>
            
            {/* Loading State */}
            {(isAppLoading || isReviewLoading) && (
                 <div className="text-center py-10 text-lg text-primary">Fetching your dashboard data...</div>
            )}

            {/* Stat Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                
                {/* Total Applications */}
                <StatCard 
                    title="Total Applications" 
                    value={totalApplications} 
                    icon={<i className="fas fa-file-invoice text-2xl"></i>} 
                    color={PRIMARY_COLOR}
                    link="/dashboard/my-applications"
                />

                {/* Pending Applications */}
                <StatCard 
                    title="Pending Status" 
                    value={pendingCount} 
                    icon={<i className="fas fa-hourglass-half text-2xl"></i>} 
                    color={INFO_COLOR} // Blue for waiting
                    link="/dashboard/my-applications?status=pending"
                />

                {/* Approved Applications */}
                <StatCard 
                    title="Approved Offers" 
                    value={approvedCount} 
                    icon={<i className="fas fa-graduation-cap text-2xl"></i>} 
                    color={SUCCESS_COLOR} // Green for success
                    link="/dashboard/my-applications?status=approved"
                />

                {/* Unpaid Applications (High Priority) */}
                <StatCard 
                    title="Payments Due" 
                    value={unpaidCount} 
                    icon={<i className="fas fa-hand-holding-usd text-2xl"></i>} 
                    color={ALERT_COLOR} // Red for alerts
                    link="/dashboard/my-applications?payment=unpaid"
                />
            </div>
            

            {/* Action / Alert Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mt-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Next Steps</h3>
                
                <div className="space-y-4">
                    {/* Alert for Payments Due */}
                    {unpaidCount > 0 && (
                        <div className={`p-4 rounded-lg bg-${ALERT_COLOR}/10 border-l-4 border-${ALERT_COLOR} text-${ALERT_COLOR} flex justify-between items-center`}>
                            <p>
                                <i className="fas fa-exclamation-triangle mr-2"></i> 
                                You have **{unpaidCount}** application fee(s) pending payment. Please check your applications!
                            </p>
                            <Link to="/dashboard/my-applicatioin" className={`text-sm font-semibold text-white bg-${ALERT_COLOR} px-3 py-1.5 rounded-md hover:bg-red-600 transition`}>
                                Go to Payments
                            </Link>
                        </div>
                    )}

                    {/* Alert/CTA for Leaving Reviews */}
                    {hasUnreviewedApplications && (
                         <div className={`p-4 rounded-lg bg-${PRIMARY_COLOR}/10 border-l-4 border-${PRIMARY_COLOR} text-${PRIMARY_COLOR} flex justify-between items-center`}>
                            <p>
                                <i className="fas fa-star mr-2"></i> 
                                You have approved scholarships that you haven't reviewed yet. Share your experience!
                            </p>
                            {/* <Link to="/dashboard/my-application" className={`text-sm font-semibold text-white bg-${PRIMARY_COLOR} px-3 py-1.5 rounded-md hover:bg-primary/90 transition`}>
                                Leave Review
                            </Link> */}
                        </div>
                    )}
                    
                    {/* General CTA for Reviews */}
                    <div className="flex justify-between items-center p-4 border border-gray-100 rounded-lg">
                        <p className="text-gray-700 font-medium">You have posted **{totalReviews}** review(s) so far.</p>
                        <Link to="/dashboard/my-review" className={`text-sm font-semibold text-${INFO_COLOR} hover:underline`}>
                            View Your Reviews
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboardHome;