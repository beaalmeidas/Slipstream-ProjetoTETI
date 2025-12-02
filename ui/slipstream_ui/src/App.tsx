import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Posts from './pages/Posts';
// import CreatePost from './pages/CreatePost';
// import Drivers from './pages/Drivers';
// import Teams from './pages/Teams';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            {/* <Route path="/create-post" element={<CreatePost />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/teams" element={<Teams />} /> */}
            <Route path="/calendar" element={<div className="container mx-auto p-8">Calendar Page - Coming Soon</div>} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;