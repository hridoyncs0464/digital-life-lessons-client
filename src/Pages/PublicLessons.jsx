import React from "react";
import { Link } from "react-router";

const PublicLessons = ({ recentBill }) => {

    if (!recentBill) return null; 


  const {
    _id,
    title,
    category,
    location,
    date,
    amount,
    image
  } = recentBill;
               
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">



      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2">
          {title}
        </h3>

        <p className="text-sm text-gray-600">
          <strong>Category:</strong> {category}
        </p>

        <p className="text-sm text-gray-600">
          <strong>Location:</strong> {location}
        </p>

        <p className="text-sm text-gray-600">
          <strong>Amount:</strong> ৳{amount}
        </p>

        <p className="text-sm text-gray-600 mb-4">
          <strong>Date:</strong> {date}
        </p>

        <Link
          to={`/bills/${_id}`}
          className="btn btn-outline btn-primary btn-sm w-full"
        >
          See Details
        </Link>
      </div>                      
    </div>
  );
};

export default PublicLessons;
