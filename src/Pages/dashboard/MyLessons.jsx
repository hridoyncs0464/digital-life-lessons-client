import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import useTitle from "../../Components/usetTitle";
import useRole from "../../hooks/useRole";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";

const MyLessons = () => {
  useTitle("My Lessons");
  const { user } = useContext(AuthContext);
  const { premium } = useRole();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLesson, setEditingLesson] = useState(null);

  // Load lessons for current user
  useEffect(() => {
    if (!user?.email) {
      setLessons([]);
      setLoading(false);
      return;
    }

    fetch(
      `https://digital-life-lessons-server-omega.vercel.app/my-lessons?email=${encodeURIComponent(
        user.email
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLessons(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this lesson?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (!result.isConfirmed) return;

      fetch(
        `https://digital-life-lessons-server-omega.vercel.app/lessons/${id}`,
        {
          method: "DELETE",
        }
      )
        .then(async (res) => {
          const data = await res.json().catch(() => ({}));

          if (!res.ok || data.success === false) {
            throw new Error(data.message || `Status ${res.status}`);
          }

          setLessons((prev) =>
            prev.filter((l) => l._id === undefined || l._id !== id)
          );

          Swal.fire("Deleted!", "Lesson removed.", "success");
        })
        .catch((err) => {
          Swal.fire("Error", err.message || "Failed to delete lesson", "error");
        });
    });
  };

  const handleInlineChange = (id, field, value) => {
    setLessons((prev) =>
      prev.map((l) => (l._id === id ? { ...l, [field]: value } : l))
    );
  };

  const saveInlineChange = (lesson) => {
    fetch(
      `https://digital-life-lessons-server-omega.vercel.app/lessons/${lesson._id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          visibility: lesson.visibility || "public",
          accessLevel: lesson.accessLevel || "public",
        }),
      }
    )
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Updated", "Lesson settings updated", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update lesson", "error");
      });
  };

  const openEditModal = (lesson) => {
    setEditingLesson(lesson);
  };

  const handleEditFieldChange = (field, value) => {
    setEditingLesson((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateLesson = (e) => {
    e.preventDefault();
    if (!editingLesson) return;

    const payload = {
      title: editingLesson.title,
      category: editingLesson.category,
      tone: editingLesson.tone,
      content: editingLesson.content,
      accessLevel: editingLesson.accessLevel,
      visibility: editingLesson.visibility || "public",
      featuredImage: editingLesson.featuredImage || "",
    };

    fetch(
      `https://digital-life-lessons-server-omega.vercel.app/lessons/${editingLesson._id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    )
      .then((res) => res.json())
      .then(() => {
        // IMPORTANT: update local state here
        setLessons((prev) =>
          prev.map((l) =>
            l._id === editingLesson._id ? { ...l, ...payload } : l
          )
        );
        Swal.fire("Updated", "Lesson updated successfully", "success");
        setEditingLesson(null);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update lesson", "error");
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
      <h2 className="text-2xl font-bold mb-6">My Lessons</h2>

      {lessons.length === 0 ? (
        <p className="text-gray-600">You have not created any lessons yet.</p>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Access</th>
                <th>Visibility</th>
                <th>Created</th>
                <th>Reactions</th>
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

                    {/* Access level (free/premium) */}
                    <td>
                      <select
                        className="select select-xs"
                        value={lesson.accessLevel || "public"}
                        onChange={(e) => {
                          const value = e.target.value;
                          // only allow premium access if user is premium
                          if (value === "premium" && !premium) {
                            Swal.fire(
                              "Premium only",
                              "Upgrade your account to set lessons as premium.",
                              "info"
                            );
                            return;
                          }
                          handleInlineChange(lesson._id, "accessLevel", value);
                          saveInlineChange({
                            ...lesson,
                            accessLevel: value,
                          });
                        }}
                      >
                        <option value="public">Free</option>
                        <option value="premium">Premium</option>
                      </select>
                    </td>

                    {/* Visibility public/private */}
                    <td>
                      <select
                        className="select select-xs"
                        value={lesson.visibility || "public"}
                        onChange={(e) => {
                          const value = e.target.value;
                          handleInlineChange(lesson._id, "visibility", value);
                          saveInlineChange({
                            ...lesson,
                            visibility: value,
                          });
                        }}
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                    </td>

                    <td>{created}</td>
                    <td>{lesson.likesCount || 0}</td>
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
                        className="btn btn-xs"
                        onClick={() => openEditModal(lesson)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleDelete(lesson._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit modal */}
      {editingLesson && (
        <dialog open className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Update Lesson</h3>
            <form onSubmit={handleUpdateLesson} className="space-y-3">
              <div>
                <label className="label">Title</label>
                <input
                  className="input input-bordered w-full"
                  value={editingLesson.title || ""}
                  onChange={(e) =>
                    handleEditFieldChange("title", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="label">Category</label>
                <input
                  className="input input-bordered w-full"
                  value={editingLesson.category || ""}
                  onChange={(e) =>
                    handleEditFieldChange("category", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="label">Emotional Tone</label>
                <input
                  className="input input-bordered w-full"
                  value={editingLesson.tone || ""}
                  onChange={(e) =>
                    handleEditFieldChange("tone", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="label">Content</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={4}
                  value={editingLesson.content || ""}
                  onChange={(e) =>
                    handleEditFieldChange("content", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Access Level</label>
                  <select
                    className="select select-bordered w-full"
                    value={editingLesson.accessLevel || "public"}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "premium" && !premium) {
                        Swal.fire(
                          "Premium only",
                          "Upgrade your account to set lessons as premium.",
                          "info"
                        );
                        return;
                      }
                      handleEditFieldChange("accessLevel", value);
                    }}
                  >
                    <option value="public">Free</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <div>
                  <label className="label">Visibility</label>
                  <select
                    className="select select-bordered w-full"
                    value={editingLesson.visibility || "public"}
                    onChange={(e) =>
                      handleEditFieldChange("visibility", e.target.value)
                    }
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label">Featured Image URL (optional)</label>
                <input
                  className="input input-bordered w-full"
                  value={editingLesson.featuredImage || ""}
                  onChange={(e) =>
                    handleEditFieldChange("featuredImage", e.target.value)
                  }
                />
              </div>

              <div className="modal-action">
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={() => setEditingLesson(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </section>
  );
};

export default MyLessons;
