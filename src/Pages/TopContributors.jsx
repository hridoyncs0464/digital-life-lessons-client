import React, { useEffect, useState } from "react";
// import { useTitle } from '../Components/useTitle';
import Loading from "../Components/Loading.jsx";
import useTitle from "../Components/usetTitle.js";
import { Link } from "react-router";

const TopContributorsPromise = fetch(
  "https://digital-life-lessons-server-omega.vercel.app/top-contributors"
).then((res) => res.json());

const TopContributors = () => {
  useTitle("Top Contributors");
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TopContributorsPromise.then((data) => {
      setContributors(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        {/* <span className="loading loading-spinner loading-lg" /> */}
        <Loading></Loading>
      </section>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 py-1">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">
          Top Contributors <span className="text-primary">This Week</span>
        </h2>
        <p className="text-xl text-gray-600 font-semibold mb-2">
          Most active lesson creators from the last 7 days
        </p>
        <div className="badge badge-outline badge-lg mt-4">
          Updated {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contributors.map((contributor, idx) => (
          <div
            key={contributor.email}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="card-body items-center text-center p-8">
              <div className="avatar mb-6">
                <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                  <img
                    src={
                      contributor.photo ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop"
                    }
                    alt={contributor.name}
                    className="object-cover"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {contributor.name}
              </h3>

              <div className="stats shadow w-full mb-6">
                <div className="stat place-items-center">
                  <div className="stat-title">Lessons This Week</div>
                  <div className="stat-value text-primary">
                    {contributor.lessonCount}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                <div className="badge badge-primary font-bold">#{idx + 1}</div>
                {contributor.premium && (
                  <div className="badge badge-secondary">Premium</div>
                )}
                <div className="badge badge-outline">Active</div>
              </div>

              <div className="card-actions">
                <Link
                  to={`/user-lessons/${contributor.email}`}
                  className="btn btn-primary btn-wide"
                >
                  View Lessons
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {contributors.length === 0 && (
        <div className="text-center py-20">
          <div className="avatar mb-8">
            <div className="w-24 rounded-full bg-base-200">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-500 mb-4">
            No contributors yet this week
          </h3>
          <p className="text-xl text-gray-500 mb-8">
            Be the first to share your life lessons!
          </p>
          <a href="/dashboard/add-lesson" className="btn btn-primary btn-lg">
            Start Sharing
          </a>
        </div>
      )}
    </section>
  );
};

export default TopContributors;
