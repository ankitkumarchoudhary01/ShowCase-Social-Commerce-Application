import { Link, useLocation } from 'react-router-dom';
import React from 'react';

function Footer() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sticky bottom-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white py-4 shadow-inner w-full z-50">
      <div className="container mx-auto lg:px-4 flex lg:flex-wrap justify-center gap-6 sm:gap-10 text-base sm:text-lg font-normal">
        <Link to="/brand-feed">
          <div className={`text-white ${isActive('/brand-feed') ? 'font-bold text-yellow-300' : ''}`}>
            Brand Feed
          </div>
        </Link>
        <Link to="/user-feed">
          <div className={`text-white ${isActive('/user-feed') ? 'font-bold text-yellow-300' : ''}`}>
            User Feed
          </div>
        </Link>
        <Link to="/create-post">
          <div className={`text-white ${isActive('/create-post') ? 'font-bold text-yellow-300' : ''}`}>
            Create Post
          </div>
        </Link>
        <Link to="/OffersPage">
          <div className={`text-white ${isActive('/OffersPage') ? 'font-bold text-yellow-300' : ''}`}>
            Offers
          </div>
        </Link>
        <Link to="/shop">
          <div className={`text-white ${isActive('/shop') ? 'font-bold text-yellow-300' : ''}`}>
            Shop
          </div>
        </Link>
        <Link to="/profile/:username">
          <div className={`text-white ${isActive('/user-profile') ? 'font-bold text-yellow-300' : ''}`}>
            Profile
          </div>
        </Link>
      </div>
    </div>
  );
}

export default React.memo(Footer);
