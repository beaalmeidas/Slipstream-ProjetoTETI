import React from 'react';

const Posts: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Community Posts</h1>
      <p className="text-gray-600 mb-8">Loading posts from backend...</p>
      <div className="text-center py-12">
        <div className="inline-block p-8 bg-gray-100 rounded-lg">
          <p className="text-gray-500">Posts will appear here once integrated with backend</p>
        </div>
      </div>
    </div>
  );
};

export default Posts;