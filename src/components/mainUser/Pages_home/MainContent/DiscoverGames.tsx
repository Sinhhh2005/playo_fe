import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaRunning,
} from "react-icons/fa";
import * as Services from "../../../../services";

interface Venue {
  id: string;
  name: string;
  address: string;
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
        const result = await Services.FieldService.getAllFields();
        const data = Array.isArray(result) ? result : result.data || [];
        setFields(data);
      } catch (err: any) {
        console.error("DiscoverGames fetch error:", err);
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

  if (loading) return <div className="p-10 text-center">Đang tải danh sách sân...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
  if (fields.length === 0) return <div className="p-10 text-center text-gray-500">Chưa có sân nào.</div>;

  return (
    <section className="mb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Discover Games</h2>
        <Link
          to="/play"
          className="text-green-600 text-sm font-medium hover:underline"
        >
          SEE ALL GAMES
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {fields.slice(startIndex, startIndex + itemsPerPage).map((field) =>
          field.id ? (
            <Link
              key={field.id}
              to={`/play/${field.id}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-4 block"
            >
              {/* Type */}
              <p className="text-sm text-gray-500 mb-2 font-medium">
                {field.type || "Regular"}
              </p>

              {/* Host */}
              <div className="flex items-center mb-3">
                <img
                  src={
                    field.image ||
                    "https://playo-website.gumlet.io/playo-website-v3/playo-default-profile.png"
                  }
                  alt="avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {Math.floor(Math.random() * 10) + 1} Going
                  </p>
                  <p className="text-xs text-gray-600">
                    {field.venue?.name?.split(" ")[0] || "Host"} |{" "}
                    {Math.floor(Math.random() * 5000) + 100} Karma
                  </p>
                </div>
              </div>

              {/* Date & Time (hardcoded for now) */}
              <p className="text-sm text-gray-800 font-medium mb-2">
                Sat, 18 Oct 2025, 07:30 PM - 09:30 PM
              </p>

              {/* Venue */}
              <p className="flex items-center text-sm text-gray-600 mb-2">
                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                {field.venue?.name || "Feather Touch Sports"} ~{" "}
                {(Math.random() * 10).toFixed(2)} Kms
              </p>

              {/* Level */}
              <div className="flex justify-between items-center">
                <span className="text-xs border rounded-full px-3 py-1 text-gray-700">
                  Beginner - Professional
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded font-medium ${
                    field.status === "BOOKED"
                      ? "bg-green-100 text-green-700 border border-green-600"
                      : field.status === "LIMITED"
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-500"
                      : field.status === "OPEN"
                      ? "bg-blue-100 text-blue-700 border border-blue-500"
                      : "bg-gray-100 text-gray-600 border border-gray-400"
                  }`}
                >
                  {field.status}
                </span>
              </div>
            </Link>
          ) : null
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}
