import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const BookingsTabs = () => {
  const [activeTab, setActiveTab] = useState<"all" | "cancelled">("all");

  return (
    <div className="flex-1 bg-white shadow rounded-lg p-6">
      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-6 py-2 rounded-lg font-medium ${
            activeTab === "all"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All Bookings
        </button>
        <button
          onClick={() => setActiveTab("cancelled")}
          className={`px-6 py-2 rounded-lg font-medium ${
            activeTab === "cancelled"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* Content */}
      {activeTab === "all" && (
        <div className="flex flex-col items-center justify-center py-10 border rounded-lg">
          <FaInfoCircle className="text-gray-500 text-xl mb-2" />
          <p className="text-gray-600 text-sm">
            The <span className="font-semibold">Reschedule</span> feature is only
            available on iOS and Android app
          </p>
          <div className="flex space-x-2 mt-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-8"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-8"
            />
          </div>
        </div>
      )}

      {activeTab === "cancelled" && (
        <div className="flex items-center justify-center py-10 border rounded-lg">
          <p className="text-gray-600 text-sm">No cancelled bookings</p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button className="px-3 py-1 border rounded hover:bg-gray-100">‹</button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">›</button>
      </div>
    </div>
  );
};

export default BookingsTabs;
