// src/components/Loading.jsx (Premium Version)
import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex flex-col items-center gap-8">
        {/* Gradient Ring Spinner */}
        <div className="relative">
          <div className="h-24 w-24 animate-ping rounded-full bg-gradient-to-r from-primary to-purple-600 opacity-20"></div>
          <div className="absolute top-2 left-2 h-20 w-20 rounded-full bg-gradient-to-r from-primary to-purple-600 animate-spin [animation-duration:3s]"></div>
          <div className="absolute top-6 left-6 h-12 w-12 rounded-full bg-white"></div>
          <div className="absolute top-8 left-8 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
            <span className="text-3xl font-bold text-primary">S</span>
          </div>
        </div>

        {/* Text with shimmer effect */}
        <div className="space-y-3 text-center">
          <h2 className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-2xl font-black text-transparent">
            Loading Your Experience
          </h2>
          <p className="text-gray-600">Just a moment, magic is happening...</p>
        </div>

        {/* Floating particles */}
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full bg-primary/30 animate-bounce`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;