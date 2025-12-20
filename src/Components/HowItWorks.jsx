import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          How <span className="text-primary">PayBill</span> Works
        </h2>
                                       
        <div className="grid md:grid-cols-4 gap-6">
          <div className="card bg-base-100 p-6 text-center shadow">
            <span className="text-primary text-3xl font-bold">1</span>
            <h3 className="font-semibold mt-3">Login / Register</h3>
            <p className="text-sm mt-2">
              Create an account or login securely using email or Google.
            </p>
          </div>

          <div className="card bg-base-100 p-6 text-center shadow">
            <span className="text-primary text-3xl font-bold">2</span>
            <h3 className="font-semibold mt-3">Browse Bills</h3>
            <p className="text-sm mt-2">
              Explore electricity, gas, water, and internet bills easily.
            </p>
          </div>

          <div className="card bg-base-100 p-6 text-center shadow">
            <span className="text-primary text-3xl font-bold">3</span>
            <h3 className="font-semibold mt-3">Pay Current Bills</h3>
            <p className="text-sm mt-2">
              Pay only current month bills with a simple payment form.
            </p>
          </div>

          <div className="card bg-base-100 p-6 text-center shadow">
            <span className="text-primary text-3xl font-bold">4</span>
            <h3 className="font-semibold mt-3">Download Report</h3>
            <p className="text-sm mt-2">
              Download PDF reports of your paid bills from My Pay Bills.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
