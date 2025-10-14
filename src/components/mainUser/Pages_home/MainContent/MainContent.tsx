import BookVenues from "./BookVenues";
import DiscoverGames from "./DiscoverGames";
import PopularSports from "./PopularSports";

const MainContent = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-12">
        <div className="bg-white shadow-lg rounded-2xl p-6 space-y-12">
          {/* Book Venues */}
          <BookVenues />

          {/* Discover Games */}
          <DiscoverGames />

          {/* Popular Sports */}
          <PopularSports />
        </div>
      </div>
    </section>
  );
};

export default MainContent;
