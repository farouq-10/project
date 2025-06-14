import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight, BadgeCheck } from 'lucide-react';

const benefits = [
  'Reach thousands of potential customers',
  'Manage bookings efficiently',
  'Showcase your venue features',
  'Receive verified reviews'
];

export function BusinessSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-sm bg-purple-950/40 rounded-2xl border border-purple-800/50 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-pink-500">
                <Building2 className="h-5 w-5" />
                <span className="font-medium">For Business Owners</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                List Your Venue on EventEase
              </h2>
              
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-gray-300">
                    <BadgeCheck className="h-5 w-5 text-purple-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/business/register"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-purple-500 hover:to-pink-400 transition-all"
              >
                <Building2 className="h-6 w-6" />
                <span className="font-medium">Add Your Business</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80" 
                  alt="Business Venue"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-purple-950/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}