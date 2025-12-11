import React from "react";
import { Outlet } from "react-router";
import NavBar from "../Components/Shared/NavBar/NavBar";
import Footer from "../Components/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="bg-[#f0f8ff]">
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
