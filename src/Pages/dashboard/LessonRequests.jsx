import { useEffect, useState } from "react";
import useAuth from "../../AuthContext/useAuth";

const LessonRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3100/admin/lesson-requests?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      });
  }, [user]);

  const handleApprove = (id) => {
    fetch(`http://localhost:3100/admin/approve-lesson/${id}?email=${user.email}`, {
      method: "PATCH",
    })
      .then(res => res.json())
      .then(() => {
        setRequests(prev => prev.filter(item => item._id !== id));
      });
  };

  if (loading) return <p>Loading lesson requests...</p>;

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
              {requests.map(req => (
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
