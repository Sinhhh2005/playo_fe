import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, Phone } from "lucide-react";
import type { Venue } from "../../../types";

const fallbackImage = "https://via.placeholder.com/400x250?text=No+Image";

interface VenuesCardProps {
  venues: Venue[];
}

const VenuesCard: React.FC<VenuesCardProps> = ({ venues }) => {
  const navigate = useNavigate();

  const handleNavigate = (id: number | string) => {
    navigate(`/experience-details/venues/${id}`);
  };

  if (!venues || venues.length === 0) {
    return <p className="text-center text-gray-500 py-8">Không có sân nào.</p>;
  }

  return (
    <div className="w-full bg-gray-50 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {venues.map((venue, index) => {
          // ✅ key an toàn: kết hợp id + index
          const key = `${venue.id || "venue"}-${index}`;

          // Xử lý ảnh hợp lệ
          const img =
          Array.isArray(venue.imgUrl) && venue.imgUrl.length > 0
            ? venue.imgUrl[0]
            : venue.imgUrl && venue.imgUrl.length > 0
            ? venue.imgUrl[0]
            : fallbackImage;

          return (
            <Card
              key={key}
              onClick={() => handleNavigate(String(venue.id))}
              className="overflow-hidden rounded-xl shadow hover:shadow-lg transition-all cursor-pointer bg-white"
            >
              {/* Ảnh sân */}
              <div className="h-48 w-full overflow-hidden relative">
                <img
                  src={img}
                  alt={venue.name}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
                {/* Môn thể thao */}
                {venue.sport?.name && (
                  <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {venue.sport.name}
                  </span>
                )}
              </div>

              {/* Nội dung */}
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {venue.name}
                </h3>

                {venue.desShort && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {venue.desShort}
                  </p>
                )}

                {/* Giá + đánh giá */}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-green-600 font-semibold">
                    {Number(venue.pricePerHour || 0).toLocaleString("vi-VN")}₫ / giờ
                  </span>
                  <span className="flex items-center gap-1 text-sm text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    4.6
                  </span>
                </div>

                {/* Địa chỉ */}
                {venue.address && (
                  <div className="flex items-start gap-1 mt-3 text-gray-500 text-sm">
                    <MapPin size={14} className="mt-[2px]" />
                    <span className="line-clamp-2">{venue.address}</span>
                  </div>
                )}

                {/* Người liên hệ */}
                {venue.contactName && (
                  <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
                    <Phone size={14} />
                    <span>{venue.contactName}</span>
                  </div>
                )}

                {/* Nút đặt sân */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(String(venue.id));
                  }}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
                >
                  Đặt sân ngay
                </button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default VenuesCard;
