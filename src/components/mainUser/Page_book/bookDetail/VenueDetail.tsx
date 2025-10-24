// src/pages/user/bookDetail/VenueDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Clock, Share2 } from "lucide-react";
import NavbarBook from "../NavbarBook";
import Breadcrumb from "../../../common/Breadcrumb";
import SportsComplexes from "../CitiesBook";
import Footer from "../../Footer";
import ScrollToTop from "../../../ScrollToTop";
import * as FieldService from "../../../../services/fieldService";

const fallbackSportsAvailable = [
  { name: "Tennis", icon: "🎾" },
  { name: "Badminton", icon: "🏸" },
  { name: "Football", icon: "⚽" },
];
const fallbackAboutVenue = [
  "Clean and well-maintained courts",
  "Easy parking available",
  "Water and refreshments provided",
];
const fallbackImage = "https://via.placeholder.com/400x250?text=No+Image";

export default function VenueDetail() {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Venue ID không hợp lệ");
      setLoading(false);
      return;
    }

    const fetchVenue = async () => {
      try {
        setLoading(true);
        const data = await FieldService.getFieldById(id);

        if (!data) {
          setError("Venue không tồn tại");
          return;
        }

        // ✅ Chuẩn hoá dữ liệu từ backend
        const mappedVenue = {
          id: data.id,
          title: data.name || "Unknown Venue",
          location: data.address || data.district || "Unknown location",
          // ✅ Ưu tiên lấy ảnh từ field (images[] hoặc imgUrl)
          image:
            (Array.isArray(data.images) && data.images.length > 0 && data.images[0]) ||
            data.imgUrl ||
            fallbackImage,
          sportsAvailable: data.sportsAvailable || fallbackSportsAvailable,
          amenities: data.amenities || ["Lighting", "Parking", "Water Facility"],
          aboutVenue: data.aboutVenue || fallbackAboutVenue,
          relatedVenues: data.relatedVenues || [],
          price: data.pricePerHour || data.price || 0,
        };

        setVenue(mappedVenue);
      } catch (err: any) {
        console.error("Lỗi khi fetch venue:", err);
        setError(err?.message || "Không thể tải venue");
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Đang tải venue...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!venue) return <div className="p-6 text-center">Không tìm thấy venue</div>;

  return (
    <section>
      <NavbarBook />
      <Breadcrumb venue={venue} />
      <ScrollToTop />

      <h1 className="px-24 text-2xl font-bold text-gray-700">{venue.title}</h1>

      <div className="flex px-24 py-8 gap-8">
        {/* LEFT CONTENT */}
        <div className="flex-[2] space-y-8">
          {/* Ảnh chính */}
          <div className="rounded-lg overflow-hidden">
            <img
              src={venue.image}
              alt={venue.title}
              className="h-full w-full object-cover rounded-lg"
              onError={(e) => (e.currentTarget.src = fallbackImage)}
            />
          </div>

          {/* Sports Available */}
          {venue.sportsAvailable && (
            <div className="border rounded-xl bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Sports Available{" "}
                <span className="text-gray-500 font-normal text-sm">
                  (Click on sports to view price chart)
                </span>
              </h2>
              <div className="flex gap-6 flex-wrap">
                {venue.sportsAvailable.map((s: any, i: number) => (
                  <div
                    key={i}
                    className="w-40 h-40 border rounded-lg shadow-sm hover:shadow-md flex flex-col items-center justify-center cursor-pointer"
                  >
                    <span className="text-4xl mb-3">{s.icon}</span>
                    <span className="text-gray-700 font-medium">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities */}
          {venue.amenities && (
            <div className="border rounded-xl bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3">
                {venue.amenities.map((a: string, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="text-gray-700">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About Venue */}
          {venue.aboutVenue && (
            <div className="border rounded-xl bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                About Venue
              </h2>
              <ul className="list-disc ml-6 space-y-1 text-gray-700">
                {venue.aboutVenue.map((rule: string, i: number) => (
                  <li key={i}>{rule}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-[1] flex flex-col gap-4">
          <Link
            to={`/booking/${venue.id}`}
            className="flex justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg cursor-pointer"
          >
            Book Now
          </Link>

          <div className="flex gap-4">
            <button className="flex-1 border-[2px] border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer">
              <Share2 size={18} /> Share
            </button>
            <button className="flex-1 text-green-600 font-medium border-[2px] border-green-600 py-2 rounded-lg cursor-pointer">
              Bulk / Corporate
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Timing</h3>
            <p className="text-gray-700 flex items-center gap-2">
              <Clock size={18} /> 8 AM - 9 PM
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <h3 className="text-lg font-semibold">Location</h3>
            <p className="text-sm text-gray-600">{venue.location}</p>
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
                venue.location
              )}`}
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <SportsComplexes />
      <Footer />
    </section>
  );
}
