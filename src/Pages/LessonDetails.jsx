import React, { useContext, useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router";
import { AuthContext } from "../AuthContext/AuthContext";
import { FaHeart, FaBookmark, FaFlag, FaShareAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useTitle from "../Components/usetTitle";

const LessonDetails = () => {
  useTitle("Lesson Details");

  const lesson = useLoaderData();
  const { user } = useContext(AuthContext);

  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [views] = useState(Math.floor(Math.random() * 10000));

  if (!lesson) return null;

  const {
    _id,
    title,
    category,
    tone,
    content,
    createdAt,
    updatedAt,
    author,
    featuredImage,
    likes = [],
    favorites = [],
    likesCount: dbLikesCount = 0,
    favoritesCount: dbFavoritesCount = 0,
  } = lesson;

  useEffect(() => {
    setLikesCount(dbLikesCount);
    setFavoritesCount(dbFavoritesCount);

    if (user) {
      setLiked(likes.includes(user.uid));
      setFavorited(favorites.includes(user.uid));
    }
  }, [lesson, user, dbLikesCount, dbFavoritesCount, likes, favorites]);

  const handleLike = async () => {
    if (!user) {
      Swal.fire("Info", "Please log in to like", "info");
      return;
    }

    const res = await fetch(`http://localhost:3100/lessons/${_id}/like`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.uid }),
    });

    const data = await res.json();
    if (data.success) {
      setLiked(!liked);
      setLikesCount(data.likesCount);
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      Swal.fire("Info", "Please log in to save favorites", "info");
      return;
    }

    const res = await fetch(`http://localhost:3100/lessons/${_id}/favorite`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.uid }),
    });

    const data = await res.json();
    if (data.success) {
      setFavorited(!favorited);
      setFavoritesCount(data.favoritesCount);
    }
  };

  const handleReport = () => {
    Swal.fire({
      title: "Report Lesson",
      input: "select",
      inputOptions: {
        "Inappropriate Content": "Inappropriate Content",
        "Hate Speech or Harassment": "Hate Speech or Harassment",
        "Misleading or False Information": "Misleading or False Information",
        Spam: "Spam or Promotional Content",
        Sensitive: "Sensitive or Disturbing Content",
        Other: "Other",
      },
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed && user) {
        await fetch(`http://localhost:3100/lessons/${_id}/report`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.uid, reason: result.value }),
        });
        Swal.fire("Reported", "Lesson has been reported.", "success");
      }
    });
  };

  const createdDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : "";
  const updatedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString()
    : "";

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header / banner */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <p className="uppercase tracking-widest text-xs md:text-sm mb-2 opacity-80">
              Life Lesson
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {title}
            </h1>
            <p className="text-sm md:text-base text-indigo-100">
              Category: <span className="font-semibold">{category}</span> ·
              Emotional tone: <span className="font-semibold">{tone}</span>
            </p>
            <p className="text-xs md:text-sm text-indigo-100 mt-2">
              Created: {createdDate}
              {updatedDate && <> · Updated: {updatedDate}</>}
            </p>
          </div>

          {featuredImage && (
            <div className="w-full md:w-56 h-40 md:h-44 rounded-2xl overflow-hidden ring-4 ring-white/30 shadow-lg">
              <img
                src={featuredImage}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Main card */}
        <div className="bg-white rounded-3xl shadow-lg border border-purple-100 overflow-hidden">
          {/* Author + stats bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
            <div className="flex items-center gap-3">
              {author?.photo && (
                <img
                  src={author.photo}
                  alt={author?.name}
                  className="w-12 h-12 rounded-full object-cover border border-purple-200"
                />
              )}
              <div>
                <p className="font-semibold text-gray-800">
                  {author?.name || "Unknown Author"}
                </p>
                {author?.name && (
                  <Link
                    to={`/author/${encodeURIComponent(author.name)}`}
                    className="text-xs text-indigo-600 underline"
                  >
                    View all lessons by this author
                  </Link>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              <span>❤️ {likesCount.toLocaleString()} Likes</span>
              <span>🔖 {favoritesCount.toLocaleString()} Favorites</span>
              <span>👀 {views.toLocaleString()} Views</span>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 md:py-8">
            <article className="prose max-w-none prose-p:text-gray-700">
              <p className="whitespace-pre-line leading-relaxed text-gray-700">
                {content}
              </p>
            </article>

            {/* Meta chips */}
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <span className="badge badge-outline badge-sm">
                Category: {category}
              </span>
              <span className="badge badge-outline badge-sm">
                Tone: {tone}
              </span>
              <span className="badge badge-outline badge-sm">
                Visibility: Public
              </span>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={handleLike}
                className={`btn btn-sm gap-2 ${
                  liked ? "btn-error text-white" : "btn-outline"
                }`}
              >
                <FaHeart />
                {liked ? "Liked" : "Like"} ({likesCount})
              </button>

              <button
                onClick={handleFavorite}
                className={`btn btn-sm gap-2 ${
                  favorited ? "btn-warning text-white" : "btn-outline"
                }`}
              >
                <FaBookmark />
                {favorited ? "Saved" : "Save"} ({favoritesCount})
              </button>

              <button
                onClick={handleReport}
                className="btn btn-sm btn-outline gap-2"
              >
                <FaFlag />
                Report
              </button>

              <button
                onClick={() => {
                  // basic share (later you can integrate react-share)
                  navigator.share?.({
                    title,
                    text: "Check out this life lesson",
                    url: window.location.href,
                  });
                }}
                className="btn btn-sm btn-outline gap-2 ml-auto"
              >
                <FaShareAlt />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonDetails;
