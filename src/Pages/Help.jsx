import React from 'react';

const Help = () => {
    return (
        <section className="min-h-screen px-4 py-16 bg-base-100">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Help & Support</h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">How do I create a lesson?</h2>
            <p>
              Go to your dashboard and click on “Add Lesson”. Fill in the required
              fields and publish.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Why can’t I access premium lessons?</h2>
            <p>
              Premium lessons are available only for Premium users. You can upgrade
              from the Pricing page.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Need further assistance?</h2>
            <p>
              Contact our support team via email or phone for immediate help.
            </p>
          </div>
        </div>
      </div>
    </section>
    );
};

export default Help;