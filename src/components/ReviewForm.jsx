import { useState } from "react";

function ReviewForm({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit({ text, user: "Guest", date: new Date().toLocaleString() });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full text-black p-3 border rounded"
        placeholder="Write your review..."
        required
      />
      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Post Review
      </button>
    </form>
  );
}

export default ReviewForm;
