import React, { use } from "react";
import Bills from "./PublicLessons";
import { Link } from "react-router";

const Recentbills = ({ RecentbillsPromise }) => {
  const recentBills = use(RecentbillsPromise);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4">
          Recent <span className="text-primary">Bills</span>
        </h2>

        <p className="text-center font-bold text-2xl text-gray-600 mb-8">
          Latest utility bills added to the system
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentBills.map((recentBill) => (
            <Bills key={recentBill._id} recentBill={recentBill} />
          ))}
        </div>
      </div>
      {/* See All Bills Button */}
      <div className="text-center mt-10">
        <Link to="/all-bills" className="btn btn-primary">
          See All Bills
        </Link>
      </div>
    </section>
  );
};

export default Recentbills;
