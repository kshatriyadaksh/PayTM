import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 animate-fade-in-down">
        Simple, Fast & Secure
      </h1>
      <p className="text-lg sm:text-xl text-white mb-8 animate-fade-in-up">
        India's one of the most trusted payment applications
      </p>
      <div className="flex gap-6 flex-wrap justify-center">
        <Link to="/signup">
          <button className="px-6 py-3 rounded-full bg-white text-indigo-600 font-semibold hover:bg-gray-200 transition duration-300">
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-indigo-600 transition duration-300">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
