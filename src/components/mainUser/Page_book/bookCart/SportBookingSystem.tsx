import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFieldById } from "../../../../services/fieldService";
import type { Field } from "../../../../types";
import { Calendar, Clock, Plus, Minus } from "lucide-react";

interface SportBookingSystemProps {
  onAddToCart?: (item: {
    id: string;
    name: string;
    sport: string;
    date: string;
    startTime: string;
    duration: number;
    court: string;
    price?: string | number;
  }) => void;
  isBooked?: boolean;
}

const SportBookingSystem: React.FC<SportBookingSystemProps> = ({
  onAddToCart,
  isBooked = false,
}) => {
  const { id } = useParams<{ id: string }>();
  const [field, setField] = useState<Field | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState<string>("09:00");
  const [duration, setDuration] = useState<number>(30);
  const [selectedCourt, setSelectedCourt] = useState<string>("");

  useEffect(() => {
    const fetchField = async () => {
      try {
        setLoading(true);
        const res = await getFieldById(id!);
        setField(res);
      } catch (err: any) {
        setError(err.message || "Không thể tải thông tin sân");
      } finally {
        setLoading(false);
      }
    };
    fetchField();
  }, [id]);

  if (loading)
    return <div className="text-center mt-20 text-blue-600 animate-pulse">Đang tải...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!field) return <div className="text-center text-gray-500">Không tìm thấy sân</div>;

  // ✅ Lấy giá từ field (ưu tiên pricePerHour, nếu không có thì dùng price)
  const fieldPrice = field.pricePerHour || field.price || 0;

  const handleAdd = () => {
    if (!selectedCourt) return alert("Vui lòng chọn sân!");
    const pricePerHour = Number(field.pricePerHour || field.price || 0);
    const price = (pricePerHour * duration) / 60;
    const item = {
      id: String(field.id),
      name: field.name,
      sport: field.sport?.name || field.type,
      date,
      startTime,
      duration,
      court: selectedCourt,
      price, // ✅ gửi kèm giá sang BookCart
    };
    onAddToCart?.(item);
    alert("✅ Đã thêm vào giỏ hàng!");
  };

  const handleDurationChange = (delta: number) => {
    setDuration((prev) => Math.max(30, prev + delta));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-blue-800 mb-2">{field.name}</h1>
      <p className="text-gray-600 mb-4">{field.address}</p>

      {/* ✅ Hiển thị giá tiền sân */}
      <div className="bg-yellow-100 text-yellow-800 text-center py-2 rounded-lg mb-4 font-semibold">
        Giá sân: {fieldPrice.toLocaleString()}đ / giờ
      </div>

      <div className="bg-gradient-to-r from-green-400 to-green-500 text-white rounded-md py-2 text-center font-semibold">
        Nhận 3 điểm thưởng cho mỗi lần đặt sân!
      </div>

      <div className="flex flex-col gap-4 mt-6 text-gray-800">
        {/* Môn thể thao */}
        <div>
          <span className="font-semibold text-blue-700">Môn thể thao:</span>
          <div className="border rounded-lg px-3 py-2 mt-1">
            {field.sport?.name || field.type}
          </div>
        </div>

        {/* Ngày */}
        <div>
          <span className="font-semibold text-blue-700">Ngày:</span>
          <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent outline-none w-full"
              disabled={isBooked}
            />
            <Calendar className="text-blue-600 ml-2" size={20} />
          </div>
        </div>

        {/* Giờ bắt đầu */}
        <div>
          <span className="font-semibold text-blue-700">Giờ bắt đầu:</span>
          <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="bg-transparent outline-none w-full"
              disabled={isBooked}
            />
            <Clock className="text-blue-600 ml-2" size={20} />
          </div>
        </div>

        {/* Thời lượng */}
        <div>
          <span className="font-semibold text-blue-700">Thời lượng:</span>
          <div className="flex items-center justify-between mt-1 border rounded-lg px-3 py-2">
            <button
              onClick={() => handleDurationChange(-30)}
              className="bg-gray-100 p-2 rounded-full hover:bg-gray-200"
              disabled={isBooked}
            >
              <Minus size={18} />
            </button>
            <span>{duration} phút</span>
            <button
              onClick={() => handleDurationChange(30)}
              className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600"
              disabled={isBooked}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Chọn sân */}
        <div>
          <span className="font-semibold text-blue-700">Chọn sân:</span>
          <select
            value={selectedCourt}
            onChange={(e) => setSelectedCourt(e.target.value)}
            className="border rounded-lg px-3 py-2 mt-1 w-full outline-none"
            disabled={isBooked}
          >
            <option value="">--Chọn sân--</option>
            <option value="court1">Sân 1</option>
            <option value="court2">Sân 2</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleAdd}
        disabled={!selectedCourt || isBooked}
        className={`mt-6 w-full py-3 font-semibold rounded-xl transition-all duration-200 ${
          isBooked
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : selectedCourt
            ? "bg-blue-700 text-white hover:bg-blue-800"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {isBooked ? "Đã có sân trong giỏ hàng" : "Thêm vào giỏ hàng"}
      </button>
    </div>
  );
};

export default SportBookingSystem;
