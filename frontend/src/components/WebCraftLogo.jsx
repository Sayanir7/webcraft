import React from 'react';
import { Link } from 'react-router-dom';

const WebCraftLogo = () => {
  return (
    <Link to="/" className="group flex items-center">
      {/* Logo container */}
      <div className="flex items-center px-2">
        {/* Simplified code icon */}
        <svg 
          className="w-5 h-5 mr-2 text-blue-500"
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        
        {/* Logo text */}
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent transition-colors duration-200">
          WebCraft
        </h2>
      </div>
    </Link>
  );
};

export default WebCraftLogo;