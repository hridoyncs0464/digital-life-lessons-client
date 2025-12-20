
import React from "react";


const MyLessons = () => {
// temporary static data (replace with API later)
const lessons = [
{
id: 1,
title: "Failure teaches more than success",
category: "Personal Growth",
access: "Free",
visibility: "Public",
createdAt: "2025-01-10",
},
];


return (
<div>
<h2 className="text-2xl font-bold mb-6">My Lessons</h2>


<div className="overflow-x-auto bg-base-100 rounded-lg shadow">
<table className="table">
<thead>
<tr>
<th>Title</th>
<th>Category</th>
<th>Access</th>
<th>Visibility</th>
<th>Created</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
{lessons.map((lesson) => (
<tr key={lesson.id}>
<td className="font-medium">{lesson.title}</td>
<td>{lesson.category}</td>
<td>
<span className="badge badge-outline">{lesson.access}</span>
</td>
<td>
<select className="select select-sm">
<option>Public</option>
<option>Private</option>
</select>
</td>
<td>{lesson.createdAt}</td>
<td className="flex gap-2">
<button className="btn btn-xs btn-outline">Edit</button>
<button className="btn btn-xs btn-error">Delete</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
);
};


export default MyLessons;












// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../AuthContext/AuthContext";
// // import Loading from "../Components/Loading";
// import Swal from "sweetalert2";

// // import jsPDF from "jspdf";
// // import "jspdf-autotable";

// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import Loading from "../../Components/Loding";
// import useTitle from "../../Components/usetTitle";

// const MyLessons = () => {
//   useTitle("My Pay Bills");
//   const { user } = useContext(AuthContext);

//   const [bills, setBills] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editBill, setEditBill] = useState(null);

//   // if (!user) {
//   //     return (
//   //       <p className="text-center py-12 text-lg">
//   //         Please log in to view your paid bills.
//   //       </p>
//   //     );
//   //   }

//   // ================= FETCH USER BILLS =================
//   useEffect(() => {
//     if (!user) {
//       setBills([]);
//       setLoading(false);
//       return;
//     }

//     const fetchBills = async () => {
//       try {
//         const res = await fetch(
//           `https://utility-bill-sys-server.vercel.app/my-pay-bills?email=${user.email}`
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }

//         const data = await res.json();
//         setBills(data);
//       } catch (error) {
//         console.error("Failed to fetch bills:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Failed to load your bills. Please try again later.",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBills();
//   }, [user.email]);

//   if (loading) {
//     return <Loading message="Loading your paid bills..." />;
//   }

//   // ================= TOTAL AMOUNT =================
//   const totalAmount = bills.reduce((sum, bill) => sum + Number(bill.amount), 0);

//   // ================= DELETE =================
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This bill will be permanently deleted!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(`https://utility-bill-sys-server.vercel.app/my-pay-bills/${id}`, {
//           method: "DELETE",
//         })
//           .then((res) => res.json())
//           .then(() => {
//             setBills(bills.filter((b) => b._id !== id));
//             Swal.fire("Deleted!", "Bill removed.", "success");
//           });
//       }
//     });
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault();

//     fetch(
//       `https://utility-bill-sys-server.vercel.app/my-pay-bills/${editBill._id}`,
//       {
//         method: "PATCH",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify(editBill),
//       }
//     )
//       .then((res) => res.json())
//       .then(() => {
//         Swal.fire("Updated!", "Bill updated successfully.", "success");
//         setEditBill(null);
//         location.reload();
//       });
//   };

//   // ================= PDF DOWNLOAD =================
//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     doc.text("My Paid Bills Report", 14, 15);

//     const tableData = bills.map((bill) => [
//       bill.username,
//       bill.email,
//       bill.amount,
//       bill.address,
//       bill.phone,
//       bill.date,
//     ]);

//     autoTable(doc, {
//       head: [["Name", "Email", "Amount", "Address", "Phone", "Date"]],
//       body: tableData,
//       startY: 20,
//     });

//     doc.save("my-pay-bills.pdf");
//   };

//   return (
//     <section className="max-w-6xl mx-auto px-4 py-12">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold">My Pay Bills</h2>
//           <p>Total Bill Paid: {bills.length}</p>
//           <p>Total Amount: ৳ {totalAmount}</p>
//         </div>

//         <button onClick={downloadPDF} className="btn btn-primary">
//           Download Report
//         </button>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="table table-zebra">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Amount</th>
//               <th>Address</th>
//               <th>Phone</th>
//               <th>Date</th>
//               <th>Update</th>
//               <th>Delete</th>
//             </tr>
//           </thead>

//           <tbody>
//             {bills.map((bill) => (
//               <tr key={bill._id}>
//                 <td>{bill.username}</td>
//                 <td>{bill.email}</td>
//                 <td>৳{bill.amount}</td>
//                 <td>{bill.address}</td>
//                 <td>{bill.phone}</td>
//                 <td>{bill.date}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm"
//                     onClick={() => setEditBill(bill)}
//                   >
//                     Update
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => handleDelete(bill._id)}
//                     className="btn btn-sm btn-error"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* UPDATE MODAL */}
//       {editBill && (
//         <dialog open className="modal">
//           <div className="modal-box">
//             <form onSubmit={handleUpdate} className="space-y-3">
//               <input
//                 className="input input-bordered w-full"
//                 value={editBill.amount}
//                 onChange={(e) =>
//                   setEditBill({ ...editBill, amount: e.target.value })
//                 }
//               />
//               <input
//                 className="input input-bordered w-full"
//                 value={editBill.address}
//                 onChange={(e) =>
//                   setEditBill({ ...editBill, address: e.target.value })
//                 }
//               />
//               <input
//                 className="input input-bordered w-full"
//                 value={editBill.phone}
//                 onChange={(e) =>
//                   setEditBill({ ...editBill, phone: e.target.value })
//                 }
//               />
//               <input
//                 type="date"
//                 className="input input-bordered w-full"
//                 value={editBill.date}
//                 onChange={(e) =>
//                   setEditBill({ ...editBill, date: e.target.value })
//                 }
//               />

//               <div className="modal-action">
//                 <button className="btn btn-primary">Save</button>
//                 <button
//                   type="button"
//                   className="btn"
//                   onClick={() => setEditBill(null)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </dialog>
//       )}
//     </section>
//   );
// };

// export default MyLessons;
