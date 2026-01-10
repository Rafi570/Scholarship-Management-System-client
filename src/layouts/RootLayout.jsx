import React from "react";
import { Outlet } from "react-router";
import NavBar from "../Components/Shared/NavBar/NavBar";
import Footer from "../Components/Shared/Footer/Footer";

const RootLayout = () => {
  return (

    <div className="bg-[#f0f8ff] dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <NavBar />
      
      {/* Content Area: min-h-screen - navbar/footer height adjust kora hoyeche jate content kom thakleo footer niche thake */}
      <main className="min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;