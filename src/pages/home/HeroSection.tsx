import React from "react";

interface Props {
  isLightMode: boolean;
}

const HeroSection: React.FC<Props> = ({ isLightMode }) => {
  const textColor = "text-white";

  return (
    <section className="relative mt-4 mb-8 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/image.png" 
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[350px]">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className={`text-4xl font-bold ${textColor}`}>
              All the <span className="text-blue-500">Best Songs</span>
              <br />in One Place
            </h1>
            
            <p className="text-gray-200 text-base leading-relaxed">
              On our website, you can access an amazing collection of popular and new songs. 
              Stream your favorite tracks in high quality and enjoy without interruptions. 
              Whatever your taste in music, we have it all for you!
            </p>

            <div className="flex gap-4">
              <button className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Discover Now
              </button>
              <button className="px-6 py-2.5 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500/10 transition">
                Create Playlist
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="hidden md:block" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;