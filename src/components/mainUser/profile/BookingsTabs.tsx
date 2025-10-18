// src/components/book/BookingsTabs.tsx
import { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { getUserBookings, deleteBooking } from "../../../services/bookingService";
import type { Booking } from "../../../types";
import { Button } from "../../ui/button";

const BookingsTabs = () => {
  const [activeTab, setActiveTab] = useState<"all" | "cancelled">("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getUserBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id: string) => {
    try {
      await deleteBooking(id);
      fetchBookings(); // đồng bộ lại danh sách từ BE
    } catch (err) {
      console.error(err);
    }
  };

  const allBookings = bookings.filter(b => b.startTime && b.bookingDate); // giả lập active
  const cancelledBookings: Booking[] = []; // nếu backend có status thì filter status === 'cancelled'

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
        <>
          {loading ? (
            <p className="text-gray-600 text-center py-10">Loading...</p>
          ) : allBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 border rounded-lg">
              <FaInfoCircle className="text-gray-500 text-xl mb-2" />
              <p className="text-gray-600 text-sm">
                You have no bookings yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {allBookings.map((b) => (
                <div
                  key={b.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    {/* ảnh venue giả */}
                    <div className="w-24 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                      Image
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{b.venueName}</h3>
                      <p className="text-gray-600 text-sm">
                        {b.bookingDate} | {b.startTime} - {b.endTime}
                      </p>  
                      <p className="text-gray-600 text-sm">Sport: {b.sportName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-green-600 font-bold">INR {b.price}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleCancel(b.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "cancelled" && (
        <div className="flex items-center justify-center py-10 border rounded-lg">
          {cancelledBookings.length === 0 ? (
            <p className="text-gray-600 text-sm">No cancelled bookings</p>
          ) : (
            cancelledBookings.map((b) => (
              <div key={b.id}>{b.venueName}</div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BookingsTabs;
