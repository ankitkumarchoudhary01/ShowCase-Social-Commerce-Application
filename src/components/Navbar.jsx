import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext"; // ✅ import context

function Navbar() {
  const navigate = useNavigate();
  const { cartItems = [] } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const { searchQuery, setSearchQuery } = useSearch();
  const [inputValue, setInputValue] = useState(searchQuery); 
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useContext(AuthContext); // ✅ use auth context

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [inputValue, setSearchQuery]);

  const handleLogout = () => {
    logout(); // ✅ updates context instantly
    navigate("/");
  };

  return (
    <div className="sticky top-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 z-50 shadow-lg w-full">
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between">
        
        {/* Logo */}
        <Link to="/brand-feed">
          <div className="text-2xl font-extrabold tracking-tight text-white hover:text-yellow-300 transition duration-300">
            ShopSocial
          </div>
        </Link>

        {/* Search Bar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-xl hidden md:block">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search for brands, styles, products or persons..."
              className="w-full px-4 py-2 pr-10 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-sm"
            />
            {inputValue && (
              <button
                onClick={() => setInputValue("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 focus:outline-none"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Right Side */}
        <div
          className={`w-full md:w-auto ${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 mt-3 md:mt-0`}
        >
          {user ? (
            <>
              <div className="flex items-center space-x-3 text-white">
                <img
                  src={
                    user.profilePic ||
                    "https://res.cloudinary.com/dakzbu1db/image/upload/v1753552318/profile-icon-design-free-vector_rlexmg.jpg"
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <span className="font-medium">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <div className="text-white text-base md:text-lg font-medium hover:text-yellow-200 transition duration-200 py-1">
                  Login
                </div>
              </Link>
              <Link to="/signup">
                <div className="text-white text-base md:text-lg font-medium hover:text-yellow-200 transition duration-200 py-1">
                  Signup
                </div>
              </Link>
            </>
          )}

          {/* Cart */}
          <Link to="/cart1">
            <div className="relative text-white text-base md:text-lg font-medium hover:text-yellow-200 transition duration-200 py-1">
              Cart 🛒
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
