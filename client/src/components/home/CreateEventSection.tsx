import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarPlus, ArrowRight, Sparkles } from 'lucide-react';

export function CreateEventSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-sm bg-purple-950/40 rounded-2xl border border-purple-800/50 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-pink-500">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Start Creating</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to Host Your Next Amazing Event?
              </h2>
              
              <p className="text-lg text-gray-300">
                Create your event in minutes with our intuitive event builder. 
                Set up tickets, manage registrations, and promote your event—all in one place.
              </p>

              <Link
                to="/events/create"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-purple-500 hover:to-pink-400 transition-all"
              >
                <CalendarPlus className="h-6 w-6" />
                <span className="font-medium">Create New Event</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Illustration */}
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80" 
                  alt="Event Planning"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-purple-950/20 to-transparent" />
              </div>
              
              {/* Stats */}
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-4">
                <div className="backdrop-blur-sm bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-300">Events Created</div>
                </div>
                <div className="backdrop-blur-sm bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">10k+</div>
                  <div className="text-sm text-gray-300">Happy Attendees</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}