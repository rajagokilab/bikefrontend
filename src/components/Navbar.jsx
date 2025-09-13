import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png'; // Your logo image

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);        // Mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // User dropdown

  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    setDropdownOpen(false);  // Close dropdown on logout
    navigate('/login');
  };

  // Close mobile menu when a link is clicked
  const handleMobileLinkClick = () => setMenuOpen(false);

  return (
    <nav className="bg-white p-2 shadow-lg w-full fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between max-w-[1200px] mx-auto">
        
        {/* Logo */}
        <Link to="/" onClick={handleMobileLinkClick}>
          <img src={Logo} alt="DriveRP" className="h-20 w-50" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium text-xl">
          <Link to="/" className="hover:text-cyan-600 transition-colors duration-300">Home</Link>
          <Link to="/buy" className="hover:text-cyan-600 transition-colors duration-300">Buy Bike</Link>
          <Link to="/sell" className="hover:text-cyan-600 transition-colors duration-300">Sell Bike</Link>
          <Link to="/about" className="hover:text-cyan-600 transition-colors duration-300">About Us</Link>
          <Link to="/contact" className="hover:text-cyan-600 transition-colors duration-300">Contact Us</Link>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          {username ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-[#2a6889] text-white py-2 px-6 rounded-full font-semibold text-xl shadow-md hover:bg-[#1f526b] transition-colors duration-300"
              >
                {username}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-[#2a6889] text-white py-2 px-6 rounded-full font-semibold text-xl shadow-md hover:bg-[#1f526b] transition-colors duration-300">
                Login
              </button>
            </Link>
          )}

          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 cursor-pointer hover:text-cyan-600 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col space-y-2 p-4 md:hidden">
          <Link to="/" className="hover:text-cyan-600" onClick={handleMobileLinkClick}>Home</Link>
          <Link to="/buy" className="hover:text-cyan-600" onClick={handleMobileLinkClick}>Buy Bike</Link>
          <Link to="/sell" className="hover:text-cyan-600" onClick={handleMobileLinkClick}>Sell Bike</Link>
          <Link to="/about" className="hover:text-cyan-600" onClick={handleMobileLinkClick}>About Us</Link>
          <Link to="/contact" className="hover:text-cyan-600" onClick={handleMobileLinkClick}>Contact Us</Link>

          {username ? (
            <div className="mt-2">
              <button
                className="bg-[#2a6889] text-white py-2 px-6 rounded-full font-semibold shadow-md hover:bg-[#1f526b] transition-colors duration-300 w-full"
                onClick={() => { handleLogout(); setMenuOpen(false); }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={handleMobileLinkClick}>
              <button className="bg-[#2a6889] text-white py-2 px-6 rounded-full font-semibold shadow-md hover:bg-[#1f526b] transition-colors duration-300 mt-2 w-full">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
