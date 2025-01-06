import React from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg text-white fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center space-x-2">
          <div className="bg-white text-purple-600 p-2 rounded-full shadow-md">
          <span
  className="text-2xl font-extrabold tracking-wider"
  style={{
    fontFamily: 'Arial, sans-serif',
    fontSize: '2.5rem',
    background: 'linear-gradient(to right, #6b46c1, #3182ce)', // Correspond à purple-600 et blue-600
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Subtle shadow for better readability
    letterSpacing: '0.1em',
  }}
>
  TB
</span>
          </div>
          <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-200 transition duration-300">
            TaskB
          </Link>
        </div>

        <div className="flex space-x-6">
          <Link to="/" className="hover:text-gray-200 text-lg transition duration-300">
            Home
          </Link>
          {isLoggedIn && (
            <Link to="/dashboard" className="hover:text-gray-200 text-lg transition duration-300">
              Dashboard
            </Link>
          )}
        </div>

        <div>
          {isLoggedIn ? (
            <button
            onClick={handleLogout}
            className="flex items-center bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow hover:bg-red-600 transition duration-300"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
            Logout
          </button>
          ) : (
            <Link
              to="/login"
              className="bg-white text-purple-600 font-semibold py-2 px-4 rounded-full shadow hover:bg-gray-200 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}