import React from 'react';

const Refund = () => {
    return (
       <section className="min-h-screen px-4 py-16 bg-base-100">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center">Refund Policy</h1>

        <p>
          Premium subscriptions provide lifetime access. Therefore, refunds are
          generally not applicable once payment is completed.
        </p>

        <p>
          If you experience a payment error or duplicate charge, please contact
          support within 7 days.
        </p>

        <p>
          All refund requests are reviewed on a case-by-case basis.
        </p>
      </div>
    </section>
    );
};

export default Refund;