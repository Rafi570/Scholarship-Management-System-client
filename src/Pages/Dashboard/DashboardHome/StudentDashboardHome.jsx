import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const StudentDashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const userEmail = user?.email;

    const { data: appData = [], isLoading: isAppLoading } = useQuery({
        queryKey: ['student-applications', userEmail],
        queryFn: async () => {
            if (!userEmail) return [];
            const res = await axiosSecure.get(`/application?email=${userEmail}`);
            return Array.isArray(res.data?.data) ? res.data.data : [];
        },
        enabled: !!userEmail,
    });

    const { data: reviewData = [], isLoading: isReviewLoading } = useQuery({
        queryKey: ['student-reviews', userEmail],
        queryFn: async () => {
            if (!userEmail) return [];
            const res = await axiosSecure.get(`/review?email=${userEmail}`);
            return Array.isArray(res.data) ? res.data : [];
        },
        enabled: !!userEmail,
    });

    const pendingCount = appData.filter(app => app.applicationStatus === 'pending').length;
    const approvedCount = appData.filter(app => app.applicationStatus === 'approved').length;
    const unpaidCount = appData.filter(app => app.paymentStatus === 'unpaid').length;

    const StatCard = ({ title, value, icon, colorClass, link }) => (
        <Link to={link || '#'} className="block h-full">
            <div className={`bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 flex flex-col justify-between min-h-[160px] transition-all hover:-translate-y-1 border-l-8 ${colorClass} dark:border-opacity-50`}>
                <div className="flex items-center justify-between">
                    <h2 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em]">{title}</h2>
                    <div className="text-2xl opacity-50">{icon}</div>
                </div>
                <p className="text-4xl font-black text-gray-800 dark:text-white mt-4">{value}</p>
            </div>
        </Link>
    );

    return (
        <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-black text-gray-800 dark:text-white mb-2">
                    Hello, <span className="text-primary">{user?.displayName?.split(' ')[0] || 'Student'}!</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Welcome to your scholarship portal.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Applications" value={appData.length} icon={<i className="fas fa-file-invoice"></i>} colorClass="border-primary" link="/dashboard/my-applicatioin" />
                <StatCard title="Pending" value={pendingCount} icon={<i className="fas fa-hourglass-half"></i>} colorClass="border-blue-500" link="/dashboard/my-applicatioin" />
                <StatCard title="Approved" value={approvedCount} icon={<i className="fas fa-graduation-cap"></i>} colorClass="border-green-500" link="/dashboard/my-applicatioin" />
                <StatCard title="Payments Due" value={unpaidCount} icon={<i className="fas fa-credit-card"></i>} colorClass="border-red-500" link="/dashboard/my-applicatioin" />
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-black text-gray-800 dark:text-gray-100 mb-6">Action Center</h3>
                <div className="space-y-4">
                    {unpaidCount > 0 && (
                        <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-red-600 dark:text-red-400 font-bold">
                                ⚠️ You have {unpaidCount} pending payment(s). Pay now to process your application.
                            </p>
                            <Link to="/dashboard/my-applicatioin" className="bg-red-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-red-500/20">Pay Fees</Link>
                        </div>
                    )}
                    <div className="flex flex-col md:flex-row justify-between items-center p-6 border-2 border-gray-50 dark:border-gray-800 rounded-2xl">
                        <p className="text-gray-600 dark:text-gray-400 font-semibold italic text-center md:text-left">
                            "Education is the most powerful weapon which you can use to change the world."
                        </p>
                        <Link to="/dashboard/profile" className="text-primary font-bold hover:underline mt-4 md:mt-0">Update Profile →</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboardHome;