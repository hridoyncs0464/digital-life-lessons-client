import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose <span className="text-primary">PayBill</span>?
        </h2>




        <div className="grid md:grid-cols-4 gap-6">
          <div className="card bg-base-200 p-6 text-center shadow">
            <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
            <p className="text-sm">
              Your bill payments are protected with secure authentication and
              verified user access.
            </p>
          </div>                              

          <div className="card bg-base-200 p-6 text-center shadow">
            <h3 className="font-semibold text-lg mb-2">Current Month Control</h3>
            <p className="text-sm">
              Pay only current month bills with automatic date validation.
            </p>
          </div>

          <div className="card bg-base-200 p-6 text-center shadow">
            <h3 className="font-semibold text-lg mb-2">PDF Bill Reports</h3>
            <p className="text-sm">
              Download detailed PDF reports of your paid bills anytime.
            </p>
          </div>

          <div className="card bg-base-200 p-6 text-center shadow">
            <h3 className="font-semibold text-lg mb-2">Easy Bill Management</h3>
            <p className="text-sm">
              View, update, and manage all your utility bills in one dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
