import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "./Loading.jsx";

const MostSavedLessonsPromise = fetch(
  "https://digital-life-lessons-server-omega.vercel.app/most-saved-lessons"
).then((res) => res.json());

const MostSavedLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MostSavedLessonsPromise.then((data) => {
      setLessons(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <Loading message="Loading most saved lessons..." />
      </div>
    );
  }

  const totalSaves = lessons.reduce(
    (sum, lesson) => sum + (lesson.favoritesCount || 0),
    0
  );
  const maxSaves = lessons[0]?.favoritesCount || 1;

  return (
    <section className="py-5 bg-gradient-to-b from-base-100 to-base-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Most Saved Lessons
          </h2>
          <p className="text-xl text-gray-600 font-semibold mb-6">
            Community leaderboard - top favorited lessons
          </p>

          {/* Live Stats */}
          <div className="stats shadow-lg w-full max-w-md mx-auto bg-gradient-to-r from-primary to-secondary text-primary-content">
            <div className="stat place-items-center">
              <div className="stat-title">Total Saves</div>
              <div className="stat-value text-2xl">
                {totalSaves.toLocaleString()}
              </div>
              <div className="stat-desc">{lessons.length} lessons ranked</div>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto rounded-3xl shadow-2xl bg-white/80 backdrop-blur-xl border border-white/50">
          <table className="table table-lg w-full">
            {/* Header */}
            <thead className="bg-gradient-to-r from-primary to-secondary text-primary-content">
              <tr>
                <th className="font-bold text-lg">#</th>
                <th className="font-bold text-lg">Lesson</th>
                <th className="font-bold text-lg text-center">Saves</th>
                <th className="font-bold text-lg text-center">Likes</th>
                <th className="font-bold text-lg">Author</th>
              </tr>
            </thead>

            <tbody>
              {lessons.map((lesson, idx) => {
                const savePercentage =
                  ((lesson.favoritesCount || 0) / maxSaves) * 100;

                return (
                  <tr
                    key={lesson._id.$oid || lesson._id}
                    className="hover group"
                  >
                    {/* Rank Column - Gold/Silver/Bronze */}
                    <th className="text-2xl font-black text-center">
                      <div
                        className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-all`}
                      >
                        {idx === 0 && (
                          <svg
                            className="w-8 h-8 text-yellow-400 drop-shadow-lg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        )}
                        {idx === 1 && (
                          <svg
                            className="w-6 h-6"
                            fill="#C0C0C0"
                            viewBox="0 0 20 20"
                          >
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13H9v2h1v2h2v-2h1V5h-2v2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        {idx === 2 && (
                          <svg
                            className="w-6 h-6"
                            fill="#CD7F32"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976c.419-.491.672-1.102.723-1.745a3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <span className="text-sm mt-1 block">{idx + 1}</span>
                      </div>
                    </th>

                    {/* Lesson Title */}
                    <td className="max-w-md">
                      <Link
                        to={`/lessons/${lesson._id.$oid || lesson._id}`}
                        className="font-bold text-xl hover:text-primary transition-colors line-clamp-2"
                      >
                        {lesson.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {lesson.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="badge badge-outline badge-sm">
                          {lesson.category}
                        </span>
                        {lesson.accessLevel === "premium" && (
                          <span className="badge badge-secondary badge-sm">
                            Premium
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Saves Column with Progress Bar */}
                    <td className="text-center">
                      <div className="font-bold text-2xl text-primary mb-2">
                        {lesson.favoritesCount || 0}
                      </div>
                      <div className="w-24 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700 shadow-md"
                          style={{ width: `${Math.min(savePercentage, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round(savePercentage)}% of #1
                      </div>
                    </td>

                    {/* Likes */}
                    <td className="text-center font-semibold text-lg text-success">
                      {lesson.likesCount || 0}
                    </td>

                    {/* Author */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 rounded-full ring ring-gray-200">
                            <img
                              src={
                                lesson.author.photo ||
                                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&fit=crop"
                              }
                              alt={lesson.author.name}
                            />
                          </div>
                        </div>
                        <span className="font-semibold text-gray-800">
                          {lesson.author.name}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {lessons.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
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
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-500 mb-4">
              No saved lessons yet
            </h3>
            <p className="text-xl text-gray-500 mb-8">
              Start exploring lessons to see community favorites.
            </p>
            <Link to="/public-lessons" className="btn btn-primary btn-lg">
              Browse Lessons
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default MostSavedLessons;
