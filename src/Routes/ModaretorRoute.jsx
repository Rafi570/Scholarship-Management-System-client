import React from "react";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import Loading from "../Components/Loading/Loading";
import Forbidden from "../Components/Forbidden/Forbidden";

const ModaretorRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || !user || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "moderator") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default ModaretorRoute;
