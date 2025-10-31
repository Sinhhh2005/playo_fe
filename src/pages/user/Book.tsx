import { useState, useEffect } from "react";
import NavbarBook from "../../components/mainUser/Page_book/NavbarBook";
import NavBottom from "../../components/mainUser/Page_book/NavBottom";
import VenuesCard from "../../components/mainUser/Page_book/VenuesCard";
import SportsComplexes from "../../components/mainUser/Page_book/CitiesBook";
import Footer from "../../components/mainUser/Footer";
import { getAllFields } from "../../services/fieldService";
import type { Venue } from "../../types/venue";

// 🧩 Kiểu dữ liệu trả về từ API fieldService
interface FieldResponse {
  id: number;
  name: string;
  sportId: number;
  address?: string;
  pricePerHour?: number;
  stock?: number;
  imgUrl?: string[] | string;
  image?: string;
  description?: string;
  contactName?: string;
  contactPhone?: string;
  status?: "active" | "inactive";
  sport?: { id: number; name: string };
  ownerUserId?: string | null;
  position?: string;
  timeActive?: Record<string, string>;
  amenities?: string[];
  createdAt?: string;
  updatedAt?: string;
  type?: string;
}

// 🧩 Chuyển đổi FieldResponse -> Venue
const mapFieldToVenue = (field: FieldResponse): Venue => {
  return {
    id: field.id,
    name: field.name ?? "Không tên",
    sportId: field.sportId,
    address: field.address ?? "Chưa cập nhật",
    pricePerHour: field.pricePerHour ?? 0,
    stock: field.stock ?? 0,
    imgUrl: Array.isArray(field.imgUrl)
      ? field.imgUrl
      : field.image
      ? [field.image]
      : [],
    desShort: field.description ?? "",
    contactName: field.contactName ?? "",
    contactPhone: field.contactPhone ?? "",
    status: field.status ?? "active",
    sport:
      field.sport && typeof field.sport === "object"
        ? field.sport
        : { id: 0, name: field.type ?? "Không xác định" },
    ownerUserId: field.ownerUserId ?? null,
    timeActive: field.timeActive ?? undefined,
    amenities: field.amenities ?? undefined,
    createdAt: field.createdAt ?? undefined,
    updatedAt: field.updatedAt ?? undefined,
    // Các quan hệ khác giữ nguyên undefined vì không trả về từ API
  };
};

const Book = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getAllFields(page, limit);

        if (res && Array.isArray(res.data)) {
          const newVenues = res.data.map(mapFieldToVenue);

          if (newVenues.length === 0) {
            setHasMore(false);
          } else {
            setVenues((prev) => [...prev, ...newVenues]);
          }
        } else {
         setError("Không thể tải danh sách sân.");
        }
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách sân. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [page]);

  return (
    <div>
      <NavbarBook />
      <NavBottom />

      <div className="flex flex-col items-center px-24 py-12 gap-[64px] bg-[#f1f3f2]">
        {loading && page === 1 && (
          <p className="text-center">Đang tải danh sách sân...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="w-full max-w-6xl mx-auto">
            <VenuesCard venues={venues} />
          </div>
        )}

        {hasMore && !loading && !error && (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Đang tải..." : "Xem thêm"}
          </button>
        )}

        {!hasMore && !loading && (
          <p className="text-gray-500 mt-4">Bạn đã xem hết danh sách sân.</p>
        )}
      </div>

      <SportsComplexes />
      <Footer />
    </div>
  );
};

export default Book;
