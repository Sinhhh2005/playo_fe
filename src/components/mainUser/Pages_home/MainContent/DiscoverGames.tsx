import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const games = [
  {
    id: 1,
    type: "Regular",
    players: "Laksh Bhandary • 23150 Karma",
    time: "Mon, 29 Sep 2025, 07:30 PM - 08:30 PM",
    venue: "Citi Nest Sports (2.4 Km)",
    level: "Amateur • Professional",
    price: "INR 115",
    going: "3 Going",
    status: "BOOKED",
  },
  {
    id: 2,
    type: "Regular",
    players: "Laksh Bhandary • 23150 Karma",
    time: "Mon, 29 Sep 2025, 07:30 PM - 08:30 PM",
    venue: "Play Zone (Indiranagar 3.2 Km)",
    level: "Amateur • Professional",
    price: "INR 120",
    going: "3 Going",
    status: "",
  },
  {
    id: 3,
    type: "Doubles • Regular",
    players: "Abhinash | 75 Karma",
    time: "Mon, 29 Sep 2025, 07:30 PM - 08:30 PM",
    venue: "Acs Badminton Arena (3.7 Km)",
    level: "Intermediate",
    price: "INR 100",
    going: "1 Going",
    status: "Limited",
  },
  {
    id: 4,
    type: "Regular",
    players: "Rahul Sharma • 100 Karma",
    time: "Tue, 30 Sep 2025, 06:00 PM - 07:00 PM",
    venue: "Mega Sports Hub (4.5 Km)",
    level: "Beginner",
    price: "INR 90",
    going: "2 Going",
    status: "",
  },
  {
    id: 5,
    type: "Singles • Regular",
    players: "Ankit Verma • 150 Karma",
    time: "Tue, 30 Sep 2025, 08:00 PM - 09:00 PM",
    venue: "Arena Court (5 Km)",
    level: "Intermediate",
    price: "INR 110",
    going: "1 Going",
    status: "Limited",
  },
];

export default function DiscoverGames() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? games.length - itemsPerPage : prev - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + itemsPerPage >= games.length ? 0 : prev + 1
    );
  };

  return (
    <section className="mb-10">
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Discover Games</h2>

        {/* 🔹 Đổi <a> thành <Link> */}
        <Link
          to="/play"
          className="text-green-600 text-sm font-medium hover:underline"
        >
          SEE ALL GAMES
        </Link>
      </div>

      {/* ===== Game cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {games.slice(startIndex, startIndex + itemsPerPage).map((game) => (
          <Link
            key={game.id}
            to={`/play/${game.id}`}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition block"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-600">
                {game.type}
              </span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {game.price}
              </span>
            </div>
            <p className="text-sm font-medium">{game.going}</p>
            <p className="text-xs text-gray-500">{game.players}</p>
            <div className="mt-2 space-y-1 text-xs text-gray-600">
              <p className="flex items-center">
                <FaCalendarAlt className="mr-2" /> {game.time}
              </p>
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2" /> {game.venue}
              </p>
              <p className="flex items-center">
                <FaUser className="mr-2" /> {game.level}
              </p>
            </div>
            {game.status && (
              <div className="mt-3 text-right">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    game.status === "BOOKED"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {game.status}
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* ===== Navigation buttons ===== */}
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
