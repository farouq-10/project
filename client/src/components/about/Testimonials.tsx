import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "EventEase transformed how we manage our corporate events. The platform is intuitive and powerful.",
    author: "Sarah Thompson",
    role: "Event Director",
    company: "Tech Innovations Inc.",
    rating: 5
  },
  {
    quote: "The best event planning platform we've used. Makes coordination effortless and stress-free.",
    author: "Michael Chen",
    role: "Wedding Planner",
    company: "Perfect Moments",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-24 px-4 bg-purple-950/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">What People Say</h2>
          <p className="text-xl text-gray-300">
            Trusted by event planners worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="backdrop-blur-sm bg-purple-950/40 p-8 rounded-xl border border-purple-800/50 hover:border-pink-500/50 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              <blockquote className="text-xl text-gray-300 italic mb-6">
                "{testimonial.quote}"
              </blockquote>
              
              <div>
                <div className="font-semibold text-white">{testimonial.author}</div>
                <div className="text-gray-400">{testimonial.role}</div>
                <div className="text-pink-500">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}