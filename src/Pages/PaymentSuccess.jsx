// src/pages/PaymentSuccess.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../AuthContext/useAuth";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    // For this assignment: trust Stripe redirect and just update premium by email
    if (user?.email && sessionId) {
      fetch(
        "https://digital-life-lessons-server-omega.vercel.app/users/make-premium",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success("Payment successful! Premium activated 🎉");
          } else {
            toast.error("Payment ok, but failed to activate Premium.");
          }
          setTimeout(() => navigate("/"), 2000);
        })
        .catch(() => {
          toast.error("Payment ok, but server update failed.");
          setTimeout(() => navigate("/"), 2000);
        });
    } else {
      // No user or no session_id – just redirect
      toast("Payment successful. Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    }
  }, [user, navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">
        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✅</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Successful
        </h1>
        <p className="text-gray-600">
          Activating your Premium plan and redirecting you to the home page...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
