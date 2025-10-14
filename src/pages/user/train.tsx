import { useState } from "react";
import TrainFilterBar from "../../components/mainUser/pages_train/TrainFilterBar";
import TrainerCard from "../../components/mainUser/pages_train/TrainerCard";
import { trainers } from "../../data/trainData";
import { categories } from "../../data/categoriesData";
import type { Trainer } from "../../types/trainer";
import UserLayout from "../../layouts/UserLayout";
import TopSportsComplexes from "../../components/mainUser/Cities";

export default function TrainPage() {
  // Filter state
  const [filters, setFilters] = useState({
    services: [] as string[],
    age: [] as string[],
    batch: [] as string[],
    coachOnly: false,
    academyOnly: false,
    contacted: false,
    keyword: "",
  });

  // State cho load more
  const [visibleCount, setVisibleCount] = useState(9); // ban đầu hiển thị 9 trainer

  // Filter logic
  const filteredTrainers = trainers.filter((t) => {
    if (
      filters.keyword &&
      !t.name.toLowerCase().includes(filters.keyword.toLowerCase()) &&
      !t.location.toLowerCase().includes(filters.keyword.toLowerCase())
    ) {
      return false;
    }
    if (filters.services.length > 0 && !filters.services.some((s) => t.services.includes(s))) {
      return false;
    }
    if (filters.age.length > 0 && !filters.age.some((a) => t.ageGroups.includes(a))) {
      return false;
    }
    if (filters.batch.length > 0 && !filters.batch.some((b) => t.batch.includes(b))) {
      return false;
    }
    if (filters.coachOnly && t.type !== "trainer") return false;
    if (filters.academyOnly && t.type !== "academy") return false;
    if (filters.contacted && !t.contacted) return false;

    return true;
  });

  // Trainers hiển thị (theo visibleCount)
  const trainersToShow = filteredTrainers.slice(0, visibleCount);

  return (
    <UserLayout>
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Top Card (Search + Categories) */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h1 className="text-xl font-semibold mb-4">Sports Trainers in Bangalore</h1>
        <input
          type="text"
          placeholder="Search for coaches / academies"
          value={filters.keyword}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
          className="w-full border px-4 py-3 rounded-lg mb-6"
        />

        <p className="mb-4">
          <span className="text-blue-600 font-semibold">Hey!</span> What’re you looking to level up on?
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((c) => (
            <div
              key={c.name}
              className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer ${c.color} hover:scale-105 transition-transform`}
            >
              <img src={c.image} alt={c.name} className="w-16 h-16 object-contain" />
              <span className="mt-2 font-medium text-sm">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <TrainFilterBar filters={filters} setFilters={setFilters} />
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainersToShow.map((t: Trainer) => (
          <TrainerCard key={t.id} trainer={t} />
        ))}
      </div>

      {/* Load More button */}
      {visibleCount < filteredTrainers.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)} // mỗi lần load thêm 6
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
      {/* Are you a Trainer / Academy Section */}
        <div className="mt-12 flex justify-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl shadow-lg text-center max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">
            Are you a Trainer / Academy?
            </h2>
            <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow hover:bg-pink-600 transition">
                LIST WITH US 🚀
            </button>
            <button className="px-6 py-3 border border-gray-400 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition">
                FAQs ❓
            </button>
            </div>
        </div>
        </div>
    </div>
    <TopSportsComplexes/>
    </UserLayout>
  );
}
