import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="max-w-7xl mx-auto p-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                        
        <aside>
          <div className="flex items-center gap-3">
            <svg
              width="42"
              height="42"
              viewBox="0 0 24 24"
              className="fill-current text-primary"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2a7 7 0 00-7 7c0 2.76 1.6 5.13 3.9 6.25L9 22l3-2 3 2 .1-6.75A7.01 7.01 0 0012 2z" />
            </svg>
            <span className="text-xl font-bold">
              Digital Life Lessons
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed max-w-xs">
            Digital Life Lessons is a platform to capture, reflect on, and share
            meaningful life experiences. Learn from real stories, grow with
            wisdom, and explore lessons from people around the world.
          </p>
        </aside>

        {/* Quick Links */}
        <nav>
          <h6 className="footer-title mb-2">Quick Links</h6>
          <ul className="flex flex-col gap-1">
            <li>
              <Link to="/" className="link link-hover">
                Home
              </Link>
            </li>
            <li>
              <Link to="/public-lessons" className="link link-hover">
                Public Lessons
              </Link>
            </li>
            <li>
              <Link to="/dashboard/my-lessons" className="link link-hover">
                My Lessons
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="link link-hover">
                Upgrade to Premium
              </Link>
            </li>
          </ul>
        </nav>

        {/* Support */}
        <nav>
          <h6 className="footer-title mb-2">Support</h6>
          <ul className="flex flex-col gap-1">
            <li>
              <Link to="/about" className="link link-hover">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/faq" className="link link-hover">
                Help & FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="link link-hover">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Legal & Social */}
        <nav>
          <h6 className="footer-title mb-2">Legal</h6>
          <ul className="flex flex-col gap-1">
            <li>
              <Link to="/terms" className="link link-hover">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="link link-hover">
                Privacy Policy
              </Link>
            </li>
          </ul>

          <div className="flex gap-4 mt-4">
            <a className="link link-hover">Facebook</a>
            <a className="link link-hover">LinkedIn</a>
            <a className="link link-hover">X</a>
          </div>
        </nav>
      </div>

      {/* Copyright */}
      <div className="text-center py-4 border-t border-base-300 text-sm">
        © {new Date().getFullYear()} Digital Life Lessons. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;






















// import React from "react";
// import { Link } from "react-router";
                  


// const Footer = () => {


//   return (

    
//     <footer className="bg-base-200 text-base-content">
//       <div className="max-w-7xl mx-auto p-10 grid grid-cols-1 md:grid-cols-4 gap-8">
//         {/* Logo & Description */}
//         <aside className="flex flex-col items-start md:items-start">
//           <div className="flex items-center gap-3">
//             <svg
//               width="45"
//               height="45"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//               className="fill-current text-primary"
//             >
//               <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
//             </svg>
//             <span className="text-xl font-bold">PayBill</span>
//           </div>

//           <p className="mt-3 text-sm leading-relaxed max-w-xs">
//             PayBill is a modern utility bill management system that helps users
//             view, manage, and securely pay monthly electricity, gas, water, and
//             internet bills from one place.
//           </p>
//         </aside>

//         {/* Useful Links */}
//         <nav>
//           <h6 className="footer-title mb-2">Useful Links</h6>
//           <ul className="flex flex-col gap-1">
//             <li>
//               <Link to="/" className="link link-hover">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/all-bills" className="link link-hover">
//                 Bills
//               </Link>
//             </li>
//             <li>
//               <Link to="/my-pay-bills" className="link link-hover">
//                 My Pay Bills
//               </Link>
//             </li>
//             <li>
//               <Link to="/profile" className="link link-hover">
//                 Profile
//               </Link>
//             </li>
//           </ul>
//         </nav>

       
       
//         <nav>
//           <h6 className="footer-title mb-2">Support</h6>
//           <ul className="flex flex-col gap-1">
//             <li>
//               <Link to="/help" className="link link-hover">
//                 Help & FAQ
//               </Link>
//             </li>
//             <li>
//               <Link to="/about" className="link link-hover">
//                 About Us
//               </Link>
//             </li>
//             <li>
//               <Link to="/contact" className="link link-hover">
//                 Contact
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         {/* Legal */}
//         <nav>
//           <h6 className="footer-title mb-2">Legal</h6>
//           <ul className="flex flex-col gap-1">
//             <li>
//               <a className="link link-hover">Terms of Service</a>
//             </li>
//             <li>
//               <a className="link link-hover">Privacy Policy</a>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Copyright */}
//       <div className="text-center py-4 border-t border-base-300 text-sm">
//         © {new Date().getFullYear()} PayBill. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;
