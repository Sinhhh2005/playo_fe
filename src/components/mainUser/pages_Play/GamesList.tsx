import React, { useEffect, useState, useMemo } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as SlotService from "../../../services/slotService";
import type { VenueSlot } from "../../../types/";

const INITIAL_COUNT = 8;
const LOAD_MORE_COUNT = 4;

const   GamesList: React.FC = () => {
  const [allSlots, setAllSlots] = useState<VenueSlot[]>([]); // ✅ lưu toàn bộ dữ liệu gốc
  const [slots, setSlots] = useState<VenueSlot[]>([]); // hiển thị sau khi lọc
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const [filters, setFilters] = useState({
    sport: "all",
    status: "all",
    time: "all",
    address: "all",
    price: "all",
  });

  const [showAllSlots, setShowAllSlots] = useState(false); // ✅ Toggle hiển thị trùng

  // 🟢 Fetch slot 1 lần duy nhất từ backend
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const data = await SlotService.getAllSlots();
        setAllSlots(data);
        setSlots(data);
      } catch (err) {
        console.error("❌ Lỗi khi tải slots:", err);
        setError("Không thể tải danh sách slot");
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, []);

  // 🔄 Khi bật/tắt “hiển thị trùng giờ” → chỉ lọc lại local, không gọi API
  useEffect(() => {
    if (showAllSlots) {
      setSlots(allSlots);
    } else {
      const uniqueSlots = Array.from(
        new Map(allSlots.map((s) => [`${s.sportId}-${s.startTime}`, s])).values()
      );
      setSlots(uniqueSlots);
    }
  }, [showAllSlots, allSlots]);

  // 🧠 Lọc theo các tiêu chí
  const filteredSlots = useMemo(() => {
    return slots.filter((slot) => {
      const matchSport =
        filters.sport === "all" ||
        slot.sport?.id?.toString() === filters.sport;

      const matchStatus =
        filters.status === "all" ||
        (filters.status === "available" && slot.isAvailable) ||
        (filters.status === "booked" && !slot.isAvailable);

      const hour = slot.startTime ? Number(slot.startTime.split(":")[0]) : null;
      const matchTime =
        filters.time === "all" ||
        (filters.time === "morning" && hour !== null && hour < 12) ||
        (filters.time === "afternoon" &&
          hour !== null &&
          hour >= 12 &&
          hour < 18) ||
        (filters.time === "evening" && hour !== null && hour >= 18);

      const matchAddress =
        filters.address === "all" ||
        (slot.venue?.address ?? "")
          .toLowerCase()
          .includes(filters.address.toLowerCase());

      const price = slot.venue?.pricePerHour ?? 0;
      const matchPrice =
        filters.price === "all" ||
        (filters.price === "low" && price <= 100000) ||
        (filters.price === "medium" && price > 100000 && price <= 300000) ||
        (filters.price === "high" && price > 300000);

      return (
        matchSport && matchStatus && matchTime && matchAddress && matchPrice
      );
    });
  }, [slots, filters]);

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + LOAD_MORE_COUNT, filteredSlots.length)
    );
  };

  if (loading)
    return (
      <div className="p-10 text-center text-gray-600">Đang tải dữ liệu...</div>
    );
  if (error)
    return <div className="p-10 text-center text-red-500">{error}</div>;
  if (slots.length === 0)
    return <div className="p-10 text-center text-gray-500">Chưa có slot nào.</div>;

  const sportOptions = Array.from(
    new Map(
      allSlots.filter((s) => s.sport).map((s) => [s.sport!.id, s.sport!])
    ).values()
  );

  const addressOptions = Array.from(
    new Set(allSlots.map((s) => s.venue?.address).filter(Boolean))
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Danh sách các Slot đang hoạt động
        </h1>
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        {/* ✅ Toggle Hiển thị trùng */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showAllSlots}
            onChange={(e) => setShowAllSlots(e.target.checked)}
          />
          <span className="text-sm text-gray-700">
            Hiển thị tất cả slot trùng giờ
          </span>
        </label>
      </div>

      {/* Các bộ lọc khác */}
      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={filters.sport}
          onChange={(e) => setFilters({ ...filters, sport: e.target.value })}
          className="border rounded-full px-4 py-2 text-sm"
        >
          <option value="all">Tất cả môn thể thao</option>
          {sportOptions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="border rounded-full px-4 py-2 text-sm"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="available">Còn trống</option>
          <option value="booked">Đã đặt</option>
        </select>

        <select
          value={filters.time}
          onChange={(e) => setFilters({ ...filters, time: e.target.value })}
          className="border rounded-full px-4 py-2 text-sm"
        >
          <option value="all">Tất cả khung giờ</option>
          <option value="morning">Buổi sáng</option>
          <option value="afternoon">Buổi chiều</option>
          <option value="evening">Buổi tối</option>
        </select>

        <select
          value={filters.address}
          onChange={(e) => setFilters({ ...filters, address: e.target.value })}
          className="border rounded-full px-4 py-2 text-sm"
        >
          <option value="all">Tất cả địa chỉ</option>
          {addressOptions.map((addr, index) => (
            <option key={index} value={addr}>
              {addr}
            </option>
          ))}
        </select>

        <select
          value={filters.price}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          className="border rounded-full px-4 py-2 text-sm"
        >
          <option value="all">Tất cả giá</option>
          <option value="low">Dưới 100.000đ</option>
          <option value="medium">100.000đ - 300.000đ</option>
          <option value="high">Trên 300.000đ</option>
        </select>
      </div>

      {/* Danh sách slot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSlots.slice(0, visibleCount).map((slot) => {
          const venue = slot.venue;
          const sport = slot.sport;
          const startTime = slot.startTime
            ? new Date(`1970-01-01T${slot.startTime}`)
            : null;
          const endTime = slot.endTime
            ? new Date(`1970-01-01T${slot.endTime}`)
            : null;
          const price = slot.venue?.pricePerHour ?? 0;

          return (
            <Link
              key={slot.id}
              to={`/play/${slot.id}`}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-4 block"
            >
              <p className="text-sm text-gray-500 mb-2 font-medium">
                {sport?.name || "General"}
              </p>

              <div className="flex items-center mb-3">
                <img
                  src={
                    sport?.iconUrl ||
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
                    {venue?.name || "Unknown Venue"} |{" "}
                    {Math.floor(Math.random() * 5000) + 100} Karma
                  </p>
                </div>
              </div>

              {startTime && endTime && (
                <p className="text-sm text-gray-800 font-medium mb-2">
                  {startTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {endTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}

              <p className="flex items-center text-sm text-gray-600 mb-2">
                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                {venue?.address || "Chưa có địa chỉ"}
              </p>

              {price > 0 && (
                <p className="text-sm text-gray-700 font-semibold mb-2">
                  {price.toLocaleString()} đ
                </p>
              )}

              <div className="flex justify-between items-center mt-2">
                <span className="text-xs border rounded-full px-3 py-1 text-gray-700">
                  {slot.level || "Beginner - Professional"}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded font-medium ${
                    slot.isAvailable
                      ? "bg-blue-100 text-blue-700 border border-blue-500"
                      : "bg-green-100 text-green-700 border border-green-600"
                  }`}
                >
                  {slot.isAvailable ? "AVAILABLE" : "BOOKED"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Load more */}
      {visibleCount < filteredSlots.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Tải thêm
          </button>
        </div>
      )}

      {filteredSlots.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          Không có slot nào khớp với bộ lọc.
        </p>
      )}
    </section>
  );
};

export default GamesList;
