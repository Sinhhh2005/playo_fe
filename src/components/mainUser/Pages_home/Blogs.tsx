import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const blogs = [
  {
    id: 1,
    title: "Learn Volleyball in 5!",
    desc: "The most simplified Volleyball manual…",
    date: "SEPTEMBER 26, 2018",
    author: "PLAYO",
    image: "https://playo.co/_next/image?url=https%3A%2F%2Fd20rwxqzk8p5vr.cloudfront.net%2Fwp-content%2Fuploads%2F2018%2F09%2F83de99b7a72b7e0b9ff755c60efc8623.gif&w=3840&q=75",
  },
  {
    id: 2,
    title: "Names Celebrated by Cr...",
    desc: "Understand what it takes to become…",
    date: "MARCH 3, 2016",
    author: "SHERYL THOMAS",
    image: "https://playo.co/_next/image?url=https%3A%2F%2Fd20rwxqzk8p5vr.cloudfront.net%2Fwp-content%2Fuploads%2F2016%2F03%2F9836_mr.jpg&w=3840&q=75",
  },
  {
    id: 3,
    title: "Easy-to-Learn Badminto...",
    desc: "Get a peek of game-basics that'll show…",
    date: "AUGUST 2, 2019",
    author: "NIDHI PATEL",
    image: "https://playo.co/_next/image?url=https%3A%2F%2Fd20rwxqzk8p5vr.cloudfront.net%2Fwp-content%2Fuploads%2F2019%2F08%2FVenues-Blog-cover-Image.png&w=3840&q=75",
  },
  {
    id: 4,
    title: "A Spectator’s Tourname...",
    desc: "This is how you go prepped for a Game…",
    date: "JANUARY 12, 2022",
    author: "PLAYO",
    image: "https://playo.co/_next/image?url=https%3A%2F%2Fd20rwxqzk8p5vr.cloudfront.net%2Fwp-content%2Fuploads%2F2017%2F09%2Ffeatured-image-7.jpg&w=3840&q=75",
  },
  {
    id: 5,
    title: "Take Football Shots Like ...",
    desc: "Learn what it takes to master popular…",
    date: "APRIL 15, 2017",
    author: "ARJUN THOMAS",
    image: "https://playo.co/_next/image?url=https%3A%2F%2Fd20rwxqzk8p5vr.cloudfront.net%2Fwp-content%2Fuploads%2F2017%2F04%2F4.png&w=3840&q=75",
  },
  {
    id: 6,
    title: "Mastering Table Tennis",
    desc: "Tips to improve your game quickly…",
    date: "MAY 22, 2020",
    author: "PLAYO",
    image: "https://playo.co/_next/image?url=https%3A%2F%2Fd20rwxqzk8p5vr.cloudfront.net%2Fwp-content%2Fuploads%2F2017%2F04%2Fwater-zorbing-in-bangalore.jpg&w=3840&q=75",
  },
];

export default function Blogs() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev < blogs.length - itemsPerPage ? prev + 1 : prev
    );
  };

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-12">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6">Blogs to Keep You Fit!</h2>

          {/* Wrapper */}
          <div className="relative overflow-hidden">
            {/* Track */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)`,
                width: `${(blogs.length / itemsPerPage) * 100}%`,
              }}
            >
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="w-1/5 px-2 box-border" // 5 items mỗi slide => w-1/5
                >
                  <div className="bg-white rounded-xl shadow p-2">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-36 object-cover rounded-lg mb-2"
                    />
                    <h3 className="font-semibold text-sm truncate">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-1 truncate">
                      {blog.desc}
                    </p>
                    <p className="text-xs text-green-700 font-medium">
                      {blog.date} | {blog.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className={`p-2 rounded-full shadow ${
                startIndex === 0
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex >= blogs.length - itemsPerPage}
              className={`p-2 rounded-full shadow ${
                startIndex >= blogs.length - itemsPerPage
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
