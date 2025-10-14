import React from "react";

const SpotlightSlider = () => {
  const cards = [
    {
      spotlight: true, // đây là thẻ đặc biệt
    },
    {
      title: (
        <>
          Play.<br />
          <span className="text-lime-400">Refer. Earn.</span>
          <br /> Repeat.
        </>
      ),
      button: "Refer Now",
      img: "https://img.icons8.com/fluency/96/money.png",
    },
    {
      title: (
        <>
          Find Your <span className="text-lime-400">Coach.</span>
          <br /> Crush Your <span className="text-lime-400">Goals.</span>
        </>
      ),
      button: "Train Smarter",
      img: "https://img.icons8.com/fluency/96/whistle.png",
    },
    {
      title: (
        <>
          Got a Turf?<br /> Turn It Into a{" "}
          <span className="text-lime-400">Hotspot!</span>
        </>
      ),
      button: "List Your Venue",
      img: "https://img.icons8.com/color/96/stadium.png",
    },
    {
      title: (
        <>
          Got Ideas?<br /> We’re <span className="text-lime-400">All Ears!</span>
        </>
      ),
      button: "Tell Us What You Think",
      img: "https://img.icons8.com/color/96/idea.png",
    },
    {
      title: (
        <>
          Play More.<br /> <span className="text-lime-400">Pay Less.</span>
        </>
      ),
      button: "Join Now",
      img: "https://img.icons8.com/fluency/96/discount.png",
    },
  ];

  return (
    <section className="w-full my-12">
      <div className="overflow-hidden relative w-full bg-gray-100 pause-on-hover">
        <div className="flex animate-scroll">
          {/* Lặp 2 lần để chạy vô tận */}
          {cards.concat(cards).map((card, i) =>
            card.spotlight ? (
              <div
                key={i}
                className="min-w-[80px] md:min-w-[100px] bg-yellow-400 flex items-center justify-center mx-2 flex-shrink-0"
              >
                <h2 className="text-lg font-bold [writing-mode:vertical-rl] rotate-180 tracking-wider text-black">
                  SPOTLIGHT
                </h2>
              </div>
            ) : (
              <div
                key={i}
                className="min-w-[280px] md:min-w-[320px] bg-green-700 text-white p-6 flex flex-col items-center justify-between mx-2 flex-shrink-0 rounded-xl"
              >
                <div className="text-2xl font-bold text-center">{card.title}</div>
                <img src={card.img} alt="icon" className="w-20 my-6" />
                <button className="bg-white text-green-700 font-bold px-4 py-2 rounded-lg hover:bg-gray-200">
                  {card.button}
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default SpotlightSlider;
