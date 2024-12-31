import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-700 shadow-lg text-white fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-white text-blue-500 p-2 rounded-full shadow-md">
            <span className="text-2xl font-extrabold tracking-wider">TB</span>
          </div>
          <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-200 transition duration-300">
            TaskBot
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-gray-200 text-lg transition duration-300">
            Home
          </Link>
          <Link to="/login" className="hover:text-gray-200 text-lg transition duration-300">
            Login
          </Link>
          <Link to="/dashboard" className="hover:text-gray-200 text-lg transition duration-300">
            Dashboard
          </Link>
        </div>

        {/* CTA Button */}
        <div>
          <Link
            to="/dashboard"
            className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-full shadow hover:bg-gray-200 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
