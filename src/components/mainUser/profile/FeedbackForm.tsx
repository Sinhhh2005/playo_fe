import { useState } from "react";
import { sendFeedback } from "../../../services/feedbackService";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setMessage("Vui lòng nhập nội dung feedback.");
      return;
    }

    setLoading(true);
    const result = await sendFeedback(feedback);
    setLoading(false);

    setMessage(result.message);
    if (result.success) setFeedback("");
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">
        Please tell us what you think. Any kind of feedback is highly appreciated 🫶
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
          disabled={loading}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>

      {message && (
        <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default FeedbackForm;
