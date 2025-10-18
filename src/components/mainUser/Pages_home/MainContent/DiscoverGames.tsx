import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import * as Services from "../../../../services"; // ✅ Import toàn bộ services

interface Venue {
  id: string;
  name: string;
  address: string;
  image?: string;
}

interface Field {
  id: string;
  name: string;
  type: string;
  price: number;
  status: "OPEN" | "BOOKED" | "LIMITED" | "CLOSED";
  image?: string;
  venue: Venue;
}

export default function DiscoverGames() {
  const [fields, setFields] = useState<Field[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 4;

  useEffect(() => {
    const fetchFields = async () => {
      try {
        setLoading(true);
        // ✅ gọi đúng cú pháp theo export * as FieldService
        const result = await Services.FieldService.getAllFields();
        console.log("📦 All fields từ BE:", result);

        const data = Array.isArray(result) ? result : result.data || [];
        setFields(data);
      } catch (err: any) {
        console.error("❌ DiscoverGames fetch error:", err);
        setError(err?.message || "Không thể tải danh sách sân");
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? Math.max(fields.length - itemsPerPage, 0) : prev - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + itemsPerPage >= fields.length ? 0 : prev + 1
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-10 text-gray-500">
        Đang tải danh sách sân...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center py-10 text-red-500">
        Lỗi: {error}
      </div>
    );

  if (fields.length === 0)
    return (
      <div className="flex items-center justify-center py-10 text-gray-500">
        Chưa có sân nào được đăng.
      </div>
    );

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Discover Games</h2>
        <Link
          to="/play"
          className="text-green-600 text-sm font-medium hover:underline"
        >
          SEE ALL GAMES
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {fields
        .slice(startIndex, startIndex + itemsPerPage)
        .map((field, index) => ( // 🟢 thêm index vào đây
          <Link
            key={field.id || field.name || index} // 🟢 tránh cảnh báo trùng key
            to={`/play/${field.id}`}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition block"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-600">
                {field.type || "Regular"}
              </span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {field.price
                  ? `${field.price.toLocaleString()}đ/h`
                  : "Miễn phí"}
              </span>
            </div>

            {field.image && (
              <img
                src={field.image}
                alt={field.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
            )}

            <p className="text-sm font-medium text-gray-700">{field.name}</p>

            <div className="mt-2 space-y-1 text-xs text-gray-600">
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                {field.venue?.name || "Chưa có sân"} –{" "}
                {field.venue?.address || "Đang cập nhật"}
              </p>
              <p className="flex items-center">
                <FaUser className="mr-2" />
                {field.status === "OPEN" ? "Còn chỗ" : "Đã đặt hết"}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Nút điều hướng */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}
