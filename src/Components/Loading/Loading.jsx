import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      <div className="flex flex-col items-center gap-8">
        
        {/* Animated Spinner Section */}
        <div className="relative">
          {/* Outer Ping Effect */}
          <div className="h-28 w-28 animate-ping rounded-full bg-gradient-to-r from-primary to-purple-500 opacity-20"></div>
          
          {/* Spinning Ring */}
          <div className="absolute top-2 left-2 h-24 w-24 rounded-full border-t-4 border-b-4 border-primary animate-spin"></div>
          
          {/* Secondary Spinning Ring (Opposite Direction) */}
          <div className="absolute top-4 left-4 h-20 w-20 rounded-full border-l-4 border-r-4 border-purple-500 animate-spin [animation-duration:2s] opacity-50"></div>
          
          {/* Center Logo/Icon */}
          <div className="absolute top-6 left-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white dark:bg-gray-900 shadow-2xl transition-colors duration-500">
            <span className="text-3xl font-black text-primary animate-pulse">
              S
            </span>
          </div>
        </div>

        {/* Text Section with Shimmer */}
        <div className="space-y-3 text-center">
          <h2 className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] animate-[shimmer_2s_linear_infinite] bg-clip-text text-3xl font-black text-transparent">
            Loading Experience
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide">
            Please wait, magic is happening...
          </p>
        </div>

        {/* Floating Particles */}
        <div className="flex gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce shadow-[0_0_10px_rgba(53,172,134,0.5)]"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Tailwind Custom Animation Injection */}
      <style jsx>{`
        @keyframes shimmer {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;