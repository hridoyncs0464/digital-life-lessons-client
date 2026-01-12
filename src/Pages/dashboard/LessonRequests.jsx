import { useEffect, useState } from "react";
import useAuth from "../../AuthContext/useAuth";
import Loading from "../../Components/Loading";

const LessonRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `https://digital-life-lessons-server-omega.vercel.app/admin/lesson-requests?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      });
  }, [user]);

  const handleApprove = (id) => {
    fetch(
      `https://digital-life-lessons-server-omega.vercel.app/admin/approve-lesson/${id}?email=${user.email}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then(() => {
        setRequests((prev) => prev.filter((item) => item._id !== id));
      });
  };

  if (loading)
    <section className="min-h-[60vh] flex items-center justify-center">
      {/* <span className="loading - loading-lg" /> */}
      <Loading></Loading>
    </section>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lesson Requests</h2>
      {requests.length === 0 ? (
        <p>No pending lesson requests.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>User Email</th>
                <th>Title</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.authorEmail}</td>
                  <td>{req.title}</td>
                  <td>{req.category}</td>
                  <td>
                    <button
                      onClick={() => handleApprove(req._id)}
                      className="btn btn-success btn-sm"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LessonRequests;
