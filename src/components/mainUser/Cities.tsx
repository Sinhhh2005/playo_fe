import React, { useState } from "react";

const cities = [
  {
    name: "bangalore",
    desc: "Sports Complexes in Bangalore | Badminton Courts in Bangalore | Football Grounds in Bangalore | Cricket Grounds in Bangalore | Tennis Courts in Bangalore | Basketball Courts in Bangalore | Table Tennis Clubs in Bangalore | Volleyball Courts in Bangalore | Swimming Pools in Bangalore",
  },
  {
    name: "chennai",
    desc: "Sports Complexes in Chennai | Badminton Courts in Chennai | Football Grounds in Chennai | Cricket Grounds in Chennai | Tennis Courts in Chennai | Basketball Courts in Chennai | Table Tennis Clubs in Chennai | Volleyball Courts in Chennai | Swimming Pools in Chennai",
  },
  {
    name: "hyderabad",
    desc: "Sports Complexes in Hyderabad | Badminton Courts in Hyderabad | Football Grounds in Hyderabad | Cricket Grounds in Hyderabad | Tennis Courts in Hyderabad | Basketball Courts in Hyderabad | Table Tennis Clubs in Hyderabad | Volleyball Courts in Hyderabad | Swimming Pools in Hyderabad",
  },
  {
    name: "pune",
    desc: "Sports Complexes in Pune | Badminton Courts in Pune | Football Grounds in Pune | Cricket Grounds in Pune | Tennis Courts in Pune | Basketball Courts in Pune | Table Tennis Clubs in Pune | Volleyball Courts in Pune | Swimming Pools in Pune",
  },
  {
    name: "vijayawada",
    desc: "Sports Complexes in Vijayawada | Badminton Courts in Vijayawada | Football Grounds in Vijayawada | Cricket Grounds in Vijayawada | Tennis Courts in Vijayawada | Basketball Courts in Vijayawada | Table Tennis Clubs in Vijayawada | Volleyball Courts in Vijayawada | Swimming Pools in Vijayawada",
  },
  {
    name: "mumbai",
    desc: "Sports Complexes in Mumbai | Badminton Courts in Mumbai | Football Grounds in Mumbai | Cricket Grounds in Mumbai | Tennis Courts in Mumbai | Basketball Courts in Mumbai | Table Tennis Clubs in Mumbai | Volleyball Courts in Mumbai | Swimming Pools in Mumbai",
  },
  {
    name: "Delhi NCR",
    desc: "Sports Complexes in Delhi NCR | Badminton Courts in Delhi NCR | Football Grounds in Delhi NCR | Cricket Grounds in Delhi NCR | Tennis Courts in Delhi NCR | Basketball Courts in Delhi NCR | Table Tennis Clubs in Delhi NCR | Volleyball Courts in Delhi NCR | Swimming Pools in Delhi NCR",
  },
  {
    name: "Visakhapatnam",
    desc: "Sports Complexes in Visakhapatnam | Badminton Courts in Visakhapatnam | Football Grounds in Visakhapatnam | Cricket Grounds in Visakhapatnam | Tennis Courts in Visakhapatnam | Basketball Courts in Visakhapatnam | Table Tennis Clubs in Visakhapatnam | Volleyball Courts in Visakhapatnam | Swimming Pools in Visakhapatnam",
  },
  {
    name: "guntur",
    desc: "Sports Complexes in Guntur | Badminton Courts in Guntur | Football Grounds in Guntur | Cricket Grounds in Guntur | Tennis Courts in Guntur | Basketball Courts in Guntur | Table Tennis Clubs in Guntur | Volleyball Courts in Guntur | Swimming Pools in Guntur",
  },
  {
    name: "Kochi",
    desc: "Sports Complexes in Kochi | Badminton Courts in Kochi | Football Grounds in Kochi | Cricket Grounds in Kochi | Tennis Courts in Kochi | Basketball Courts in Kochi | Table Tennis Clubs in Kochi | Volleyball Courts in Kochi | Swimming Pools in Kochi",
  },
  {
    name: "🇦🇪 dubai",
    desc: "Sports Complexes in Dubai | Badminton Courts in Dubai | Football Grounds in Dubai | Cricket Grounds in Dubai | Tennis Courts in Dubai | Basketball Courts in Dubai | Table Tennis Clubs in Dubai | Volleyball Courts in Dubai | Swimming Pools in Dubai",
  },
  {
    name: "🇶🇦 Qatar",
    desc: "Sports Complexes in Qatar | Badminton Courts in Qatar | Football Grounds in Qatar | Cricket Grounds in Qatar | Tennis Courts in Qatar | Basketball Courts in Qatar | Table Tennis Clubs in Qatar | Volleyball Courts in Qatar | Swimming Pools in Qatar",
  },
  {
    name: "🇦🇺 Australia",
    desc: "Sports Complexes in Australia | Badminton Courts in Australia | Football Grounds in Australia | Cricket Grounds in Australia | Tennis Courts in Australia | Basketball Courts in Australia | Table Tennis Clubs in Australia | Volleyball Courts in Australia | Swimming Pools in Australia",
  },
  {
    name: "🇴🇲 Oman",
    desc: "Sports Complexes in Oman | Badminton Courts in Oman | Football Grounds in Oman | Cricket Grounds in Oman | Tennis Courts in Oman | Basketball Courts in Oman | Table Tennis Clubs in Oman | Volleyball Courts in Oman | Swimming Pools in Oman",
  },
  {
    name: "🇱🇰 Sri Lanka",
    desc: "Sports Complexes in Sri Lanka | Badminton Courts in Sri Lanka | Football Grounds in Sri Lanka | Cricket Grounds in Sri Lanka | Tennis Courts in Sri Lanka | Basketball Courts in Sri Lanka | Table Tennis Clubs in Sri Lanka | Volleyball Courts in Sri Lanka | Swimming Pools in Sri Lanka",
  },
];

const TopSportsComplexes: React.FC = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleCity = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header xanh lá */}
        <div className="bg-green-600 rounded-t-2xl px-6 py-6 flex flex-col md:flex-row justify-between items-center text-white">
          <h2 className="text-lg font-semibold">
            Get the Playo app for a seamless experience!
          </h2>
          <div className="flex gap-3 mt-3 md:mt-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-10"
            />
          </div>
        </div>

        {/* Nội dung */}
        <div className="bg-white rounded-b-2xl shadow px-6 py-8">
          <h3 className="text-lg font-semibold mb-6">
            Top Sports Complexes in Cities
          </h3>
          {/* Thêm auto-rows-min */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-min">
            {cities.map((city, index) => (
              <div
                key={index}
                className="border rounded-lg bg-gray-50 hover:shadow transition"
              >
                <div
                  className="flex justify-between items-center px-4 py-3 cursor-pointer"
                  onClick={() => toggleCity(index)}
                >
                  <h4 className="font-medium capitalize">{city.name}</h4>
                  <span
                    className={`text-gray-500 transform transition-transform ${
                      openIndexes.includes(index) ? "rotate-90" : ""
                    }`}
                  >
                    ›
                  </span>
                </div>
                {openIndexes.includes(index) && (
                  <div className="px-4 pb-4 text-sm text-gray-600">
                    {city.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSportsComplexes;
