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

  return (
    <div className="relative bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition overflow-hidden">
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

      <div className={isLocked ? "blur-sm pointer-events-none" : ""}>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>

        <p className="text-sm text-gray-600 mb-1">
          <strong>Category:</strong> {category}
        </p>

        <p className="text-sm text-gray-600 mb-1">
          <strong>Emotional Tone:</strong> {tone}
        </p>

        <p className="text-sm text-gray-600 mb-1">
          <strong>Access:</strong> {isPremiumLesson ? "Premium" : "Public"}
        </p>

        <p className="text-sm text-gray-500 mb-3">{previewText}</p>

        <div className="flex items-center gap-3 mb-3">
          <img
            src={author?.photo}
            alt={author?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium">{author?.name}</p>
            <p className="text-xs text-gray-500">
              {createdAt && new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <Link
          to={`/lessons/${_id}`}
          className="btn btn-outline btn-primary btn-sm w-full"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default LessonCard;
