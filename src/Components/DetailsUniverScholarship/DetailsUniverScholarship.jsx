import React from "react";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import useAuth from "../../hooks/useAuth";

const DetailsUniverScholarship = () => {
  const { _id: sholarData } = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const {user}=useAuth
  

  const { data: detailsScholar = [], isLoading } = useQuery({
    queryKey: [""],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${sholarData}`);
      return res.data;
    },
  });
  if(isLoading){
    return <Loading></Loading>
  }
  console.log(detailsScholar)

  return <div></div>;
};

export default DetailsUniverScholarship;
