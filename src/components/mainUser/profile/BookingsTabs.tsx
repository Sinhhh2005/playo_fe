import { useEffect, useState } from "react";
import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";

interface Booking {
  id: number;
  venue?: { name: string };
  sport?: { name: string };
  slot?: { startTime: string; endTime: string };
  bookingDate: string;
  status: string;
  totalPrice: number;
}

const BookingsTabs = () => {
  const [activeTab, setActiveTab] = useState<"all" | "cancelled">("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");

        const res = await axios.get(`${API_URL}/api/bookings/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookings(res.data.bookings || []);
      } catch (err: any) {
        console.error("❌ Lỗi lấy danh sách booking:", err);
        setError("Không thể tải danh sách booking");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [API_URL]);

  const filteredBookings =
    activeTab === "cancelled"
      ? bookings.filter((b) => b.status === "cancelled")
      : bookings;

  if (loading)
    return (
      <div className="flex-1 bg-white shadow rounded-lg p-6 text-center">
        Loading bookings...
      </div>
    );

  if (error)
    return (
      <div className="flex-1 bg-white shadow rounded-lg p-6 text-center text-red-500">
        {error}
      </div>
    );

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
      {filteredBookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 border rounded-lg">
          {activeTab === "all" ? (
            <>
              <FaInfoCircle className="text-gray-500 text-xl mb-2" />
              <p className="text-gray-600 text-sm">
                The <span className="font-semibold">Reschedule</span> feature is
                only available on iOS and Android app
              </p>
            </>
          ) : (
            <p className="text-gray-600 text-sm">No cancelled bookings</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="border rounded-lg p-4 hover:shadow-sm transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">
                  {b.venue?.name || "Unknown venue"}
                </h3>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    b.status === "cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {b.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                {b.sport?.name || "Unknown sport"} • {b.bookingDate} •{" "}
                {b.slot
                  ? `${b.slot.startTime.slice(0, 5)} - ${b.slot.endTime.slice(0, 5)}`
                  : "No time"}{" "}
                • {b.totalPrice ? `${b.totalPrice}₫` : ""}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination (optional) */}
      <div className="flex justify-center mt-6 space-x-2">
        <button className="px-3 py-1 border rounded hover:bg-gray-100">‹</button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">›</button>
      </div>
    </div>
  );
};

export default BookingsTabs;
