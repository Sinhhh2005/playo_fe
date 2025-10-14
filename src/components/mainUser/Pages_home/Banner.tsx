import { FiMapPin } from "react-icons/fi";

const Banner = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 bg-white">
      {/* Left content */}
      <div className="flex-1 space-y-6">
        {/* Location input */}
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg w-72">
          <FiMapPin className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Bangalore"
            className="bg-transparent outline-none w-full text-gray-700"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          FIND PLAYERS & VENUES <br /> NEARBY
        </h1>

        {/* Sub text */}
        <p className="text-gray-500 text-lg">
          Seamlessly explore sports venues and play with sports enthusiasts just
          like you!
        </p>
      </div>

      {/* Right images */}
      <div className="flex-1 relative grid grid-cols-2 grid-rows-2 gap-0 mt-8 md:mt-0 md:pl-12 h-[400px]">
        {/* Ảnh bên trái (chiếm 2 hàng) */}
        <img
          src="https://playo-website.gumlet.io/playo-website-v3/hero/hero_left.png?q=50"
          alt="Basketball"
          className="w-full h-full object-cover row-span-2"
        />

        {/* Ảnh trên bên phải */}
        <img
          src="https://playo-website.gumlet.io/playo-website-v3/hero/hero_right_top.png?q=50"
          alt="Badminton"
          className="w-full h-full object-cover"
        />

        {/* Ảnh dưới bên phải */}
        <img
          src="https://playo-website.gumlet.io/playo-website-v3/hero/hero_right_bottom.png?q=50"
          alt="Football"
          className="w-full h-full object-cover"
        />

        {/* Icon Playo ở đúng giao nhau */}
        <div className="absolute top-1/2 left-[54%] -translate-x-1/2 -translate-y-1/2">
          <div className="bg-green-600 rounded-full shadow-lg flex items-center justify-center">
            <img
              src="https://playo-website.gumlet.io/playo-website-v3/hero/hero_playo_logo.png?q=90"
              alt="Playo Logo"
              className="w-20 h-20"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
