import React from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";


interface Props {
  isLightMode: boolean;
}

const AppFooter: React.FC<Props> = ({ isLightMode }) => {
  const bgClass = isLightMode ? "bg-gray-100" : "bg-gray-900";
  const textColor = isLightMode ? "text-gray-900" : "text-white";
  const linkColor = isLightMode ? "text-gray-700 hover:text-gray-900" : "text-gray-400 hover:text-white";

  return (
    <footer className={`${bgClass} w-full border-t border-gray-700`}>
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-8 px-6 py-12">

        {/* About - Wide */}
        <div className="lg:col-span-2">
          <h3 className={`font-bold text-lg mb-2 ${textColor}`}>About</h3>
          
          <p className={`${textColor} text-sm leading-relaxed w-4/5`}>
            EchoPanda is a platform created for over <span className="text-pink-500">5 years</span> now.
            It is one of the most popular music streaming websites.
            You can listen and download songs for free. 
            If you want unlimited access, get our 
            <span className="text-blue-500 font-semibold"> Premium Pass.</span>
          </p>
        </div>

        {/* Melodies */}
          <div>
            <h3 className={`font-semibold text-lg mb-3 border-b border-gray-600 w-fit ${textColor}`}>
              Melodies
            </h3>
            <ul className="space-y-1 text-sm">
              <li><Link to="/" className={linkColor}>Songs</Link></li>
              <li><Link to="/radio" className={linkColor}>Radio</Link></li>
              <li><Link to="/podcast" className={linkColor}>Podcast</Link></li>
            </ul>
          </div>



        {/* Access */}
        <div>
          <h3 className={`font-semibold text-lg mb-3 border-b border-gray-600 w-fit ${textColor}`}>
            Access
          </h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/Discover" className={linkColor}>Explore</Link></li>
            <li><Link to="/artist" className={linkColor}>Artists</Link></li>
            <li><Link to="/playlist" className={linkColor}>Playlists</Link></li>
            <li><Link to="/albums" className={linkColor}>Albums</Link></li>
            <li><Link to="/most-played" className={linkColor}>Trending</Link></li>
          </ul>
        </div>


        {/* Contact */}
          <div>
            <h3 className={`font-semibold text-lg mb-3 border-b border-gray-600 w-fit ${textColor}`}>
              Contact
            </h3>
            <ul className="space-y-1 text-sm">
              <li><Link to="/AboutUs" className={linkColor}>About</Link></li>
              <li><Link to="/policy" className={linkColor}>Policy</Link></li>
              <li><Link to="/social" className={linkColor}>Social Media</Link></li>
              <li><Link to="/support" className={linkColor}>Support</Link></li>
            </ul>
          </div>


        {/* Branding & Social */}
        <div className="flex flex-col justify-between">
          <h3 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 text-xl">
            EchoPanda
          </h3>

          <div className="flex gap-4 text-xl mt-3">
            <FaFacebook className={linkColor} />
            <FaInstagram className={linkColor} />
            <FaTiktok className={linkColor} />
            <FaYoutube className={linkColor} />
            <FaTwitter className={linkColor} />
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="py-4 text-center text-xs text-gray-500 border-t border-gray-700">
        © 2025 EchoPanda. All rights reserved.
      </div>
    </footer>
  );
};

export default AppFooter;
