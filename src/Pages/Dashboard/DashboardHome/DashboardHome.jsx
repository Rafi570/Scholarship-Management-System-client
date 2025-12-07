import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../../Components/Loading/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import ModeratorDashboardHome from './ModeratorDashboardHome';
import StudentDashboardHome from './StudentDashboardHome';

const DashboardHome = () => {
     const { role, roleLoading } = useRole();
    if (roleLoading) {
        return <Loading></Loading>
    }
    if (role === 'admin') {
        return <AdminDashboardHome></AdminDashboardHome>
    }
    else if (role === 'moderator') {
        return <ModeratorDashboardHome></ModeratorDashboardHome>
    }
    else {
        return <StudentDashboardHome></StudentDashboardHome>
    }
};

export default DashboardHome;