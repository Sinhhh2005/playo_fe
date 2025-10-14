import { useParams, Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { games, type Game } from "../../../data/games";
import UserLayout from "../../../layouts/UserLayout";
import { venues, type Venue } from "../../../data/venues";
import TopSportsComplexes from "../../../components/mainUser/Cities";

export default function MatchDetail() {
  const { id } = useParams<{ id: string }>();
  const game: Game | undefined = games.find((g) => g.id === Number(id));

  if (!game) return <div className="p-6">Game not found</div>;

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Game Detail */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{game.type}</h2>
                <p className="text-gray-500">
                  Hosted by {game.host.name} • {game.host.karma} Karma
                </p>
              </div>
              <img
                src={game.host.avatar}
                alt={game.host.name}
                className="w-12 h-12 rounded-full"
              />
            </div>

            {/* Match Info */}
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

            {/* Tags */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-gray-700">
              {game.going && (
                <div className="flex items-center gap-2">
                  <FaUser className="text-green-600" />
                  {game.going.current}/{game.going.total} Going
                </div>
              )}
              {game.level && (
                <span className="px-3 py-1 text-xs rounded-full bg-gray-100">
                  {game.level}
                </span>
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
                    : game.status === "BOOKED"
                    ? "bg-yellow-200 text-yellow-800"
                    : game.status === "LIMITED"
                    ? "bg-orange-200 text-orange-800"
                    : "bg-red-200 text-red-800"
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
              {games
                .filter((sim) => sim.id !== game.id)
                .slice(0, 3)
                .map((sim) => (
                  <Link key={sim.id} to={`/play/${sim.id}`}>
                    <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
                      <p className="text-xs text-gray-500">{sim.type}</p>
                      <p className="text-sm font-medium mt-1">
                        {sim.going
                          ? `${sim.going.current}/${sim.going.total} Going`
                          : "No players yet"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {sim.host.name} • {sim.host.karma} Karma
                      </p>
                      <p className="text-xs mt-2">
                        {sim.date}, {sim.time}
                      </p>
                      <p className="text-xs text-gray-500">
                        {sim.venue} ({sim.distance})
                      </p>
                      {sim.level && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                          {sim.level}
                        </span>
                      )}
                      {sim.price && (
                        <span className="ml-2 text-xs text-green-600">
                          {sim.price}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
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
              {venues.map((venue: Venue) => (
                <li key={venue.id} className="flex items-center gap-3">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-10 h-10 rounded-lg"
                  />
                  <div>
                    <p>{venue.name}</p>
                    <p className="text-xs text-gray-500">{venue.distance}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="mt-4 border border-gray-300 px-4 py-2 rounded-lg text-sm w-full hover:bg-gray-100">
              SEE ALL VENUES
            </button>
          </div>
        </div>
      </div>

      <TopSportsComplexes />

    </UserLayout>
  );
}
