import React from "react";
import { useLoaderData } from "react-router";
import Bills from "./PublicLessons";
import useTitle from "../Components/usetTitle";

const AllBills = () => {
  useTitle("All Bills");
  const allBills = useLoaderData();

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-5xl font-bold text-center mb-4">
        All <span className="text-primary">Bill</span>
      </h2>

      <p className="text-center text-2xl font-bold text-gray-600 mb-10">
        View all available utility bills
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBills.map((bill) => (
          <Bills key={bill._id} recentBill={bill} />
        ))}
      </div>
    </section>
  );
};

export default AllBills;
