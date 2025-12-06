import React from 'react';
// import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loading from '../Components/Loading/Loading';
// import Loading from '../components/Loading/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    
    if (loading) {
        return <Loading></Loading>
    }

    if(!user){
        return <Navigate state={location.pathname} to="/auth/login"></Navigate>
    }

    return children;
};

export default PrivateRoute;