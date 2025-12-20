import { useEffect, useState, useContext } from "react";
import useTitle from "../Components/usetTitle";
import { AuthContext } from "../AuthContext/AuthContext";
import LessonCard from "./LessonCard";
// import LessonCard from "../Components/LessonCard";

const PublicLessons = () => {
  useTitle("Public Life Lessons");

  const { user } = useContext(AuthContext);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3100/public-lessons")
      .then(res => res.json())
      .then(data => {
        setLessons(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading public lessons...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-5xl font-bold text-center mb-4">
        Public <span className="text-primary">Life Lessons</span>
      </h2>

      <p className="text-center text-gray-600 text-xl mb-10">
        Browse wisdom shared by people around the world
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map(lesson => (
          <LessonCard
            key={lesson._id}
            lesson={lesson}
            currentUser={user}
          />
        ))}
      </div>
    </section>
  );
};

export default PublicLessons;
