import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ReportedLessons = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all reported lessons
  const fetchReports = () => {
    fetch("http://localhost:3100/reported-lessons") // Your backend endpoint for reported lessons
      .then((res) => res.json())
      .then((data) => {
        setReports(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Delete lesson
  const deleteLesson = (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    fetch(`http://localhost:3100/lessons/${lessonId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Lesson deleted successfully");
        fetchReports();
      });
  };

  // Ignore report
  const ignoreReport = (reportId) => {
    fetch(`http://localhost:3100/reported-lessons/${reportId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ignored: true }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Report ignored");
        fetchReports();
      });
  };

  if (loading) return <p>Loading reported lessons...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reported Lessons</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Lesson Title</th>
              <th>Reported By</th>
              <th>Report Reason</th>
              <th>Report Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={report._id}>
                <th>{index + 1}</th>
                <td>{report.title}</td>
                <td>
                  {report.reports.map((r) => (
                    <div key={r.email} className="badge badge-ghost badge-sm">
                      {r.email}
                    </div>
                  ))}
                </td>
                <td>
                  {report.reports.map((r) => (
                    <div key={r.email} className="text-sm">
                      {r.reason}
                    </div>
                  ))}
                </td>
                <td>{report.reports.length}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => deleteLesson(report.lessonId)}
                  >
                    Delete Lesson
                  </button>
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => ignoreReport(report._id)}
                  >
                    Ignore
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>#</th>
              <th>Lesson Title</th>
              <th>Reported By</th>
              <th>Report Reason</th>
              <th>Report Count</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ReportedLessons;
