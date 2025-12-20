import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import Swal from "sweetalert2";

const AddLesson = () => {
  const { user } = useContext(AuthContext);

  // TEMP: replace later with real subscription info
  const isPremiumUser = false;

  const [isPremium, setIsPremium] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.email) {
      Swal.fire({
        icon: "error",
        title: "Not authenticated",
        text: "Please login again",
      });
      return;
    }

    const form = e.target;
    const lesson = {
      title: form.title.value,
      category: form.category.value,
      tone: form.tone.value,
      content: form.content.value,
      premium: isPremium,
      author: user.email,
      status: "pending", // admin approval
      createdAt: new Date(),
    };

    try {
      const res = await fetch(
        "https://utility-bill-sys-server.vercel.app/api/lessons", // Updated URL
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lesson),
        }
      );

      const contentType = res.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`Server returned non-JSON response: ${text}`);
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit lesson");
      }

      Swal.fire({
        icon: "success",
        title: "Lesson Submitted",
        text: "Waiting for admin approval",
      });

      form.reset();
      setIsPremium(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.message,
      });
    }
  };

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
          <select name="category" className="select select-bordered w-full" required>
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
          <select name="tone" className="select select-bordered w-full" required>
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
            disabled={!isPremiumUser}
            checked={isPremium}
            onChange={(e) => setIsPremium(e.target.checked)}
          />
          <span>
            Premium Lesson
            {!isPremiumUser && (
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
