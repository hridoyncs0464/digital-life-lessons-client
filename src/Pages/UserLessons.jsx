import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
// import { useTitle } from '../Components/useTitle';
import Loading from "../Components/Loading.jsx";
import useTitle from "../Components/usetTitle.js";

const UserLessons = () => {
  useTitle("User Lessons");
  const { email } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:3100/user-lessons/${encodeURIComponent(email)}`)
        .then((res) => res.json())
        .then((data) => {
          setLessons(data);
          // Extract name from first lesson or use email
          if (data.length > 0) {
            setUserName(data[0].author?.name || email);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [email]);

  if (loading) return (
      <section className="min-h-[60vh] flex items-center justify-center">
        {/* <span className="loading loading-spinner loading-lg" /> */}
        <Loading></Loading>
      </section>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <Link to="/top-contributors" className="btn btn-ghost btn-lg mb-6">
          ← Back to Top Contributors
        </Link>
        <div className="avatar mb-6">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 mx-auto">
            <img
              src={
                lessons[0]?.author?.photo ||
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop"
              }
              alt={userName}
            />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {userName}'s Lessons
        </h1>
        <p className="text-xl text-gray-600">
          {lessons.length} {lessons.length === 1 ? "lesson" : "lessons"} shared
        </p>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="card-body">
              <h3 className="card-title text-xl font-bold line-clamp-2 mb-3">
                {lesson.title}
              </h3>
              <p className="text-gray-600 line-clamp-3 mb-4">
                {lesson.shortDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <div className="badge badge-primary">{lesson.category}</div>
                {lesson.accessLevel === "premium" && (
                  <div className="badge badge-secondary">Premium</div>
                )}
                {lesson.status === "approved" && (
                  <div className="badge badge-outline">Approved</div>
                )}
              </div>

              <div className="card-actions justify-end">
                <Link
                  to={`/lessons/${lesson._id}`}
                  className="btn btn-primary btn-sm"
                >
                  Read Lesson
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {lessons.length === 0 && (
        <div className="text-center py-20">
          <div className="avatar mb-8">
            <div className="w-24 rounded-full bg-base-200 mx-auto">
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-500 mb-4">
            No lessons found
          </h3>
          <p className="text-xl text-gray-500 mb-8">
            This user hasn't shared any lessons yet.
          </p>
        </div>
      )}
    </section>
  );
};

export default UserLessons;
