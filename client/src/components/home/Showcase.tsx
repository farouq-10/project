import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

export function Showcase() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Event Manager",
      quote: "EventEase transformed how we handle corporate events. The platform is intuitive and powerful.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Wedding Planner",
      quote: "The best event planning platform I've used. Makes coordination effortless.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-on-scroll slide-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Create Unforgettable <span className="text-pink-500">Moments</span>
            </h2>
            <p className="text-xl text-gray-300">
              From intimate gatherings to grand celebrations, we provide the tools you need to make every event exceptional.
            </p>
            
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50 animate-on-scroll"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                  <div className="text-white">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link 
              to="/signup" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-md hover:from-purple-500 hover:to-pink-400 transition-all group"
            >
              Sign up now!
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative animate-on-scroll slide-right">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80" 
                alt="Event Planning"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}