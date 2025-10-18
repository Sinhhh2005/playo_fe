import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import * as Services from "../../../../services/fieldService";

export default function BookVenues() {
  const [venues, setVenues] = useState<any[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 4;

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const data = await Services.getAllFields();

        // Map backend data về FE structure
        const mapped = data.map((v: any) => ({
          id: v.id,
          name: v.name,
          location: `${v.district || v.address || "Unknown"}`,
          rating: v.rating || 4.5,
          price: v.pricePerHour ? `${v.pricePerHour}₹` : "Free",
          image: v.imgUrl?.[0] || "https://source.unsplash.com/400x250/?sports",
          featured: v.featured || false,
        }));

        setVenues(mapped);
      } catch (err: any) {
        console.error("Lỗi khi fetch venues:", err);
        setError(err?.message || "Không thể tải venues");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? Math.max(venues.length - itemsPerPage, 0) : prev - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + itemsPerPage >= venues.length ? 0 : prev + 1
    );
  };

  if (loading) return <div className="p-6 text-center">Đang tải...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!venues.length) return <div className="p-6 text-center text-gray-500">Chưa có venues nào.</div>;

  return (
    <section className="mb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Book Venues</h2>
        <Link
          to="/book"
          className="text-green-600 text-sm font-medium hover:underline"
        >
          SEE ALL VENUES
        </Link>
      </div>

      {/* Venue cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {venues.slice(startIndex, startIndex + itemsPerPage).map((venue) => (
          <Link
            key={venue.id}
            to={`/experience-details/venues/${venue.id}`}
            className="bg-white rounded-xl shadow p-3 hover:shadow-lg transition block"
          >
            <div className="relative mb-2">
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-36 object-cover rounded-lg"
              />
              {venue.featured && (
                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                  FEATURED
                </span>
              )}
            </div>
            <h3 className="font-semibold text-sm">{venue.name}</h3>
            <p className="text-xs text-gray-500">{venue.location}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="flex items-center text-xs text-green-600 font-medium">
                <FaStar className="mr-1 text-yellow-400" /> {venue.rating}
              </span>
              <span className="text-sm font-semibold">{venue.price}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={handlePrev}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}
