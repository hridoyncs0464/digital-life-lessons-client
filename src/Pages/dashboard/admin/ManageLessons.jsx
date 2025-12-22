import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../../AuthContext/useAuth";
import Loading from "../../../Components/Loading";

const ManageLessons = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [reported, setReported] = useState([]); // for flagged count
  const [loading, setLoading] = useState(true);

  // filters
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all"); // approved/pending
  const [flagFilter, setFlagFilter] = useState("all"); // flagged/clean

  const adminEmail = user?.email;

  const fetchData = () => {
    if (!adminEmail) return;

    setLoading(true);
    Promise.all([
      fetch(`http://localhost:3100/admin/lessons?email=${adminEmail}`),
      fetch(`http://localhost:3100/reported-lessons?email=${adminEmail}`),
    ])
      .then(async ([lessonsRes, reportedRes]) => {
        const lessonsData = await lessonsRes.json();
        const reportedData = await reportedRes.json();
        setLessons(lessonsData || []);
        setReported(reportedData || []);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load lessons");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminEmail]);

  // Map of lessonId -> active (not ignored) report count
  const reportedMap = useMemo(() => {
    const map = new Map();
    for (const r of reported) {
      const key = r.lessonId;
      const current = map.get(key) || 0;
      if (!r.ignored) {
        map.set(key, current + 1);
      }
    }
    return map;
  }, [reported]);

  const stats = useMemo(() => {
    const publicLessons = lessons.filter((l) => l.status === "approved").length;
    const privateLessons = lessons.filter((l) => l.status === "pending").length;
    const flaggedLessons = lessons.filter((l) =>
      reportedMap.has(l._id?.toString() || l._id)
    ).length;
    return { publicLessons, privateLessons, flaggedLessons };
  }, [lessons, reportedMap]);

  const categories = useMemo(() => {
    const set = new Set();
    lessons.forEach((l) => {
      if (l.category) set.add(l.category);
    });
    return Array.from(set);
  }, [lessons]);

  const filteredLessons = useMemo(() => {
    return lessons.filter((l) => {
      const lessonId = l._id?.toString() || l._id;
      const flaggedCount = reportedMap.get(lessonId) || 0;

      if (categoryFilter !== "all" && l.category !== categoryFilter) {
        return false;
      }
      if (visibilityFilter === "approved" && l.status !== "approved") {
        return false;
      }
      if (visibilityFilter === "pending" && l.status !== "pending") {
        return false;
      }
      if (flagFilter === "flagged" && flaggedCount === 0) {
        return false;
      }
      if (flagFilter === "clean" && flaggedCount > 0) {
        return false;
      }
      return true;
    });
  }, [lessons, categoryFilter, visibilityFilter, flagFilter, reportedMap]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this lesson permanently?")) return;

    fetch(
      `http://localhost:3100/admin/lessons/${id}?email=${encodeURIComponent(
        adminEmail
      )}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then(() => {
        toast.success("Lesson deleted");
        fetchData();
      })
      .catch(() => toast.error("Failed to delete lesson"));
  };

  // id here is requestId from lessonRequestsCollection
  const handleApprove = (requestId) => {
    if (
      !window.confirm(
        "Approve this pending lesson? It will become publicly visible."
      )
    )
      return;

    fetch(
      `http://localhost:3100/admin/approve-lesson/${requestId}?email=${encodeURIComponent(
        adminEmail
      )}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then(() => {
        toast.success("Lesson approved");
        fetchData();
      })
      .catch(() => toast.error("Failed to approve lesson"));
  };

  const handlePatchLesson = (id, patch) => {
    fetch(`http://localhost:3100/lessons/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    })
      .then((res) => res.json())
      .then(() => {
        fetchData();
      })
      .catch(() => toast.error("Update failed"));
  };

  const handleToggleFeatured = (lesson) => {
    const id = lesson._id;
    const next = !lesson.featured;
    toast.success(next ? "Marked as featured" : "Removed from featured");
    handlePatchLesson(id, { featured: next });
  };

  const handleMarkReviewed = (lesson) => {
    const id = lesson._id;
    if (lesson.reviewed) return;
    toast.success("Marked as reviewed");
    handlePatchLesson(id, { reviewed: true });
  };

  if (!adminEmail) {
    return <p className="p-4">Admin email not found. Please log in again.</p>;
  }

  if (loading) return (
      <section className="min-h-[60vh] flex items-center justify-center">
        {/* <span className="loading loading-spinner loading-lg" /> */}
        <Loading></Loading>
      </section>
    );

  return (
    <section className="space-y-6">
      {/* Header + stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manage Lessons</h1>
          <p className="text-sm text-gray-500">
            Moderate all content created by users. Approve, feature, or remove
            lessons to keep the platform safe.
          </p>
        </div>
        <button
          onClick={fetchData}
          className="btn btn-sm btn-outline"
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="stat bg-base-100 rounded-xl shadow">
          <div className="stat-title">Public lessons</div>
          <div className="stat-value text-primary">
            {stats.publicLessons}
          </div>
          <div className="stat-desc">Status: approved</div>
        </div>
        <div className="stat bg-base-100 rounded-xl shadow">
          <div className="stat-title">Pending lessons</div>
          <div className="stat-value text-warning">
            {stats.privateLessons}
          </div>
          <div className="stat-desc">Awaiting review</div>
        </div>
        <div className="stat bg-base-100 rounded-xl shadow">
          <div className="stat-title">Flagged content</div>
          <div className="stat-value text-error">
            {stats.flaggedLessons}
          </div>
          <div className="stat-desc">Reported by users</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 bg-base-100 p-3 rounded-xl shadow">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Category</span>
          </label>
          <select
            className="select select-sm select-bordered w-40"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All</option>
            {categories.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Visibility</span>
          </label>
          <select
            className="select select-sm select-bordered w-40"
            value={visibilityFilter}
            onChange={(e) => setVisibilityFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-xs">Flags</span>
          </label>
          <select
            className="select select-sm select-bordered w-40"
            value={flagFilter}
            onChange={(e) => setFlagFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="flagged">Flagged only</option>
            <option value="clean">Without flags</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Lesson</th>
              <th>Category</th>
              <th>Author</th>
              <th>Status</th>
              <th>Access</th>
              <th>Flags</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLessons.map((lesson, index) => {
              const id = lesson._id?.toString() || lesson._id;
              const flagCount =
                reportedMap.get(lesson._id?.toString() || lesson._id) || 0;

              return (
                <tr
                  key={id}
                  className={
                    lesson.status === "pending" ? "bg-base-200/60" : ""
                  }
                >
                  <td>{index + 1}</td>
                  <td>
                    <div>
                      <p className="font-semibold text-sm">{lesson.title}</p>
                      <p className="text-[11px] text-gray-500">
                        {lesson.shortDescription?.slice(0, 60) || "No summary"}
                      </p>
                    </div>
                  </td>
                  <td className="text-xs">{lesson.category}</td>
                  <td className="text-xs">
                    {lesson.author?.name || lesson.authorName || "Unknown"}
                    <br />
                    <span className="text-[11px] text-gray-500">
                      {lesson.author?.email || lesson.authorEmail}
                    </span>
                  </td>
                  <td>
                    {lesson.status === "approved" ? (
                      <span className="badge badge-success badge-sm">
                        Approved
                      </span>
                    ) : (
                      <span className="badge badge-warning badge-sm">
                        Pending
                      </span>
                    )}
                    {lesson.reviewed && (
                      <span className="badge badge-ghost badge-xs ml-1">
                        Reviewed
                      </span>
                    )}
                    {lesson.featured && (
                      <span className="badge badge-primary badge-xs ml-1">
                        Featured
                      </span>
                    )}
                  </td>
                  <td>
                    {lesson.accessLevel === "premium" ? (
                      <span className="badge badge-warning badge-sm">
                        Premium
                      </span>
                    ) : (
                      <span className="badge badge-outline badge-sm">
                        Free
                      </span>
                    )}
                  </td>
                  <td>
                    {flagCount > 0 ? (
                      <span className="badge badge-error badge-sm">
                        {flagCount} flagged
                      </span>
                    ) : (
                      <span className="badge badge-ghost badge-sm">None</span>
                    )}
                  </td>
                  <td>
                    <div className="flex justify-end gap-2 flex-wrap">
                      {lesson.status === "pending" &&
                        lesson.requestId && (
                          <button
                            className="btn btn-xs btn-success"
                            onClick={() =>
                              handleApprove(
                                lesson.requestId?.toString() || lesson.requestId
                              )
                            }
                          >
                            Approve
                          </button>
                        )}
                      {lesson.status === "pending" && !lesson.requestId && (
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() =>
                            toast("Approve via Lesson Requests page", {
                              icon: "ℹ️",
                            })
                          }
                        >
                          Approve
                        </button>
                      )}
                      <button
                        className={`btn btn-xs ${
                          lesson.featured ? "btn-outline" : "btn-secondary"
                        }`}
                        onClick={() => handleToggleFeatured(lesson)}
                      >
                        {lesson.featured ? "Unfeature" : "Feature"}
                      </button>
                      {!lesson.reviewed && (
                        <button
                          className="btn btn-xs btn-info"
                          onClick={() => handleMarkReviewed(lesson)}
                        >
                          Mark reviewed
                        </button>
                      )}
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>#</th>
              <th>Lesson</th>
              <th>Category</th>
              <th>Author</th>
              <th>Status</th>
              <th>Access</th>
              <th>Flags</th>
              <th className="text-right">Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default ManageLessons;



