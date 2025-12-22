import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../../AuthContext/useAuth";
import Loading from "../../../Components/Loading";

const ReportedLessons = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null); // for modal

  const adminEmail = user?.email;

  const fetchReports = () => {
    if (!adminEmail) return;

    setLoading(true);
    fetch(
      `https://digital-life-lessons-server-omega.vercel.app/reported-lessons?email=${adminEmail}`
    )
      .then((res) => res.json())
      .then((data) => {
        setReports(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load reported lessons");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminEmail]);

  // Group reports by lessonId
  const groupedReports = useMemo(() => {
    const map = new Map();
    for (const r of reports) {
      const key = r.lessonId;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(r);
    }
    return Array.from(map.entries()).map(([lessonId, records]) => ({
      lessonId,
      reports: records,
      ignored: records.every((x) => x.ignored),
    }));
  }, [reports]);

  const handleDeleteLesson = (lessonId) => {
    if (
      !window.confirm(
        "Delete this lesson and all its reports? This action cannot be undone."
      )
    )
      return;

    fetch(
      `https://digital-life-lessons-server-omega.vercel.app/reported-lessons/${lessonId}?email=${encodeURIComponent(
        adminEmail
      )}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then(() => {
        toast.success("Lesson and its reports deleted");
        setSelectedLesson(null);
        fetchReports();
      })
      .catch(() => toast.error("Failed to delete lesson"));
  };

  const handleIgnoreSingleReport = (reportId) => {
    fetch(
      `https://digital-life-lessons-server-omega.vercel.app/reported-lessons/${reportId}?email=${encodeURIComponent(
        adminEmail
      )}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ignored: true }),
      }
    )
      .then((res) => res.json())
      .then(() => {
        toast.success("Report marked as ignored");
        fetchReports();
      })
      .catch(() => toast.error("Failed to update report"));
  };

  const handleIgnoreAllForLesson = (lessonId) => {
    // mark all reports for this lesson as ignored on frontend by calling PATCH per report
    const related = reports.filter((r) => r.lessonId === lessonId);
    if (!related.length) return;

    if (
      !window.confirm(`Ignore all ${related.length} report(s) for this lesson?`)
    )
      return;

    Promise.all(related.map((r) => handleIgnoreSingleReport(r._id))).then(
      () => {
        setSelectedLesson(null);
      }
    );
  };

  if (!adminEmail) {
    return <p className="p-4">Admin email not found. Please log in again.</p>;
  }

  if (loading)
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        {/* <span className="loading loading-spinner loading-lg" /> */}
        <Loading></Loading>
      </section>
    );

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reported / Flagged Lessons</h1>
          <p className="text-sm text-gray-500">
            Community reports that need your review.
          </p>
        </div>
        <button
          onClick={fetchReports}
          className="btn btn-sm btn-outline"
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      {groupedReports.length === 0 ? (
        <p>No reported lessons at the moment 🎉</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Lesson ID</th>
                <th>Report count</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedReports.map((group, idx) => (
                <tr key={group.lessonId}>
                  <td>{idx + 1}</td>
                  <td className="text-xs font-mono">{group.lessonId}</td>
                  <td>{group.reports.length}</td>
                  <td>
                    {group.ignored ? (
                      <span className="badge badge-ghost badge-sm">
                        All ignored
                      </span>
                    ) : (
                      <span className="badge badge-warning badge-sm">
                        Pending
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button
                        className="btn btn-xs btn-info"
                        onClick={() => setSelectedLesson(group)}
                      >
                        View details
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleDeleteLesson(group.lessonId)}
                      >
                        Delete lesson
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>#</th>
                <th>Lesson ID</th>
                <th>Report count</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {/* Modal for a single lesson's reports */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-2xl shadow-xl max-w-xl w-full p-5 relative">
            <button
              className="btn btn-xs btn-circle absolute right-3 top-3"
              onClick={() => setSelectedLesson(null)}
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-1">
              Reports for Lesson:{" "}
              <span className="font-mono text-xs">
                {selectedLesson.lessonId}
              </span>
            </h2>
            <p className="text-xs text-gray-500 mb-3">
              Total reports: {selectedLesson.reports.length}
            </p>

            <div className="max-h-72 overflow-y-auto space-y-2">
              {selectedLesson.reports.map((r) => (
                <div
                  key={r._id}
                  className="border border-base-300 rounded-xl p-3 flex justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-medium">
                      Reason: <span className="font-normal">{r.reason}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Reporter UID: {r.reporterUserId}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      At:{" "}
                      {r.timestamp
                        ? new Date(r.timestamp).toLocaleString()
                        : "Unknown"}
                    </p>
                  </div>
                  {!r.ignored && (
                    <button
                      className="btn btn-xs btn-outline self-start"
                      onClick={() => handleIgnoreSingleReport(r._id)}
                    >
                      Ignore
                    </button>
                  )}
                  {r.ignored && (
                    <span className="badge badge-ghost badge-sm self-start">
                      Ignored
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center gap-3">
              <button
                className="btn btn-sm btn-error"
                onClick={() => handleDeleteLesson(selectedLesson.lessonId)}
              >
                Delete lesson & all reports
              </button>
              <button
                className="btn btn-sm btn-outline"
                onClick={() =>
                  handleIgnoreAllForLesson(selectedLesson.lessonId)
                }
              >
                Ignore all reports
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReportedLessons;

// import React, { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";

// const ReportedLessons = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all reported lessons
//   const fetchReports = () => {
//     fetch("https://digital-life-lessons-server-omega.vercel.app/reported-lessons") // Your backend endpoint for reported lessons
//       .then((res) => res.json())
//       .then((data) => {
//         setReports(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   // Delete lesson
//   const deleteLesson = (lessonId) => {
//     if (!window.confirm("Are you sure you want to delete this lesson?")) return;

//     fetch(`https://digital-life-lessons-server-omega.vercel.app/lessons/${lessonId}`, {
//       method: "DELETE",
//     })
//       .then((res) => res.json())
//       .then(() => {
//         toast.success("Lesson deleted successfully");
//         fetchReports();
//       });
//   };

//   // Ignore report
//   const ignoreReport = (reportId) => {
//     fetch(`https://digital-life-lessons-server-omega.vercel.app/reported-lessons/${reportId}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ignored: true }),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         toast.success("Report ignored");
//         fetchReports();
//       });
//   };

//   if (loading) return <p>Loading reported lessons...</p>;

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Reported Lessons</h1>
//       <div className="overflow-x-auto">
//         <table className="table w-full">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Lesson Title</th>
//               <th>Reported By</th>
//               <th>Report Reason</th>
//               <th>Report Count</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reports.map((report, index) => (
//               <tr key={report._id}>
//                 <th>{index + 1}</th>
//                 <td>{report.title}</td>
//                 <td>
//                   {report.reports.map((r) => (
//                     <div key={r.email} className="badge badge-ghost badge-sm">
//                       {r.email}
//                     </div>
//                   ))}
//                 </td>
//                 <td>
//                   {report.reports.map((r) => (
//                     <div key={r.email} className="text-sm">
//                       {r.reason}
//                     </div>
//                   ))}
//                 </td>
//                 <td>{report.reports.length}</td>
//                 <td className="flex gap-2">
//                   <button
//                     className="btn btn-xs btn-error"
//                     onClick={() => deleteLesson(report.lessonId)}
//                   >
//                     Delete Lesson
//                   </button>
//                   <button
//                     className="btn btn-xs btn-info"
//                     onClick={() => ignoreReport(report._id)}
//                   >
//                     Ignore
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <tr>
//               <th>#</th>
//               <th>Lesson Title</th>
//               <th>Reported By</th>
//               <th>Report Reason</th>
//               <th>Report Count</th>
//               <th>Actions</th>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ReportedLessons;
