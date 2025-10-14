import { useState } from "react";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Feedback submitted: " + feedback);
    setFeedback("");
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">
        Please tell us what do you think, any kind of feedback is highly appreciated. 🫶
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="bg-gray-100 p-6 rounded-md mb-4">
          <label className="block font-medium mb-2">Enter Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="You can type your feedback here"
            className="w-full border rounded-md p-3 h-32 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
