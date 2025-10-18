import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import UserLayout from "../../../layouts/UserLayout";
import * as Services from "../../../services"; // fieldService
import { venues as staticVenues } from "../../../data/venues";

export default function MatchDetail() {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<any>();
  const [similarGames, setSimilarGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Game ID không hợp lệ");
      setLoading(false);
      return;
    }

    const fetchGame = async () => {
      try {
        setLoading(true);

        // Fetch chi tiết
        const data = await Services.FieldService.getFieldById(id);

        if (!data) {
          setError("Game không tồn tại");
          return;
        }

        // Map dữ liệu backend
        const mappedGame = {
          id: data.id,
          type: data.sportName || `Sport ${data.sportId}`,
          host: {
            name: data.contactName || "Unknown",
            avatar: "", // placeholder
            karma: 0,
          },
          date: data.date || "TBD",
          time: data.time || "TBD",
          venue: data.name,
          distance: data.district,
          slots: data.stock,
          price: data.pricePerHour,
          status: data.status === "active" ? "OPEN" : "CLOSED",
          level: "Beginner",
          going: { current: 0, total: data.stock || 0 },
        };

        setGame(mappedGame);

        // Fetch similar games
        const allFields = await Services.FieldService.getAllFields();
        const mappedSimilar = allFields
          .filter((g: any) => g.id !== data.id)
          .slice(0, 3)
          .map((g: any) => ({
            id: g.id,
            type: g.sportName || `Sport ${g.sportId}`,
            host: { name: g.contactName || "Unknown", avatar: "", karma: 0 },
            date: g.date || "TBD",
            time: g.time || "TBD",
            venue: g.name,
            distance: g.district,
            slots: g.stock,
            price: g.pricePerHour,
            status: g.status === "active" ? "OPEN" : "CLOSED",
            level: "Beginner",
            going: { current: 0, total: g.stock || 0 },
          }));

        setSimilarGames(mappedSimilar);
      } catch (err: any) {
        console.error("Lỗi khi fetch match detail:", err);
        setError(err?.message || "Không thể tải game");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  if (loading) return <div className="p-6">Đang tải...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!game) return <div className="p-6">Không tìm thấy game</div>;

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{game.type}</h2>
                <p className="text-gray-500">
                  Hosted by {game.host.name} • {game.host.karma} Karma
                </p>
              </div>
              <img
                src={game.host.avatar || "https://via.placeholder.com/48"}
                alt={game.host.name}
                className="w-12 h-12 rounded-full"
              />
            </div>

            <div className="mt-4 space-y-3 text-gray-700">
              <p className="flex items-center">
                <FaCalendarAlt className="mr-2 text-green-600" />
                {game.date}, {game.time}
              </p>
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-green-600" />
                {game.venue} ({game.distance})
              </p>
            </div>

            <button className="mt-4 border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-100">
              Show In Map
            </button>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-gray-700">
              {game.going && (
                <div className="flex items-center gap-2">
                  <FaUser className="text-green-600" />
                  {game.going.current}/{game.going.total} Going
                </div>
              )}
              {game.level && (
                <span className="px-3 py-1 text-xs rounded-full bg-gray-100">{game.level}</span>
              )}
              {game.price && (
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  {game.price}
                </span>
              )}
              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  game.status === "OPEN"
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {game.status}
              </span>
            </div>
          </div>

          {/* Similar Games */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Similar Games</h3>
              <Link to="/play" className="text-green-600 text-sm">
                SEE ALL GAMES →
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarGames.map((sim) => (
                <Link key={sim.id} to={`/play/${sim.id}`}>
                  <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
                    <p className="text-xs text-gray-500">{sim.type}</p>
                    <p className="text-sm font-medium mt-1">
                      {sim.going ? `${sim.going.current}/${sim.going.total} Going` : "No players yet"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {sim.host.name} • {sim.host.karma} Karma
                    </p>
                    <p className="text-xs mt-2">{sim.date}, {sim.time}</p>
                    <p className="text-xs text-gray-500">{sim.venue} ({sim.distance})</p>
                    {sim.level && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                        {sim.level}
                      </span>
                    )}
                    {sim.price && (
                      <span className="ml-2 text-xs text-green-600">{sim.price}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* Players */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-3">Players</h3>
            <ul className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 5}`}
                    alt="player"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>Player {i}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Venues Nearby */}
<div className="bg-white rounded-2xl shadow p-6">
  <h3 className="font-semibold mb-3">Venues Nearby</h3>
  <ul className="space-y-3 text-sm text-gray-700">
    {staticVenues.map((venue) => (
      <Link
        key={venue.id}
        to={`/experience-details/venue/${venue.id}`}
        className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition"
      >
        <img
          src={venue.image}
          alt={venue.name}
          className="w-10 h-10 rounded-lg"
        />
        <div>
          <p>{venue.name}</p>
          <p className="text-xs text-gray-500">{venue.distance}</p>
        </div>
      </Link>
    ))}
  </ul>
  <Link
    to="/book"
    className="mt-4 border border-gray-300 px-4 py-2 rounded-lg text-sm w-full inline-block text-center hover:bg-gray-100"
  >
    SEE ALL VENUES
  </Link>
</div>

        </div>
      </div>
    </UserLayout>
  );
}
