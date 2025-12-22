import React from "react";

const Loading = ({ message = " Please wait..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      {/* Spinner */}
      <span className="loading loading-ring loading-lg text-primary scale-150"></span>

      {/* Title */}
      <h2 className="text-xl font-semibold text-primary">
        Digital Life Lessons
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
        {message}
      </p>
    </div>
  );
};

export default Loading;
