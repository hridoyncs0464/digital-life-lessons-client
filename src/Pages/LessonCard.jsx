import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const LessonCard = ({ lesson, currentUser }) => {
  const {
    _id,
    title,
    category,
    tone,
    accessLevel,
    content,
    createdAt,
    author,
  } = lesson;

  const isPremiumLesson = accessLevel === "premium";
  const isLocked = isPremiumLesson && !currentUser?.isPremium;

  const previewText = content
    ? content.slice(0, 90) + "..."
    : "No preview available";

  const createdDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : "";

  return (
    <div className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-purple-100">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-indigo-500" />

      {/* Lock overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center px-4">
          <FaLock className="text-4xl text-primary mb-3" />
          <p className="font-semibold text-gray-700">
            Premium Lesson – Upgrade to view
          </p>
          <Link to="/pricing" className="btn btn-primary btn-sm mt-3">
            Upgrade
          </Link>
        </div>
      )}

      <div className={`p-5 flex flex-col h-full ${isLocked ? "blur-sm pointer-events-none" : ""}`}>
        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 text-gray-900">
          {title}
        </h3>

        {/* Meta */}
        <div className="text-xs text-gray-600 mb-2 space-y-1">
          <p>
            <span className="font-semibold">Category:</span> {category}
          </p>
          <p>
            <span className="font-semibold">Emotional Tone:</span> {tone}
          </p>
          <p>
            <span className="font-semibold">Access:</span>{" "}
            {isPremiumLesson ? "Premium" : "Public"}
          </p>
        </div>

        {/* Preview */}
        <p className="text-sm text-gray-700 mb-4">
          {previewText}
        </p>

        {/* Footer: author + date */}
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            {/* Only show avatar if photo exists */}
            {author?.photo && (
              <img
                src={author.photo}
                alt={author?.name}
                className="w-8 h-8 rounded-full object-cover border border-purple-200"
              />
            )}
            <div>
              <p className="font-medium text-gray-800">
                {author?.name || "Unknown Author"}
              </p>
              {createdDate && <p>{createdDate}</p>}
            </div>
          </div>

          <Link
            to={`/lessons/${_id}`}
            className="btn btn-outline btn-primary btn-xs"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
