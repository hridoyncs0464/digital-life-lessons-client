import { use } from "react";
import LessonCard from "./LessonCard";
import { Link } from "react-router";

const FeaturedLessons = ({ lessonsPromise, currentUser }) => {
  const lessons = use(lessonsPromise);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4">
          Featured <span className="text-primary">Life Lessons</span>
        </h2>

        <p className="text-center font-bold text-2xl text-gray-600 mb-8">
          Wisdom shared by real people from real experiences
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson._id}
              lesson={lesson}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-10">
        <Link to="/public-lessons" className="btn btn-primary">
          Browse All Lessons
        </Link>
      </div>
    </section>
  );
};

export default FeaturedLessons;
