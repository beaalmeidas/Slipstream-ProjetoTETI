import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F1</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Slipstream</h1>
              <p className="text-xs text-gray-500">F1 Digital Notebook</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/posts" 
              className="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              Community
            </Link>
            <Link 
              to="/drivers" 
              className="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              Drivers
            </Link>
            <Link 
              to="/teams" 
              className="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              Teams
            </Link>
            <Link 
              to="/calendar" 
              className="text-gray-700 hover:text-red-600 font-medium transition-colors"
            >
              Calendar
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;