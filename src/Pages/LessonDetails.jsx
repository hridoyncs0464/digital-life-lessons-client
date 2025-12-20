import React, { use , useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";
import Swal from "sweetalert2";
import useTitle from "../Components/usetTitle";

const LessonDetails = () => {
    useTitle("Bill Details");
    const bill = useLoaderData();
    const {user} = useContext(AuthContext);
    // console.log(user.email);
    // console.log(bill);
      const [isOpen, setIsOpen] = useState(false);

    const {
    _id,
    title,
    category,
    location,
    description,
    amount,
    date,
    email
  } = bill;

   const billMonth = new Date(date).getMonth();
  const currentMonth = new Date().getMonth();
  const isCurrentMonth = billMonth === currentMonth;


  const handlePayBill = (e)=>{
    e.preventDefault();

    const form = e.target;
    const payData = {
          billId: _id,
      email: bill.email,
      username: form.username.value,
      address: form.address.value,
      phone: form.phone.value,
      amount,
      date: new Date().toISOString().split("T")[0],
      additionalInfo: form.additionalInfo.value,
    } 
    
    fetch(`https://utility-bill-sys-server.vercel.app/pay-bills`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(payData),
})
  .then(res => res.json())
  .then(data => {
    if (!data.success) {
      Swal.fire("Warning!", data.message, "warning");
      return;
    }

    setIsOpen(false);
    Swal.fire("Success!", "Bill paid successfully", "success");
  })
  .catch(() => {
    Swal.fire("Error!", "Something went wrong", "error");
  });


  }                     


    return (
   
  <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-white shadow-lg rounded-lg p-8">

        <h2 className="text-2xl font-bold mb-4">{title}</h2>

        <p className="mb-2">
          <strong>Category:</strong> {category}
        </p>

        <p className="mb-2">
          <strong>Location:</strong> {location}
        </p>

        <p className="mb-4">
          <strong>Description:</strong> {description}
        </p>

        <p className="mb-2">
          <strong>Amount:</strong> ৳ {amount}
        </p>

        <p className="mb-6">
          <strong>Date:</strong> {date}
        </p>

        {/* Pay Bill Button */}
        <button
          disabled={!isCurrentMonth}
          onClick={() => setIsOpen(true)}
          className={`btn w-full ${
            isCurrentMonth
              ? "btn-primary"
              : "btn-disabled"
          }`}
        >
          Pay Bill
        </button>

        {!isCurrentMonth && (
          <p className="text-red-500 text-sm mt-2 text-center">
            Only current month bills can be paid.
          </p>
        )}

      </div>



      {/* ================= MODAL ================= */}
{isOpen && (
  <dialog open className="modal">
    <div className="modal-box">
      <h3 className="font-bold text-lg mb-4">Pay Bill</h3>

      <form onSubmit={handlePayBill} className="space-y-3">

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            defaultValue={bill.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Bill ID */}
        <div>
          <label className="block mb-1 font-medium">Bill ID</label>
          <input
            type="text"
            value={_id}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="username"
            placeholder="Your Name"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            name="address"
            placeholder="Address"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            name="phone"
            placeholder="Phone"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            value={new Date().toISOString().split("T")[0]}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Additional Info */}
        <div>
          <label className="block mb-1 font-medium">Additional Info</label>
          <textarea
            name="additionalInfo"
            placeholder="Additional Info (optional)"
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div className="modal-action">
          <button className="btn btn-primary">Submit</button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </dialog>
)}




    </section>

    );
};

export default LessonDetails;