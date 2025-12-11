import axios from 'axios';
import React from 'react';


const axiosInstance = axios.create({
    baseURL: 'https://scholarship-management-system-serve-one.vercel.app/'
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;