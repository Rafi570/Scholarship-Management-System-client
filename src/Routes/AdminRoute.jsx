import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../Components/Loading/Loading';
import Forbidden from '../Components/Forbidden/Forbidden';

const AdminRoute = ({children}) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;