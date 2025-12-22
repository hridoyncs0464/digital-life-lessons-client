import React, { useContext, useState, useEffect, useRef } from "react";
import { useLoaderData, Link, useNavigate } from "react-router";
import { FaHeart, FaBookmark, FaFlag, FaShareAlt } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Swal from "sweetalert2";
import useTitle from "../Components/usetTitle";
import { AuthContext } from "../AuthContext/AuthContext";
import useRole from "../hooks/useRole";

const LessonDetails = () => {
  useTitle("Lesson Details");

  // Always call hooks in same order
  const lesson = useLoaderData();
  const { user, loading: authLoading } = useContext(AuthContext);
  const { premium, loading: roleLoading } = useRole();
  const navigate = useNavigate();

  // Existing state
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [views] = useState(Math.floor(Math.random() * 10000));

  // Simple comments state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [postingComment, setPostingComment] = useState(false);
  const commentInputRef = useRef(null);

  // Safe defaults if loader failed
  const {
    _id,
    title,
    shortDescription,
    category,
    tone,
    content,
    createdAt,
    updatedAt,
    author,
    featuredImage,
    accessLevel = "public",
    likes = [],
    favorites = [],
    likesCount: dbLikesCount = 0,
    favoritesCount: dbFavoritesCount = 0,
  } = lesson || {};

  // Get current URL for sharing
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  // Load comments (SIMPLE)
  const loadComments = async () => {
    if (!lesson?._id) return;
    setCommentsLoading(true);
    try {
      const res = await fetch(`http://localhost:3100/lessons/${_id}/comments`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error("Failed to load comments:", error);
    } finally {
      setCommentsLoading(false);
    }
  };

  // Post comment (SIMPLE)
  const handlePostComment = async () => {
    if (!newComment.trim() || !user) return;

    setPostingComment(true);
    try {
      const res = await fetch(`http://localhost:3100/lessons/${_id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          userEmail: user.email,
          userName: user.displayName || "Anonymous",
          userPhoto: user.photoURL || "",
          content: newComment,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNewComment("");
        commentInputRef.current?.focus();
        loadComments(); // Reload comments
      }
    } catch (error) {
      console.error("Failed to post comment");
    } finally {
      setPostingComment(false);
    }
  };

  // Redirect logic
  useEffect(() => {
    if (authLoading || roleLoading || !lesson) return;

    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    if (accessLevel === "premium" && !premium) {
      navigate("/pricing", { replace: true });
    }
  }, [authLoading, roleLoading, lesson, user, premium, accessLevel, navigate]);

  // Sync likes/favorites
  useEffect(() => {
    if (!lesson) return;

    setLikesCount(dbLikesCount);
    setFavoritesCount(dbFavoritesCount);

    if (user) {
      setLiked(likes.includes(user.uid));
      setFavorited(favorites.includes(user.uid));
    }
  }, [lesson, user, dbLikesCount, dbFavoritesCount, likes, favorites]);

  // Load comments when lesson loads
  useEffect(() => {
    if (lesson?._id) {
      loadComments();
    }
  }, [lesson?._id]);

  // Loading screen
  if (authLoading || roleLoading || !lesson) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg" />
      </section>
    );
  }

  // Existing handlers (unchanged)
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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      Swal.fire("Copied!", "Link copied to clipboard", "success");
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      Swal.fire("Copied!", "Link copied to clipboard", "success");
    }
  };

  const createdDate = createdAt ? new Date(createdAt).toLocaleDateString() : "";
  const updatedDate = updatedAt ? new Date(updatedAt).toLocaleDateString() : "";

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header / banner */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <p className="uppercase tracking-widest text-xs md:text-sm mb-2 opacity-80">
              Life Lesson {accessLevel === "premium" && "· Premium"}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
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
        <div className="bg-white rounded-3xl shadow-lg border border-purple-100 overflow-visible relative">
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
                    to={`/user-lessons/${encodeURIComponent(
                      author.email || author.name
                    )}`}
                    className="text-xs text-indigo-600 underline hover:text-primary transition-colors"
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
              <span className="badge badge-outline badge-sm">Category: {category}</span>
              <span className="badge badge-outline badge-sm">Tone: {tone}</span>
              <span className="badge badge-outline badge-sm">
                Visibility: {accessLevel === "premium" ? "Premium" : "Public"}
              </span>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4 relative z-10">
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

              <button onClick={handleReport} className="btn btn-sm btn-outline gap-2">
                <FaFlag />
                Report
              </button>

              {/* Social Share Dropdown */}
              <div className="dropdown dropdown-bottom dropdown-end ml-auto z-20">
                <label tabIndex={0} className="btn btn-sm btn-outline gap-2">
                  <FaShareAlt />
                  Share
                </label>
                <ul className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-72 z-50 border border-gray-200" tabIndex={0}>
                  <li>
                    <FacebookShareButton
                      url={shareUrl}
                      quote={`${title} - ${shortDescription?.substring(0, 100) || ""}...`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-all w-full"
                    >
                      <FacebookIcon size={28} round />
                      <span className="font-medium">Facebook</span>
                    </FacebookShareButton>
                  </li>
                  <li>
                    <TwitterShareButton
                      url={shareUrl}
                      title={`${title} - Life lesson worth sharing!`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-sky-50 transition-all w-full"
                    >
                      <TwitterIcon size={28} round />
                      <span className="font-medium">Twitter</span>
                    </TwitterShareButton>
                  </li>
                  <li>
                    <WhatsappShareButton
                      url={shareUrl}
                      title={title}
                      separator=": "
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-all w-full"
                    >
                      <WhatsappIcon size={28} round />
                      <span className="font-medium">WhatsApp</span>
                    </WhatsappShareButton>
                  </li>
                  <li>
                    <LinkedinShareButton
                      url={shareUrl}
                      title={title}
                      summary={shortDescription?.substring(0, 200) || content?.substring(0, 200)}
                      source="Digital Life Lessons"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-all w-full"
                    >
                      <LinkedinIcon size={28} round />
                      <span className="font-medium">LinkedIn</span>
                    </LinkedinShareButton>
                  </li>
                  <li>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all w-full justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">Copy Link</span>
                      </div>
                      <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* SIMPLE Comments Section */}
          <div className="border-t border-purple-100 pt-8 px-6 pb-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              💬 Comments ({comments.length})
            </h3>
            
            {/* Comment Input - Only for logged-in users */}
        
            {user && (
  <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200 mb-6">
    <div className="flex gap-4 items-start">
      <img
        src={user.photoURL || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.displayName || "User") + "&background=6366f1&color=fff&size=48"}
        alt={user.displayName}
        className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-200 mt-1 flex-shrink-0"
        onError={(e) => {
          e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.displayName || "User") + "&background=6366f1&color=fff&size=48";
        }}
      />
      <div className="flex-1">
        <textarea
          ref={commentInputRef}
          placeholder="Share your thoughts on this lesson..."
          className="textarea textarea-bordered w-full h-20 focus:textarea-primary resize-none"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={postingComment}
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handlePostComment}
            disabled={!newComment.trim() || postingComment}
            className="btn btn-primary btn-sm"
          >
            {postingComment ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              "Post Comment"
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

            {/* Show login message if not logged in */}
            {!user && (
              <div className="text-center py-8 text-gray-500 bg-purple-50 rounded-xl p-6 mb-6">
                🔐 <strong>Log in</strong> to post comments and join the conversation!
              </div>
            )}

         
<div className="space-y-4">
  {commentsLoading ? (
    <div className="flex justify-center py-12">
      <span className="loading loading-spinner loading-lg" />
    </div>
  ) : comments.length > 0 ? (
    comments.map((comment) => (
      <div key={comment._id} className="bg-white p-5 rounded-xl border border-gray-100 hover:shadow-sm">
        <div className="flex gap-3">
          <img
            src={
              comment.userPhoto && comment.userPhoto !== ""
                ? comment.userPhoto
                : "https://ui-avatars.com/api/?name=" + encodeURIComponent(comment.userName) + "&background=6366f1&color=fff&size=40"
            }
            alt={comment.userName}
            className="w-10 h-10 rounded-full object-cover ring ring-gray-200 flex-shrink-0"
            onError={(e) => {
              e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(comment.userName) + "&background=6366f1&color=fff&size=40";
            }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-gray-900 text-sm truncate">
                {comment.userName}
              </h4>
              <span className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {comment.content}
            </p>
          </div>
        </div>
      </div>
    ))
  ) : !commentsLoading ? (
    <div className="text-center py-12 text-gray-500">
      {user ? "Be the first to comment!" : "No comments yet"}
    </div>
  ) : null}
</div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonDetails;


