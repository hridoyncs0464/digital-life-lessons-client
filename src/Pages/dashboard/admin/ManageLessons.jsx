import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ManageLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all lessons from backend
  const fetchLessons = () => {
    fetch("http://localhost:3100/lessons") // adjust if needed
      .then((res) => res.json())
      .then((data) => {
        setLessons(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  // Delete lesson
  const deleteLesson = (id) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    fetch(`http://localhost:3100/lessons/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Lesson deleted successfully");
        fetchLessons();
      });
  };

  // Mark as featured
  const markFeatured = (id) => {
    fetch(`http://localhost:3100/lessons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: true }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Lesson marked as featured");
        fetchLessons();
      });
  };

  // Mark as reviewed
  const markReviewed = (id) => {
    fetch(`http://localhost:3100/lessons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviewed: true }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Lesson marked as reviewed");
        fetchLessons();
      });
  };

  if (loading) return <p>Loading lessons...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Lessons</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Visibility</th>
              <th>Access</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <th>{index + 1}</th>
                <td>{lesson.title}</td>
                <td>{lesson.category}</td>
                <td>{lesson.author}</td>
                <td>{lesson.status}</td>
                <td>{lesson.premium ? "Premium ⭐" : "Free"}</td>
                <td className="flex gap-2">
                  {!lesson.featured && (
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => markFeatured(lesson._id)}
                    >
                      Feature
                    </button>
                  )}
                  {!lesson.reviewed && (
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => markReviewed(lesson._id)}
                    >
                      Review
                    </button>
                  )}
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => deleteLesson(lesson._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Visibility</th>
              <th>Access</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ManageLessons;
