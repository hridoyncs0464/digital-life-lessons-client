// src/pages/PaymentCancel.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const PaymentCancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error('Payment was cancelled. You are still on Free plan.');
    const t = setTimeout(() => navigate('/pricing'), 2000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">
        <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">⚠️</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Payment Cancelled
        </h1>
        <p className="text-gray-600">Redirecting back to pricing...</p>
      </div>
    </div>
  );
};

export default PaymentCancel;
