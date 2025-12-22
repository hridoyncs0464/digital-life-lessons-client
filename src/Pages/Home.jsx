import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import FeaturedLessons from "./FeaturedLessons";
import useTitle from "../Components/usetTitle";
import TopContributors from "./TopContributors";
import MostSavedLessons from "../Components/MostSavedLessons";

const featuredLessonsPromise = fetch(
  "https://digital-life-lessons-server-omega.vercel.app/featured-lessons"
).then((res) => res.json());

const heroSlides = [
  {
    title: "Capture Lifes Most Valuable Lessons",
    desc: "Create and preserve meaningful life lessons, reflections, and personal wisdom so they are never forgotten.",
    img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
    link: "/public-lessons",
    btn: "Explore Lessons",
  },
  {
    title: "Learn From Real Experiences",
    desc: "Discover public life lessons shared by people around the world on growth, mistakes, mindset, and relationships.",
    img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
    link: "/public-lessons",
    btn: "Browse Public Lessons",
  },
  {
    title: "Turn Reflections Into Growth",
    desc: "Organize your lessons, track learning progress, react, comment, and save insights that matter most to you.",
    img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    link: "/dashboard",
    btn: "Go to Dashboard",
  },
  {
    title: "Share Wisdom With the Community",
    desc: "Make your lessons public to inspire others or keep them private for personal reflection.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    link: "/dashboard/add-lesson",
    btn: "Add a Lesson",
  },
  {
    title: "Save Lessons That Inspire You",
    desc: "Mark your favorite lessons and build a personal collection of wisdom you can revisit anytime.",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    link: "/dashboard/my-favorites",
    btn: "View Favorites",
  },
  {
    title: "Unlock Premium Wisdom ",
    desc: "Access exclusive premium lessons and create premium content by upgrading to the Premium plan.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    link: "/pricing",
    btn: "Upgrade to Premium",
  },
];

const Home = () => {
  useTitle("Home");

  const [currentSlide, setCurrentSlide] = useState(0);

  // auto-slide WITHOUT changing URL/hash
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goPrev = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const goNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const slide = heroSlides[currentSlide];

  return (
    <div>
      {/* Hero Slider */}
      <section className="max-w-7xl mx-auto px-4 mt-3">
        <div className="relative w-full h-105 rounded-xl overflow-hidden">
          <img
            src={slide.img}
            className="w-full h-full object-cover"
            alt={slide.title}
          />

          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="text-white px-10 max-w-xl">
              <h2 className="text-4xl font-bold">{slide.title}</h2>
              <p className="mt-3">{slide.desc}</p>
              <NavLink to={slide.link} className="btn btn-primary mt-5">
                {slide.btn}
              </NavLink>
            </div>
          </div>

          {/* manual controls */}
          <div className="absolute flex justify-between items-center left-5 right-5 top-1/2 -translate-y-1/2">
            <button onClick={goPrev} className="btn btn-circle">
              ❮
            </button>
            <button onClick={goNext} className="btn btn-circle">
              ❯
            </button>
          </div>

          {/* dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === currentSlide ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured lessons */}
      <FeaturedLessons lessonsPromise={featuredLessonsPromise} />
      <TopContributors></TopContributors>
      <MostSavedLessons></MostSavedLessons>

      {/* Why learning matters section (your existing extra sections) */}
      <section className="max-w-7xl mx-auto px-4 py-5">
        {/* ...keep your existing 4-card content here unchanged... */}
      </section>
    </div>
  );
};

export default Home;
