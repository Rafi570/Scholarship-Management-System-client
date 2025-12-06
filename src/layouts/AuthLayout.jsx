import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  const bannerImageUrl =
    "https://img.freepik.com/free-photo/three-laughing-students-studying-browsing-tablet_1262-15298.jpg?semt=ais_hybrid&w=740&q=80";

  const bannerAltText =
    "Diverse group of students smiling and collaborating in a bright, modern library setting.";

  const bannerTitle = "";

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white overflow-x-hidden mb-20">
      <div className="flex flex-1 justify-center">
        <div className="flex flex-col w-full">
          <div className="w-full">
            <div
              className="bg-cover bg-center flex flex-col justify-end min-h-[350px]"
              data-alt={bannerAltText}
              style={{
                backgroundImage: `
                  linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%),
                  url("${bannerImageUrl}")
                `,
                backgroundPosition: "center 27%", 
              }}
            >
              <div className="flex p-8 md:p-12">
                <p className="text-white text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
                  {bannerTitle}
                </p>
              </div>
            </div>
          </div>

          {/* WHITE FORM CARD */}
          <div className="flex justify-center w-full px-4 -mt-16 sm:-mt-24 z-10">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 md:p-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
