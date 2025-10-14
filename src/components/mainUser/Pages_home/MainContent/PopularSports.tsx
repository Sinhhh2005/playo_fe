const sports = [
  { id: 1, name: "Badminton", image: "https://playo-website.gumlet.io/playo-website-v3/popular_sports/badminton_new.png?q=50" },
  { id: 2, name: "Football", image: "https://playo-website.gumlet.io/playo-website-v3/popular_sports/football_new.png?q=50" },
  { id: 3, name: "Cricket", image: "https://playo-website.gumlet.io/playo-website-v3/popular_sports/cricket_new.png?q=50" },
  { id: 4, name: "Swimming", image: "https://playo-website.gumlet.io/playo-website-v3/popular_sports/swimming_new.png?q=50" },
  { id: 5, name: "Tennis", image: "https://playo-website.gumlet.io/playo-website-v3/popular_sports/tennis_new.png?q=50" },
  { id: 6, name: "Table Tennis", image: "https://playo-website.gumlet.io/playo-website-v3/popular_sports/table_tennis_new.png?q=50" },
];

export default function PopularSports() {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Popular Sports</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {sports.map((sport) => (
          <div
            key={sport.id}
            className="relative h-60 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
          >
            {/* Ảnh full card */}
            <img
              src={sport.image}
              alt={sport.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay nhẹ ở dưới */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3">
              <p className="text-white font-semibold">{sport.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
