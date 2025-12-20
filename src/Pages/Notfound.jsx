import React from "react";
import { Link } from "react-router";
import useTitle from "../Components/usetTitle";


const Notfound = () => {
    useTitle("Page Not Found");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-blue-100 text-gray-800 p-6">
      <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-md w-full">
        <h1 className="text-8xl font-extrabold text-red-500 mb-4 animate-bounce">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="mb-6 text-gray-600">
          The page you are looking for does not exist, may have been removed, or the URL is incorrect.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 transition duration-300"
        >
          Go Back Home          
        </Link>
      </div>
      <p className="mt-6 text-gray-500 text-sm">
        Or check your URL and try again.
      </p>
    </div>
  );
};

                        
export default Notfound;
         