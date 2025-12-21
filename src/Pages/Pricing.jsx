import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
// import { useAuth } from '../AuthContext/AuthContext';
// import { useRole } from '../hooks/useRole';
// import useTitle from '../Components/useTitle';
import toast from 'react-hot-toast';
import useTitle from '../Components/usetTitle';
import useAuth from '../AuthContext/useAuth';
import useRole from '../hooks/useRole';

const Pricing = () => {
  useTitle('Pricing | Digital Life Lessons');
  const { user, loading } = useAuth();
  const { premium, roleLoading } = useRole();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleUpgrade = async () => {
    if (premium) {
      toast('You are already a Premium member! ⭐', { icon: '⭐' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3100/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: user?.email })
      });

      const { url } = await response.json();
      window.location.href = url; // Stripe redirects automatically here we cant go outside the 
    } catch (error) {
      toast.error('Failed to create checkout session');
      setIsLoading(false);
    }
  };

  if (loading || roleLoading) {
    return <div className="min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  if (premium) {
    return (
      <div className="min-h-screen py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-12 rounded-3xl shadow-2xl mb-12">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">⭐</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">Premium Member</h1>
            <p className="text-xl opacity-90 mb-8">Enjoy lifetime access to all Premium features!</p>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl inline-block">
              <p className="text-2xl font-semibold">Unlimited Premium Lessons</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">✅ Premium Features Active</h3>
              <ul className="space-y-3 text-lg">
                <li>✨ Create Premium Lessons</li>
                <li>✨ View All Premium Content</li>
                <li>✨ Priority Lesson Listing</li>
                <li>✨ Ad-free Experience</li>
                <li>✨ Advanced Analytics</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-8 rounded-2xl shadow-2xl">
              <h3 className="text-3xl font-bold mb-6">Your Status</h3>
              <div className="text-6xl font-black mb-4">⭐ PREMIUM</div>
              <p className="opacity-90">Lifetime Access</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Unlock Premium Wisdom
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-12">
            One-time payment for lifetime access to exclusive lessons and premium features
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden mb-16">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-500 to-indigo-600">
                  <th className="text-white font-bold text-lg">Feature</th>
                  <th className="text-white font-bold text-lg text-center">Free</th>
                  <th className="text-white font-bold text-lg text-center">Premium ⭐</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">Public Free Lessons</td>
                  <td className="text-center">✅</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="font-semibold">Create Lessons</td>
                  <td className="text-center">✅ Unlimited</td>
                  <td className="text-center">✅ Unlimited</td>
                </tr>
                <tr>
                  <td className="font-semibold">Premium Lessons Access</td>
                  <td className="text-center">❌ Blurred/Locked</td>
                  <td className="text-center text-green-500 font-bold">✅ Full Access</td>
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="font-semibold">Create Premium Lessons</td>
                  <td className="text-center">❌</td>
                  <td className="text-center text-green-500 font-bold">✅ Yes</td>
                </tr>
                <tr>
                  <td className="font-semibold">Ad-free Experience</td>
                  <td className="text-center">❌</td>
                  <td className="text-center text-green-500 font-bold">✅</td>
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="font-semibold">Priority Listing</td>
                  <td className="text-center">📍 Normal</td>
                  <td className="text-center text-green-500 font-bold">⭐ Top Priority</td>
                </tr>
                <tr>
                  <td className="font-semibold">Advanced Analytics</td>
                  <td className="text-center">📊 Basic</td>
                  <td className="text-center text-green-500 font-bold">📊 Detailed</td>
                </tr>
                <tr className="bg-gray-50/50">
                  <td className="font-semibold">Support Priority</td>
                  <td className="text-center">⏳ Standard</td>
                  <td className="text-center text-green-500 font-bold">🚀 Priority</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-1 rounded-3xl inline-block mb-6 shadow-2xl">
            <button
              onClick={handleUpgrade}
              disabled={isLoading}
              className="btn btn-lg px-12 py-6 bg-white text-xl font-bold text-purple-600 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-xl border-0"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Processing...
                </>
              ) : (
                'Upgrade to Premium ⭐ ৳1500 Lifetime'
              )}
            </button>
          </div>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            One-time payment. No recurring charges. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
