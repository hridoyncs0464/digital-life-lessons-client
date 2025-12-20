import React, { useEffect } from "react";
import { Link, NavLink } from "react-router";
import Recentbills from "./FeaturedLessons";
import useTitle from "../Components/usetTitle";
import WhyChooseUs from "../Components/WhyChooseUs";
import HowItWorks from "../Components/HowItWorks";
import FeaturedLessons from "./FeaturedLessons";

const featuredLessonsPromise = fetch(
  "http://localhost:3100/featured-lessons"
).then((res) => res.json());
/* ===== Slider Data (Digital Life Lessons) ===== */
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

  /* ===== Auto Slide ===== */
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % heroSlides.length;
      window.location.hash = `slide${index}`;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* ===== Hero Slider ===== */}
      <section className="max-w-7xl mx-auto px-4 mt-3">
        <div className="carousel w-full h-105 rounded-xl overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              id={`slide${index}`}
              className="carousel-item relative w-full"
            >
              <img
                src={slide.img}
                className="w-full object-cover"
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

              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a
                  href={`#slide${
                    (index - 1 + heroSlides.length) % heroSlides.length
                  }`}
                  className="btn btn-circle"
                >
                  ❮
                </a>
                <a
                  href={`#slide${(index + 1) % heroSlides.length}`}
                  className="btn btn-circle"
                >
                  ❯
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

  



      {/* ===== Recent Bills ===== */}
<FeaturedLessons lessonsPromise={featuredLessonsPromise} />
    {/* ===== Category Section (UNCHANGED) ===== */}
   
   <section className="max-w-7xl mx-auto px-4 py-5">
  <div className="text-center mb-10">
    <h2 className="text-5xl font-bold text-gray-800">
      Why Learning From <span className="text-primary">Life Matters</span>
    </h2>
    <p className="mt-3 font-bold text-2xl text-gray-600">
      Real experiences shape wisdom more deeply than theory ever can.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Reflection */}
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition">
      <figure className="p-6">
        <img
          src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe"
          alt="Self Reflection"
          className="h-48 object-cover rounded-md"
        />
      </figure>
      <div className="card-body text-center">
        <h3 className="text-xl font-semibold">Encourages Self-Reflection</h3>
        <p className="text-gray-600">
          Writing down life lessons helps you reflect on experiences and gain
          clarity about your thoughts, actions, and growth.
        </p>
      </div>
    </div>

    {/* Growth */}
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition">
      <figure className="p-6">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="Personal Growth"
          className="h-48 object-cover rounded-md"
        />
      </figure>
      <div className="card-body text-center">
        <h3 className="text-xl font-semibold">Builds Personal Growth</h3>
        <p className="text-gray-600">
          Learning from past mistakes and successes helps you make better
          decisions and grow emotionally and mentally.
        </p>
      </div>
    </div>

    {/* Wisdom Sharing */}
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition">
      <figure className="p-6">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
          alt="Shared Wisdom"
          className="h-48 object-cover rounded-md"
        />
      </figure>
      <div className="card-body text-center">
        <h3 className="text-xl font-semibold">Spreads Shared Wisdom</h3>
        <p className="text-gray-600">
          Sharing life lessons allows others to learn from real experiences,
          creating a supportive and mindful community.
        </p>
      </div>
    </div>

    {/* Memory */}
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition">
      <figure className="p-6">
        <img
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
          alt="Memory Preservation"
          className="h-48 object-cover rounded-md"
        />
      </figure>
      <div className="card-body text-center">
        <h3 className="text-xl font-semibold">Preserves Valuable Memories</h3>
        <p className="text-gray-600">
          Important lessons can fade with time. Storing them ensures your
          personal wisdom stays accessible whenever you need it.
        </p>
      </div>
    </div>
  </div>
</section>
  // here the extra 2 sections will apear
    </div>
  );
};

export default Home;





// import React from "react";
// import { Link, NavLink } from "react-router";
// import Recentbills from "./Recentbills";
// import useTitle from "../Components/usetTitle";
// import WhyChooseUs from "../Components/WhyChooseUs";
// import HowItWorks from "../Components/HowItWorks";
// const RecentbillsPromise =  fetch('https://utility-bill-sys-server.vercel.app/recent-bills').then(res => res.json());

// const Home = () => {
//  useTitle("Home");

//   return (
//     <div>
    
//       <section className="max-w-7xl mx-auto px-4 mt-3">
//         <div className="carousel w-full h-[420px] rounded-xl overflow-hidden">

//           {/* ===== Slide 1 ===== */}
//           <div id="slide1" className="carousel-item relative w-full">
//             <img
//               src="https://media.istockphoto.com/id/2078490118/photo/businessman-using-laptop-to-online-payment-banking-and-online-shopping-financial-transaction.webp?a=1&b=1&s=612x612&w=0&k=20&c=gFVtiayH02VWwnw3auJt-duSGp-kM4ZLu9OCPvHHNrU="
//               className="w-full object-cover"
//             />
//             <div className="absolute inset-0 bg-black/50 flex items-center">
//               <div className="text-white px-10 max-w-xl">
//                 <h2 className="text-4xl font-bold">
//                   Pay Utility Bills Easily
//                 </h2>
//                 <p className="mt-3">
//                   Manage Electricity, Gas, Water, and Internet bills from one
//                   secure platform.
//                 </p>
//                 <NavLink  to="/all-bills" className="btn btn-primary mt-5">
//                   View Bills
//                 </NavLink>
//               </div>
//             </div>   

//             <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//               <a href="#slide3" className="btn btn-circle">❮</a>
//               <a href="#slide2" className="btn btn-circle">❯</a>
//             </div>
//           </div>

//           {/* ===== Slide 2 ===== */}
//           <div id="slide2" className="carousel-item relative w-full">
//             <img
//               src="https://images.unsplash.com/photo-1625980344922-a4df108b2bd0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXRpbGl0eSUyMGJpbGx8ZW58MHx8MHx8fDA%3D"
//               className="w-full object-cover"
//             />
//             <div className="absolute inset-0 bg-black/50 flex items-center">
//               <div className="text-white px-10 max-w-xl">
//                 <h2 className="text-4xl font-bold">
//                   Pay Only Current Month Bills
//                 </h2>
//                 <p className="mt-3">
//                   The system ensures you can pay bills only for the current
//                   month, avoiding advance or outdated payments.
//                 </p>
//                 <Link to="/bills" className="btn btn-primary mt-5">
//                   Pay Now
//                 </Link>
//               </div>
//             </div>

//             <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//               <a href="#slide1" className="btn btn-circle">❮</a>
//               <a href="#slide3" className="btn btn-circle">❯</a>
//             </div>
//           </div>

                                           
//           <div id="slide3" className="carousel-item relative w-full">
//             <img
//               src="https://images.unsplash.com/photo-1571867424488-4565932edb41?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fG9ubGluZSUyMHBheXxlbnwwfHwwfHx8MA%3D%3D"
//               className="w-full object-cover"
//             />
//             <div className="absolute inset-0 bg-black/50 flex items-center">
//               <div className="text-white px-10 max-w-xl">
//                 <h2 className="text-4xl font-bold">
//                   Track & Download Payment Reports
//                 </h2>
//                 <p className="mt-3">
//                   View your paid bill history and download PDF reports anytime
//                   for future reference.
//                 </p>
//                 <Link to="/my-pay-bills" className="btn btn-primary mt-5">
//                   My Pay Bills
//                 </Link>
//               </div>
//             </div>

//             <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//               <a href="#slide2" className="btn btn-circle">❮</a>
//               <a href="#slide1" className="btn btn-circle">❯</a>
//             </div>
//           </div>

//         </div>
//       </section>


// {/* ===== Category Section (Static) ===== */}
// <section className="max-w-7xl mx-auto px-4 py-5">
//   <div className="text-center mb-10">
//     <h2 className="text-5xl font-bold text-gray-800">
//       Utility <span className="text-primary">Bill</span> Categories
//     </h2>
//     <p className="mt-3  font-bold text-2xl text-gray-600">
//       Different types of utility bills supported by the system.
//     </p>
//   </div>

//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">

//     {/* Electricity */}
//     <div className="card bg-base-100 shadow-md">
//       <figure className="p-6">
//         <img
//           src="https://images.unsplash.com/photo-1663608786776-72e279f45a95?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RWxlY3RyaWNpdHklMjBiaWxsfGVufDB8fDB8fHww"
//           alt="Electricity"
//           className="h-50"
//         />
//       </figure>
//       <div className="card-body text-center">
//         <h3 className="text-xl font-semibold">Electricity</h3>
//         <p className="text-gray-600">
//           Monthly electricity bill management and payment.
//         </p>
//       </div>
//     </div>

//     {/* Gas */}
//     <div className="card bg-base-100 shadow-md">
//       <figure className="p-6">
//         <img
//           src="https://media.istockphoto.com/id/1344216982/photo/home-heating-gas-expenses-and-bill-statement-document.webp?a=1&b=1&s=612x612&w=0&k=20&c=CMyJq7ky03X0A6rTsZBTA4x_MWt9SjW_arbPpAzNUjY="
//           alt="Gas"
//           className="h-50"
//         />
//       </figure>
//       <div className="card-body text-center">
//         <h3 className="text-xl font-semibold">Gas</h3>
//         <p className="text-gray-600">
//           Household gas bill tracking and records.
//         </p>
//       </div>
//     </div>

//     {/* Water */}
//     <div className="card bg-base-100 shadow-md">
//       <figure className="p-6">
//         <img
//           src="https://images.unsplash.com/photo-1554140426-5e830b73a5e8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0ZXIlMjBnbGFzc3xlbnwwfHwwfHx8MA%3D%3D"
//           alt="Water"
//           className="h-50"
//         />
//       </figure>
//       <div className="card-body text-center">
//         <h3 className="text-xl font-semibold">Water</h3>
//         <p className="text-gray-600">
//           Water usage bills and monthly payment overview.
//         </p>
//       </div>
//     </div>

//     {/* Internet */}
//     <div className="card bg-base-100 shadow-md">
//       <figure className="p-6">
//         <img
//           src="https://images.unsplash.com/photo-1619834035779-57f2f0e0cea8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGludGVybmV0fGVufDB8fDB8fHww"
//           alt="Internet"
//           className="h-50"
//         />
//       </figure>
//       <div className="card-body text-center">
//         <h3 className="text-xl font-semibold">Internet</h3>
//         <p className="text-gray-600">
//           Internet subscription and broadband bill details.
//         </p>
//       </div>
//     </div>

//   </div>
// </section>


// <div>
//  <Recentbills RecentbillsPromise={RecentbillsPromise}></Recentbills>

// </div>
//     <WhyChooseUs></WhyChooseUs>
//                 <HowItWorks></HowItWorks>



//     </div>

//   );
// };

// export default Home;
