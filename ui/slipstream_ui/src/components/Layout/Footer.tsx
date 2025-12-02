import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-800 rounded-lg"></div>
              <span className="text-xl font-bold">F1 Slipstream</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your digital Formula 1 notebook and community platform.
              Share insights, track statistics, and connect with F1 fans.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/posts" className="hover:text-white transition-colors">Community Posts</a></li>
              <li><a href="/drivers" className="hover:text-white transition-colors">Driver Standings</a></li>
              <li><a href="/teams" className="hover:text-white transition-colors">Constructor Standings</a></li>
              <li><a href="/calendar" className="hover:text-white transition-colors">Race Calendar</a></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">About</h3>
            <p className="text-gray-400 text-sm mb-4">
              This is a student project for educational purposes.
              Formula 1® is a registered trademark of Formula One World Championship Limited.
            </p>
            <p className="text-gray-500 text-xs">
              © 2024 F1 Slipstream Project. All data shown is for demonstration.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;