import React from "react";
import { Card, CardContent } from "../../ui/card";
import { useNavigate } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import type { Field } from "../../../types/field";

const fallbackImage = "https://via.placeholder.com/400x250?text=No+Image";

// Ảnh minh họa nếu BE không có
const sportImages: Record<string, string> = {
  Football: "https://images.unsplash.com/photo-1600195077909-46e573870d13",
  Badminton: "https://images.unsplash.com/photo-1583878549192-89f1b9c945d5",
  Tennis: "https://images.unsplash.com/photo-1609840114033-8784a0bcab03",
  Basketball: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
};

// Hàm xử lý đường dẫn ảnh (nếu BE trả path tương đối)
const fullImageUrl = (url?: string) => {
  if (!url) return fallbackImage;
  if (url.startsWith("http")) return url;
  return `http://localhost:5000/${url.replace(/^\//, "")}`;
};

interface VenuesCardProps {
  venues?: Field[];
}

const VenuesCard: React.FC<VenuesCardProps> = ({ venues = [] }) => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = React.useState(6);

  const handleShowMore = () => setVisibleCount((prev) => prev + 3);
  const handleNavigate = (id: number | string) =>
    navigate(`/experience-details/venues/${id}`);

  if (!venues.length) {
    return (
      <p className="text-center text-gray-500 py-8">
        Hiện chưa có sân nào để hiển thị.
      </p>
    );
  }

  const displayedVenues = venues.slice(0, visibleCount);

  return (
    <div className="w-full bg-gray-50 py-10">
      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
        {displayedVenues.map((venue) => {
          // ✅ Ưu tiên lấy ảnh từ BE (field.imgUrl)
          let imgSrc = fallbackImage;

          if (venue.imgUrl) {
            if (Array.isArray(venue.imgUrl)) {
              imgSrc = fullImageUrl(venue.imgUrl[0]);
            } else {
              imgSrc = fullImageUrl(venue.imgUrl);
            }
          } else {
            imgSrc = sportImages[venue.type || ""] || fallbackImage;
          }

          return (
            <Card
              key={venue.id}
              onClick={() => handleNavigate(venue.id)}
              className="w-80 overflow-hidden rounded-xl shadow hover:shadow-lg transition cursor-pointer bg-white"
            >
              {/* Ảnh */}
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={imgSrc}
                  alt={venue.name}
                  className="h-full w-full object-cover hover:scale-105 transition-transform"
                  onError={(e) => (e.currentTarget.src = fallbackImage)}
                />
              </div>

              {/* Nội dung */}
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {venue.name}
                </h3>

                <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <MapPin size={14} />
                  <span className="truncate">
                    {venue.address || venue.venue?.address || "Đang cập nhật..."}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  Loại sân:{" "}
                  <span className="font-medium">{venue.type || "Khác"}</span>
                </p>

                {venue.price && (
                  <p className="text-sm text-green-600 font-semibold mt-2">
                    Giá: {Number(venue.price).toLocaleString()}đ / giờ
                  </p>
                )}

                <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Star
                      size={14}
                      fill="currentColor"
                      className="text-yellow-500"
                    />
                    4.6
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigate(venue.id);
                    }}
                    className="text-green-600 hover:underline font-medium"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {visibleCount < venues.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleShowMore}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-2 rounded-lg transition"
          >
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default VenuesCard;
