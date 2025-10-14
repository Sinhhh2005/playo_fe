import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaFilter, FaMoneyBill } from "react-icons/fa";
import { GiTennisBall } from "react-icons/gi";
import { MdOutlineAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";

import { games } from "../../../data/games";  // ✅ import data từ file ngoài
import type { Game } from "../../../data/games";

const GamesList: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      {/* Title + Download App */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Games in Bangalore</h1>

        <div className="flex items-center mt-4 md:mt-0">
          <span className="text-sm mr-2">To create a game, download Playo app</span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="h-8 mr-2"
          />
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            className="h-8"
          />
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button className="flex items-center space-x-2 px-4 py-2 border rounded-full bg-white shadow-sm hover:bg-gray-50">
          <MdOutlineAccessTime className="text-yellow-500" />
          <span className="text-sm">GameTime by Playo</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 border rounded-full bg-white shadow-sm hover:bg-gray-50">
          <FaFilter />
          <span className="text-sm">Filter & Sort By</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 border rounded-full bg-white shadow-sm hover:bg-gray-50">
          <GiTennisBall />
          <span className="text-sm">Sports</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 border rounded-full bg-white shadow-sm hover:bg-gray-50">
          <FaCalendarAlt />
          <span className="text-sm">Date</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 border rounded-full bg-white shadow-sm hover:bg-gray-50">
          <FaMoneyBill />
          <span className="text-sm">Pay & Join Game</span>
        </button>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map((game: Game) => (
          <Link
            key={game.id}
            to={`/play/${game.id}`}
            className="bg-white border rounded-xl shadow-sm hover:shadow-md p-4 block"
          >
            {/* Header */}
            <p className="text-sm text-gray-500 mb-2">{game.type}</p>

            <div className="flex justify-between items-center mb-2">
              {/* Avatar */}
              <div className="flex items-center space-x-2">
                <img
                  src={game.host.avatar}
                  alt={game.host.name}
                  className="w-8 h-8 rounded-full"
                />
              </div>

              {/* Slots / Going */}
              {game.slots && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full flex items-center">
                  🎾 Only {game.slots} Slots
                </span>
              )}
              {game.going && (
                <span className="text-sm font-semibold text-gray-700">
                  {game.going.current}/{game.going.total}{" "}
                  <span className="font-normal">Going</span>
                </span>
              )}
            </div>

            {/* Host name + Karma */}
            <p className="text-sm text-gray-700 mb-3">
              {game.host.name} | {game.host.karma} Karma
            </p>

            {/* Date & Time */}
            <p className="text-gray-900 font-medium text-sm">
              {game.date}, {game.time}
            </p>

            {/* Venue */}
            <p className="flex items-center text-gray-600 text-sm mt-1">
              <FaMapMarkerAlt className="mr-1" /> {game.venue} {game.distance}
            </p>

            {/* Level + Status */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">
                {game.level}
              </span>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  game.status === "OPEN"
                    ? "bg-green-100 text-green-600"
                    : game.status === "BOOKED"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {game.status}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-10">
        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Load More
        </button>
      </div>
    </section>
  );
};

export default GamesList;
