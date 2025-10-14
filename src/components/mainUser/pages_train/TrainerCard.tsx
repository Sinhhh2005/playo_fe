import { Link } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import type { Trainer } from "../../../types/trainer";

type Props = {
  trainer: Trainer;
};

export default function TrainerCard({ trainer }: Props) {
  return (
    <Link to={`/train/${trainer.id}`} className="block">
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-300">
        {/* Images row */}
        <div className="grid grid-cols-2 gap-0 h-52 relative">
          <img
            src={trainer.image}
            alt={trainer.name}
            className="w-full h-50 object-cover"
          />
          <img
            src={trainer.image2 || trainer.image}
            alt={`${trainer.name}-2`}
            className="w-full h-50 object-cover"
          />

          {/* Badge TRAINER */}
          <span className="absolute bottom-2 left-2 bg-white text-xs font-medium px-2 py-0.5 rounded shadow">
            TRAINER
          </span>

          {/* Badge New */}
          {trainer.isNew && (
            <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-0.5 rounded">
              ★ New
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          {/* --- Tên (dòng 1) --- */}
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {trainer.name}
          </h3>

          {/* --- Địa điểm đầy đủ (dòng 2) --- */}
          <p
            className="text-sm text-gray-600 flex items-start gap-2 mb-2 whitespace-normal break-words"
            title={trainer.location}
          >
            <FiMapPin className="mt-0.5 text-gray-400" />
            <span>{trainer.location}</span>
          </p>

          {/* Age groups (icon + text) */}
          <div className="flex items-center gap-2 text-sm text-green-700 mb-3">
            <FaUserFriends className="text-green-600" />
            <span>{trainer.ageGroups.join(" & ")}</span>
          </div>

          {/* INSTANT CONNECT button (white rounded-full, shadow) */}
          <button className="w-full bg-white border rounded-full py-2 font-semibold text-gray-800 shadow-sm hover:shadow-md transition active:translate-y-0.5">
            INSTANT CONNECT 🚀
          </button>

          {/* Interest text */}
          <p className="mt-3 text-xs text-gray-500 text-center">
            {trainer.interests > 0
              ? `${trainer.interests} showed Interest`
              : "Be the first to show interest!"}
          </p>
        </div>
      </div>
    </Link>
  );
}
