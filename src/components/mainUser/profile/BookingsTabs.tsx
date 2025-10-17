import { useEffect, useState } from "react";
import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";

interface Booking {
  id: number;
  venue?: { name: string };
  sport?: { name: string };
  startTime: string;
  endTime: string;
  bookingDate: string;
  status: "pending" | "confirmed" | "cancelled";
  totalPrice: number;
}

const ITEMS_PER_PAGE = 5;

const BookingsTabs = () => {
  const [activeTab, setActiveTab] = useState<"all" | "cancelled">("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Bạn chưa đăng nhập");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/bookings/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookings(res.data.bookings || []);
      } catch (err: any) {
        console.error("❌ Lỗi lấy danh sách booking:", err);
        if (err.response?.status === 401) {
          setError("Token không hợp lệ hoặc hết hạn, vui lòng đăng nhập lại");
        } else {
          setError("Không thể tải danh sách booking");
        }
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

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

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
          onClick={() => {
            setActiveTab("all");
            setCurrentPage(1);
          }}
          className={`px-6 py-2 rounded-lg font-medium ${
            activeTab === "all"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All Bookings
        </button>
        <button
          onClick={() => {
            setActiveTab("cancelled");
            setCurrentPage(1);
          }}
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
      {paginatedBookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 border rounded-lg">
          <FaInfoCircle className="text-gray-500 text-xl mb-2" />
          <p className="text-gray-600 text-sm">
            {activeTab === "all"
              ? "Hiện chưa có booking nào"
              : "Không có booking đã bị hủy"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedBookings.map((b) => (
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
                {b.startTime.slice(0, 5)} - {b.endTime.slice(0, 5)} •{" "}
                {b.totalPrice.toLocaleString()}₫
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded ${
                page === currentPage
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingsTabs;
