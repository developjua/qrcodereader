import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6 animate__animated animate__fadeIn animate__delay-1s">
        Welcome to QR Code Reader
      </h1>
      <p className="text-gray-600 text-lg mb-8 text-center animate__animated animate__fadeIn animate__delay-2s">
        Please log in or sign up to continue.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105 duration-300"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105 duration-300"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Home;
