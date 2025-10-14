import { useParams, Link } from "react-router-dom";
import { trainers } from "../../../data/trainData";
import { categories } from "../../../data/categoriesData";
import UserLayout from "../../../layouts/UserLayout";
import { useState } from "react";
import TopSportsComplexes from "../../../components/mainUser/Cities";
import { FiMapPin } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";


export default function TrainerDetailPage() {
  const { id } = useParams();
  const trainer = trainers.find((t) => t.id.toString() === id);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [showInfo, setShowInfo] = useState(false);


  if (!trainer) {
    return (
      <UserLayout>
        <div className="p-6 text-center text-gray-600">Trainer not found</div>
      </UserLayout>
    );
  }

  // Danh sách slide: 1 text + nhiều ảnh
  const slides = [
    { type: "text" },
    { type: "image", src: trainer.image },
    { type: "image", src: trainer.image2 || "/images/demo/tr2.jpg" },
    { type: "image", src: "/images/demo/tr3.jpg" },
  ];

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % (slides.length - 1));
  const prevSlide = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 2 : (prev - 1) % (slides.length - 1)
    );

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ===== LEFT SIDEBAR ===== */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <img
            src={trainer.image}
            alt={trainer.name}
            className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-white shadow"
          />
          <h2 className="text-xl font-semibold text-center">{trainer.name}</h2>
          <p className="text-gray-500 text-sm text-center mb-2">
            {trainer.location}
          </p>

          <iframe
            title="map"
            src="https://maps.google.com/maps?q=Bengaluru&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-40 rounded-xl my-3"
          ></iframe>

          <div className="w-full mt-3">
            <h4 className="font-semibold text-gray-700">Classes</h4>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              {trainer.batch.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="w-full mt-4">
            <h4 className="font-semibold text-gray-700">Sports</h4>
            <p className="text-blue-600 font-medium text-sm">
              {trainer.services.join(", ")}
            </p>
          </div>
        </div>

        {/* ===== MIDDLE CONTENT ===== */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* --- Intro Section (Text + Image pairs) --- */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <div className="grid md:grid-cols-2 gap-4 w-full items-stretch">
              {/* Slide đầu tiên: text + ảnh 1 */}
              {currentSlide === 0 ? (
                <>
                  <div className="bg-green-50 rounded-2xl p-5 flex items-center">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {trainer.name} – Sports Coordinator & Physical Education
                      Specialist based in Bengaluru. I have 3+ years of
                      experience in coaching, fitness, and team sports,
                      including volleyball, cricket, and netball. I specialize
                      in strength training, conditioning, and holistic athlete
                      development.
                    </p>
                  </div>
                  <img
                    src={trainer.image}
                    alt="trainer"
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                </>
              ) : (
                // Các slide sau hiển thị 2 ảnh
                <>
                  <img
                    src={slides[currentSlide].src}
                    alt="previous"
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                  <img
                    src={
                      slides[currentSlide + 1]
                        ? slides[currentSlide + 1].src
                        : slides[1].src
                    }
                    alt="current"
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                </>
              )}
            </div>

            {/* Nút điều hướng */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 text-gray-600 border"
              >
                <FiChevronLeft className="text-xl" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 text-gray-600 border"
              >
                <FiChevronRight className="text-xl" />
              </button>
            </div>
          </div>
          {/* --- Availability + Pricing --- */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Available On</h3>
            <div className="flex gap-2 flex-wrap mb-4">
              {trainer.availableDays?.map((day) => (
                <span
                  key={day}
                  className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm"
                >
                  {day}
                </span>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-2">Pricing</h3>
            <p className="text-gray-700">
              {trainer.price
                ? `${trainer.price} per session`
                : "Contact for pricing"}
            </p>
          </div>

          {/* --- About Coach --- */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-3">About Coach</h3>
            <p className="text-gray-700 leading-relaxed">
              {trainer.fullBio ||
                "I am a Sports Coordinator with a passion for coaching and physical education, focusing on holistic development and strength training."}
            </p>
          </div>

          {/* --- Certifications --- */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">
              Certifications & Awards
            </h3>
            {trainer.certifications?.length ? (
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {trainer.certifications.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No certifications listed</p>
            )}
          </div>

          {/* --- Similar Trainers --- */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">
              Similar Trainers / Academies
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {trainers
                .filter((t) => t.id !== trainer.id)
                .slice(0, 2)
                .map((t) => (
                  <Link
                    to={`/train/${t.id}`}
                    key={t.id}
                    className="border rounded-2xl overflow-hidden hover:shadow-md transition bg-white"
                  >
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">{t.name}</h4>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mb-1">
                        <FiMapPin className="text-gray-400" /> {t.location}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-green-700 mb-2">
                        <FaUserFriends className="text-green-600" />
                        <span>{t.ageGroups?.join(" & ") || "Adults"}</span>
                      </div>
                      <button className="w-full border rounded-full py-1.5 text-sm font-medium hover:bg-gray-50">
                        INSTANT CONNECT 🚀
                      </button>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* ===== RIGHT SIDEBAR ===== */}
        <div className="flex flex-col gap-6">
          {/* Contact Form */}
<div className="bg-white rounded-2xl shadow p-6">
  <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>

  {/* Select Service (fixed) */}
  <div className="mb-4">
    <label className="block text-gray-700 text-sm mb-1">
      Select Service<span className="text-red-500">*</span>
    </label>
    <div className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
      {trainer.services[0] || "Volleyball"}
    </div>
  </div>

  {/* Add Message toggle */}
  <button
    onClick={() => setShowMessage(!showMessage)}
    className="flex items-center justify-between w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition"
  >
    <span>Add Message (optional)</span>
    <span
      className={`text-xl font-bold transition-transform ${
        showMessage ? "rotate-45 text-green-500" : ""
      }`}
    >
      +
    </span>
  </button>

  {/* Message input */}
  {showMessage && (
    <textarea
      placeholder="Write your message..."
      rows={3}
      className="mt-3 w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-700 focus:ring-2 focus:ring-green-400 outline-none resize-none"
    />
  )}

  {/* Show personal info */}
  <button
    onClick={() => setShowInfo(!showInfo)}
    className="text-green-600 text-sm font-medium mt-4 flex items-center gap-1 hover:underline"
  >
    SHOW PERSONAL INFO
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-4 h-4 transition-transform ${
        showInfo ? "rotate-180" : ""
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {/* Personal Info fields */}
  {showInfo && (
    <div className="mt-3 space-y-2 text-sm text-gray-600">
      <input
        type="text"
        placeholder="Full Name"
        className="w-full border border-gray-200 rounded-lg px-3 py-2"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-200 rounded-lg px-3 py-2"
      />
      <input
        type="tel"
        placeholder="Phone"
        className="w-full border border-gray-200 rounded-lg px-3 py-2"
      />
    </div>
  )}

  {/* Submit button */}
  <button className="w-full mt-5 bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition">
    SEND INSTANT REQUEST 🚀
  </button>
</div>


          {/* Categories */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">
              Explore by categories
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {categories.slice(0, 9).map((c) => (
                <div
                  key={c.name}
                  className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${c.color} hover:scale-105 transition`}
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="text-xs mt-1">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TopSportsComplexes />
    </UserLayout>
  );
}
