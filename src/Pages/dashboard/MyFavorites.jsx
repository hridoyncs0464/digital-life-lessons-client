import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import useTitle from "../../Components/usetTitle";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";

const MyFavorites = () => {
  useTitle("My Favorites");
  const { user } = useContext(AuthContext);

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setLessons([]);
      setLoading(false);
      return;
    }

    fetch(
      `http://localhost:3100/my-favorites?userId=${encodeURIComponent(
        user.uid
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLessons(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.uid]);

  const handleRemoveFavorite = (id) => {
    if (!user?.uid) return;
 
    Swal.fire({
      title: "Remove from favorites?",
      text: "This lesson will be removed from your favorites.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      const res = await fetch(
        `http://localhost:3100/lessons/${id}/favorite`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.uid }),
        }
      );
      const data = await res.json();
      if (!res.ok || !data.success) {
        Swal.fire("Error", data.message || "Failed to remove", "error");
        return;
      }

      setLessons((prev) => prev.filter((l) => l._id !== id));
      Swal.fire("Removed", "Lesson removed from favorites.", "success");
    });
  };

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        {/* <span className="loading loading-spinner loading-lg" /> */}
        <Loading></Loading>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">My Favorites</h2>

      {lessons.length === 0 ? (
        <p className="text-gray-600">
          No favorite lessons found for this filter.
        </p>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Tone</th>
                <th>Access</th>
                <th>Created</th>
                <th>Favorites</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => {
                const created = lesson.createdAt
                  ? new Date(lesson.createdAt).toLocaleDateString()
                  : "";

                return (
                  <tr key={lesson._id}>
                    <td className="font-medium">{lesson.title}</td>
                    <td>{lesson.category}</td>
                    <td>{lesson.tone}</td>
                    <td>
                      <span className="badge badge-outline">
                        {lesson.accessLevel === "premium" ? "Premium" : "Free"}
                      </span>
                    </td>
                    <td>{created}</td>
                    <td>{lesson.favoritesCount || 0}</td>
                    <td className="flex flex-wrap gap-2">
                      <button
                        className="btn btn-xs btn-outline"
                        onClick={() =>
                          window.open(`/lessons/${lesson._id}`, "_blank")
                        }
                      >
                        Details
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleRemoveFavorite(lesson._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MyFavorites;
