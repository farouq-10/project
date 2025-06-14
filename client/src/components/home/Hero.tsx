import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 relative">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <h1 className="text-7xl md:text-8xl font-bold text-white animate-on-scroll relative">
          <span className="relative inline-block">
            It's{' '}
            <span className="font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-transparent bg-clip-text transform hover:scale-105 transition-transform duration-300">EventEase</span>
          </span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-gray-300 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
          Where dreams meet seamless event planning
        </p>

        <div className="flex items-center justify-center gap-8 text-lg text-gray-300 animate-on-scroll" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-pink-500" />
            <span>Effortless Planning</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-pink-500" />
            <span>Premium Services</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-pink-500" />
            <span>Memorable Moments</span>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-8 animate-on-scroll" style={{ animationDelay: '0.6s' }}>
          <Link
            to="/events/create"
            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-3 rounded-md hover:from-pink-500 hover:to-purple-500 transition-all"
          >
            Start Planning
          </Link>
          <Link
            to="/about"
            className="bg-white/10 text-white px-8 py-3 rounded-md hover:bg-white/20 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}