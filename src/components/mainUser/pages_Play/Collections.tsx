// import React from "react";

const Collections = () => {
  return (
    <section className="bg-gray-50 rounded-2xl p-8 my-12 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Collections For You
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition">
          <img
            src="https://playo.co/_next/image?url=https%3A%2F%2Fplayo-website.gumlet.io%2Fplayo-website-v3%2Fmeet-collection%2Fvenues.png&w=828&q=75"
            alt="Top Venues"
            className="w-full h-[350px] object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-lg text-gray-800">
              Top Venues Near You
            </h3>
            <p className="text-sm text-gray-500">400+ venues</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition">
          <img
            src="https://playo.co/_next/image?url=https%3A%2F%2Fplayo-website.gumlet.io%2Fplayo-website-v3%2Fmeet-collection%2Ftrainer.png&w=828&q=75"
            alt="Best Coaches"
            className="w-full h-[350px] object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-lg text-gray-800">
              Explore Best Coaches
            </h3>
            <p className="text-sm text-gray-500">400+ venues</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition">
          <img
            src="https://playo.co/_next/image?url=https%3A%2F%2Fplayo-website.gumlet.io%2Fplayo-website-v3%2Fmeet-collection%2Fevents.png&w=828&q=75"
            alt="Best Events"
            className="w-full h-[350px] object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold text-lg text-gray-800">
              Discover Best Events
            </h3>
            <p className="text-sm text-gray-500">100+ Events & Deals</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;
