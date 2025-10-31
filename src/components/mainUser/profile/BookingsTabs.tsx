// src/components/book/BookingsTabs.tsx
import { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Button } from "../../ui/button";

import * as Services from "../../../services";
import type { Booking } from "../../../types/booking";

const BookingsTabs = () => {
  const [activeTab, setActiveTab] = useState<"all" | "cancelled">("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await Services.BookingService.getUserBookings();
      setBookings(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("❌ Fetch bookings error:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id: number | string) => {
    try {
      await Services.BookingService.deleteBooking(id);
      await fetchBookings();
    } catch (err) {
      console.error("❌ Cancel booking error:", err);
    }
  };

  const allBookings = bookings;
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled");

  // Helper: màu trạng thái
  const statusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "confirmed":
        return "text-green-700 bg-green-100";
      case "cancelled":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

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
      {loading ? (
        <p className="text-gray-600 text-center py-10">Loading...</p>
      ) : activeTab === "all" ? (
        allBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 border rounded-lg">
            <FaInfoCircle className="text-gray-500 text-xl mb-2" />
            <p className="text-gray-600 text-sm">You have no bookings yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allBookings.map((b) => (
              <div
                key={b.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  {/* ảnh venue (nếu có) */}
                  {b.venue?.imgUrl?.[0] ? (
                    <img
                      src={b.venue.imgUrl[0]}
                      alt={b.venue.name}
                      className="w-24 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-24 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                      No Image
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {b.venue?.name || "Unknown Venue"}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {b.bookingDate} | {b.startTime} - {b.endTime}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Sport: {b.sport?.name || "N/A"}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(
                        b.status
                      )}`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-600 font-bold">
                    INR {b.totalPrice || b.ticketPrice || 0}
                  </span>
                  {b.status !== "cancelled" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCancel(b.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="flex flex-col gap-4">
          {cancelledBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 border rounded-lg">
              <p className="text-gray-600 text-sm">No cancelled bookings</p>
            </div>
          ) : (
            cancelledBookings.map((b) => (
              <div
                key={b.id}
                className="p-4 border rounded-lg bg-red-50 text-gray-700"
              >
                <h3 className="font-semibold">{b.venue?.name}</h3>
                <p className="text-sm">
                  {b.bookingDate} | {b.startTime} - {b.endTime}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BookingsTabs;
