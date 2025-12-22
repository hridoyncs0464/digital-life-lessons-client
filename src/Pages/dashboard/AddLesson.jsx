import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole";

const AddLesson = () => {
  const { user } = useContext(AuthContext);
  const { premium, loading: roleLoading } = useRole();
  const [isPremium, setIsPremium] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      Swal.fire("Error", "Please login again", "error");
      return;
    }

    if (roleLoading) {
      Swal.fire("Wait", "Checking your premium status...", "info");
      return;
    }

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const emotionalTone = form.tone.value;
    const content = form.content.value;

    // short description from content (first 160 chars)
    const shortDescription = content.slice(0, 160);

    const lessonData = {
      // backend-required fields
      authorEmail: user.email,
      authorName: user.displayName || "Anonymous",
      authorPhoto: user.photoURL || "",
      title,
      category,
      shortDescription,
      emotionalTone,
      accessLevel: isPremium ? "premium" : "public", // maps to accessLevel on backend
      content,
    };

    try {
      const res = await fetch(
        "https://digital-life-lessons-server-omega.vercel.app/lessons",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(lessonData),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit lesson");
      }

      Swal.fire({
        icon: "success",
        title: "Lesson submitted",
        text: "Waiting for admin approval before it becomes public.",
      });

      form.reset();
      setIsPremium(false);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Lesson</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="label">Lesson Title</label>
          <input
            type="text"
            name="title"
            required
            className="input input-bordered w-full"
            placeholder="Enter lesson title"
          />
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <select
            name="category"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select category</option>
            <option>Life</option>
            <option>Career</option>
            <option>Relationship</option>
            <option>Mental Health</option>
          </select>
        </div>

        {/* Emotional Tone */}
        <div>
          <label className="label">Emotional Tone</label>
          <select
            name="tone"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select tone</option>
            <option>Inspirational</option>
            <option>Reflective</option>
            <option>Motivational</option>
            <option>Emotional</option>
          </select>
        </div>

        {/* Content */}
        <div>
          <label className="label">Lesson Content</label>
          <textarea
            name="content"
            rows="5"
            required
            className="textarea textarea-bordered w-full"
            placeholder="Write your lesson here..."
          />
        </div>

        {/* Premium Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="toggle toggle-primary"
            disabled={!premium}
            checked={isPremium}
            onChange={(e) => setIsPremium(e.target.checked)}
          />
          <span>
            Premium Lesson
            {!premium && (
              <span className="text-sm text-error ml-2">(Premium only)</span>
            )}
          </span>
        </div>

        {/* Submit */}
        <button className="btn btn-primary w-full">Submit Lesson</button>
      </form>
    </div>
  );
};

export default AddLesson;

// import { useContext, useState } from "react";
// import { AuthContext } from "../../AuthContext/AuthContext";
// import Swal from "sweetalert2";
// import useRole from "../../hooks/useRole";

// const AddLesson = () => {
//   const { user } = useContext(AuthContext);

//   // TEMP: replace later with real subscription info
//   // const isPremiumUser = false;
//   const { premium, loading: roleLoading } = useRole();   // <- from DB

//   const [isPremium, setIsPremium] = useState(false);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   if (!user || !user.email) {
//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Not authenticated",
//   //       text: "Please login again",
//   //     });
//   //     return;
//   //   }

//   //   const form = e.target;
//   //   const lesson = {
//   //     title: form.title.value,
//   //     category: form.category.value,
//   //     tone: form.tone.value,
//   //     content: form.content.value,
//   //     premium: isPremium,
//   //     author: user.email,
//   //     status: "pending", // admin approval
//   //     createdAt: new Date(),
//   //   };

//   //   try {
//   //     const res = await fetch(
//   //       "https://digital-life-lessons-server-omega.vercel.app/lessons", // Updated URL
//   //       {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify(lesson),
//   //       }
//   //     );

//   //     const contentType = res.headers.get("content-type");
//   //     let data;

//   //     if (contentType && contentType.includes("application/json")) {
//   //       data = await res.json();
//   //     } else {
//   //       const text = await res.text();
//   //       throw new Error(`Server returned non-JSON response: ${text}`);
//   //     }

//   //     if (!res.ok) {
//   //       throw new Error(data.message || "Failed to submit lesson");
//   //     }

//   //     Swal.fire({
//   //       icon: "success",
//   //       title: "Lesson Submitted",
//   //       text: "Waiting for admin approval",
//   //     });

//   //     form.reset();
//   //     setIsPremium(false);
//   //   } catch (err) {
//   //     Swal.fire({
//   //       icon: "error",
//   //       title: "Failed",
//   //       text: err.message,
//   //     });
//   //   }
//   // };
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!user?.email) {
//     Swal.fire("Error", "Please login again", "error");
//     return;
//   }

//     if (roleLoading) {
//       Swal.fire("Wait", "Checking your premium status...", "info");
//       return;
//     }

//   const form = e.target;

//   const lessonData = {
//     title: form.title.value,
//     category: form.category.value,
//     tone: form.tone.value,
//     content: form.content.value,
//     accessLevel: isPremium ? "premium" : "public",
//     author: {
//         email: user.email,
//         name: user.displayName || "Anonymous",
//         photo: user.photoURL || "",
//       },
//   };

//   try {
//     const res = await fetch("https://digital-life-lessons-server-omega.vercel.app/lessons", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(lessonData),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.message || "Failed to add lesson");
//     }

//  Swal.fire({
//         icon: "success",
//         title: "Lesson Added",
//         text: isPremium
//           ? "Your premium lesson is now live!"
//           : "Your public lesson is now live!",
//       });

//     form.reset();
//     setIsPremium(false);
//   } catch (err) {
//     Swal.fire("Error", err.message, "error");
//   }
// };

// if (roleLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Add New Lesson</h1>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Title */}
//         <div>
//           <label className="label">Lesson Title</label>
//           <input
//             type="text"
//             name="title"
//             required
//             className="input input-bordered w-full"
//             placeholder="Enter lesson title"
//           />
//         </div>

//         {/* Category */}
//         <div>
//           <label className="label">Category</label>
//           <select name="category" className="select select-bordered w-full" required>
//             <option value="">Select category</option>
//             <option>Life</option>
//             <option>Career</option>
//             <option>Relationship</option>
//             <option>Mental Health</option>
//           </select>
//         </div>

//         {/* Emotional Tone */}
//         <div>
//           <label className="label">Emotional Tone</label>
//           <select name="tone" className="select select-bordered w-full" required>
//             <option value="">Select tone</option>
//             <option>Inspirational</option>
//             <option>Reflective</option>
//             <option>Motivational</option>
//             <option>Emotional</option>
//           </select>
//         </div>

//         {/* Content */}
//         <div>
//           <label className="label">Lesson Content</label>
//           <textarea
//             name="content"
//             rows="5"
//             required
//             className="textarea textarea-bordered w-full"
//             placeholder="Write your lesson here..."
//           />
//         </div>

//         {/* Premium Toggle */}
//         <div className="flex items-center gap-3">
//           <input
//             type="checkbox"
//             className="toggle toggle-primary"
//             disabled={!premium}
//             checked={isPremium}
//             onChange={(e) => setIsPremium(e.target.checked)}
//           />
//           <span>
//             Premium Lesson
//             {!premium && (
//               <span className="text-sm text-error ml-2">(Premium only)</span>
//             )}
//           </span>
//         </div>

//         {/* Submit */}
//         <button className="btn btn-primary w-full">Submit Lesson</button>
//       </form>
//     </div>
//   );
// };

// export default AddLesson;
