import { useEffect, useState, useContext } from "react";
import useTitle from "../Components/usetTitle";
// import { AuthContext } from "../AuthContext/AuthContext";
import LessonCard from "./LessonCard";
import useRole from "../hooks/useRole";
import { AuthContext } from "../AuthContext/AuthContext";
import Loading from "../Components/Loading";

const PublicLessons = () => {
  useTitle("Public Life Lessons");

  const { user } = useContext(AuthContext);
  const { premium } = useRole(); // get premium ONCE here
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://digital-life-lessons-server-omega.vercel.app/public-lessons")
      .then((res) => res.json())
      .then((data) => {
        setLessons(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        {/* <span className="loading loading-spinner loading-lg" /> */}
        <Loading></Loading>
      </section>
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
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson._id}
            lesson={lesson}
            isPremiumUser={!!premium} // pass premium flag
          />
        ))}
      </div>
    </section>
  );
};

export default PublicLessons;
