'use client';

import React from 'react';

const Loading=()=>{
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        {/* Animated Flower */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Petals */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6 origin-center animate-pulse"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-24px)`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s'
              }}
            >
              <div 
                className="w-full h-full rounded-full opacity-90" 
                style={{ background: `linear-gradient(to bottom right, #052C21, #0a4d38)` }}
              ></div>
            </div>
          ))}
          
          {/* Center of flower */}
          <div 
            className="absolute top-1/2 left-1/2 w-10 h-10 -mt-5 -ml-5 rounded-full animate-pulse shadow-lg"
            style={{ background: `linear-gradient(to bottom right, #fde047, #facc15)` }}
          ></div>
          
          {/* Rotating overlay */}
          <div 
            className="absolute top-1/2 left-1/2 w-32 h-32 -mt-16 -ml-16 border-4 border-transparent rounded-full animate-spin"
            style={{ borderTopColor: '#052C21' }}
          ></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <h2 
            className="text-2xl font-semibold animate-pulse"
            style={{ color: '#052C21' }}
          >
            Loading
          </h2>
          <div className="flex justify-center space-x-2">
            <div 
              className="w-2 h-2 rounded-full animate-bounce" 
              style={{ backgroundColor: '#052C21', animationDelay: '0s' }}
            ></div>
            <div 
              className="w-2 h-2 rounded-full animate-bounce" 
              style={{ backgroundColor: '#0a4d38', animationDelay: '0.2s' }}
            ></div>
            <div 
              className="w-2 h-2 rounded-full animate-bounce" 
              style={{ backgroundColor: '#052C21', animationDelay: '0.4s' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;