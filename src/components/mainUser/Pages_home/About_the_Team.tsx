export default function AboutTeam() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-12">
        <div className="bg-white rounded-2xl shadow-lg p-10 grid md:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <div>
            <h2 className="text-2xl font-bold mb-4">About the Team</h2>
            <p className="text-gray-600 mb-6">
              Clarity gives you the blocks & components you need to create a truly
              professional website, landing page or admin panel for your SaaS.
            </p>
            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700">
                READ OUR STORY
              </button>
              <button className="px-6 py-3 border border-gray-400 text-gray-800 font-semibold rounded-xl hover:bg-gray-100">
                WE ARE HIRING!
              </button>
            </div>
          </div>

          {/* Right images */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://playo-website.gumlet.io/playo-website-v3/icons/AboutUs_Image_sitting.png?q=30"
              alt="team1"
              className="rounded-xl object-cover w-full h-36"
            />
            <img
              src="https://playo-website.gumlet.io/playo-website-v3/icons/AboutUs_Image.png?q=30"
              alt="team2"
              className="rounded-xl object-cover w-full h-36"
            />
            <img
              src="	https://playo-website.gumlet.io/playo-website-v3/icons/AboutUs_Image_Jithin.png?q=30"
              alt="team3"
              className="rounded-xl object-cover w-full h-36"
            />
            <img
              src="https://playo-website.gumlet.io/playo-website-v3/icons/AboutUs_Image_Turf.png?q=30"
              alt="team4"
              className="rounded-xl object-cover w-full h-36"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
