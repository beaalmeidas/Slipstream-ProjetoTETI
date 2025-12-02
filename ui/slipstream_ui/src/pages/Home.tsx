import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-red-600">F1 Slipstream</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your digital Formula 1 notebook. Analyze races, track statistics, 
          and connect with the F1 community.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-red-600 text-xl font-bold">📝</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Race Analysis</h3>
          <p className="text-gray-600">
            Write and share your race analyses, driver performances, and strategy insights.
          </p>
          <Link to="/create-post" className="inline-block mt-4 text-red-600 font-medium hover:text-red-700">
            Start Writing →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-blue-600 text-xl font-bold">🏎️</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Driver & Team Stats</h3>
          <p className="text-gray-600">
            Track driver and constructor standings, compare performances, and analyze data.
          </p>
          <Link to="/drivers" className="inline-block mt-4 text-blue-600 font-medium hover:text-blue-700">
            View Stats →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-green-600 text-xl font-bold">💬</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Community</h3>
          <p className="text-gray-600">
            Join discussions, share opinions, and connect with fellow F1 enthusiasts.
          </p>
          <Link to="/posts" className="inline-block mt-4 text-green-600 font-medium hover:text-green-700">
            Join Community →
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Dive In?</h2>
        <p className="text-red-100 mb-6 max-w-2xl mx-auto">
          Start sharing your F1 insights, track your favorite drivers, 
          and become part of our growing community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/create-post" 
            className="px-6 py-3 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Create Your First Post
          </Link>
          <Link 
            to="/posts" 
            className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-red-600 transition-colors"
          >
            Browse Community Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;