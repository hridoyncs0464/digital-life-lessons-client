import React from 'react';

const Privacy = () => {
    return (
       <section className="min-h-screen px-4 py-16 bg-base-100">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center">Privacy Policy</h1>

        <p>
          Your privacy is important to us. We collect only the data necessary to
          provide our services.
        </p>

        <p>
          We never sell user data to third parties. Authentication data is securely
          managed via Firebase.
        </p>

        <p>
          Users can request account deletion or data removal at any time.
        </p>
      </div>
    </section>
    );
};

export default Privacy;