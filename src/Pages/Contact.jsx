import React from 'react';

const Contact = () => {
    return (
         <section className="min-h-screen bg-base-100 px-4 py-16">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Office Address</h2>
            <p>Level-4, 34 Awal Centre, Banani, Dhaka</p>
            <p>Email: <span className="font-medium">web@programming-hero.com</span></p>
            <p>Support: 01322-901105, 01322-810874</p>
            <p className="text-sm text-gray-500">
              Available: Saturday – Thursday, 10:00 AM – 7:00 PM
            </p>
          </div>

          <form className="space-y-4 bg-base-200 p-6 rounded-xl shadow">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
              required
            />
            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full"
              rows="4"
              required
            />
            <button className="btn btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
    );
};

export default Contact;