import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const PRIMARY_COLOR = "primary"; 

const StatCard = ({ title, value, icon, bgColor, textColor, link }) => (
    <Link to={link || '#'} className="block h-full">
        <div 
            className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col items-start justify-between min-h-[160px] transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-t-4 border-${textColor} cursor-pointer`}
        >
            <div className={`p-4 rounded-2xl bg-${bgColor} text-white mb-4 shadow-lg shadow-${bgColor}/20`}>
                {icon}
            </div>
            <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{title}</h2>
            <p className={`text-4xl font-black text-${textColor} mt-2`}>{value}</p>
        </div>
    </Link>
);

const ModeratorDashboardHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: appData = {}, isLoading: isAppLoading } = useQuery({
        queryKey: ['moderator-app-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/application`);
            const applications = Array.isArray(res.data?.data) ? res.data.data : [];
            return {
                total: applications.length,
                pending: applications.filter(app => app.applicationStatus === 'pending').length,
                approved: applications.filter(app => app.applicationStatus === 'approved').length,
            };
        },
    });

    const { data: reviewData = [], isLoading: isReviewLoading } = useQuery({
        queryKey: ['moderator-reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review/role/modaretor`); 
            return Array.isArray(res.data) ? res.data : [];
        },
    });

    return (
        <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <h1 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white mb-10 border-b dark:border-gray-800 pb-4">
                Moderator <span className="text-primary">Overview</span>
            </h1>
            
            {(isAppLoading || isReviewLoading) && (
                 <div className="text-center py-10 text-lg font-bold text-primary animate-pulse">Loading Statistics...</div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard 
                    title="Total Applications" 
                    value={appData.total || 0} 
                    icon={<i className="fas fa-list-alt text-xl"></i>} 
                    bgColor="primary" 
                    textColor="primary"
                    link="/dashboard/all-application"
                />
                <StatCard 
                    title="Pending Review" 
                    value={appData.pending || 0} 
                    icon={<i className="fas fa-clock text-xl"></i>} 
                    bgColor="orange-500" 
                    textColor="orange-500"
                    link="/dashboard/manage-student-applied"
                />
                <StatCard 
                    title="Total Approved" 
                    value={appData.approved || 0} 
                    icon={<i className="fas fa-check-circle text-xl"></i>} 
                    bgColor="green-500" 
                    textColor="green-500"
                    link="/dashboard/all-application"
                />
                <StatCard 
                    title="Manage Reviews" 
                    value={reviewData.length || 0} 
                    icon={<i className="fas fa-comments text-xl"></i>} 
                    bgColor="indigo-500" 
                    textColor="indigo-500"
                    link="/dashboard/all-review"
                />
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-6">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                    <Link
                        to="/dashboard/manage-student-applied"
                        className="px-6 py-3 rounded-xl bg-primary text-white font-bold transition-all hover:bg-primary/90 hover:-translate-y-1 shadow-lg shadow-primary/20"
                    >
                        Pending Applications ({appData.pending || 0})
                    </Link>
                    <Link
                        to="/dashboard/all-review"
                        className="px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                    >
                        Manage Reviews
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ModeratorDashboardHome;