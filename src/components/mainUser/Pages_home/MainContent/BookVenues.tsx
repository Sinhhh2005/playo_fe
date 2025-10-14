import { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const venues = [
  {
    id: 1,
    name: "Nike Miles Swimming...",
    location: "Sports Block (ashwath ... 1.68 Km)",
    rating: 4.8,
    price: "₹300",
    image: "https://source.unsplash.com/400x250/?swimming,pool",
    featured: true,
  },
  {
    id: 2,
    name: "Pickl - The Social Club",
    location: "The HUB Bengaluru (5.14 Km)",
    rating: 4.7,
    price: "₹450",
    image: "https://source.unsplash.com/400x250/?tennis,court",
    featured: true,
  },
  {
    id: 3,
    name: "RSA Ravi’s Turf",
    location: "75, Cambridge Road, (3.72 Km)",
    rating: 4.5,
    price: "₹500",
    image: "https://source.unsplash.com/400x250/?football,ground",
    featured: true,
  },
  {
    id: 4,
    name: "Game Theory - Joseph’s",
    location: "Geti 3, No.2, Vitta M (3.01 Km)",
    rating: 4.7,
    price: "₹400",
    image: "https://source.unsplash.com/400x250/?badminton,court",
    featured: false,
  },
  {
    id: 5,
    name: "Ace Arena",
    location: "Koramangala (4.2 Km)",
    rating: 4.6,
    price: "₹350",
    image: "https://source.unsplash.com/400x250/?cricket,ground",
    featured: false,
  },
];

export default function BookVenues() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? venues.length - itemsPerPage : prev - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + itemsPerPage >= venues.length ? 0 : prev + 1
    );
  };

  return (
    <section className="mb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Book Venues</h2>

        {/* 🔹 Sửa chỗ này */}
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
            to={`/experience-details/:nav/${venue.id}`}
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
