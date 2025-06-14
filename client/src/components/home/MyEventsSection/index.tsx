import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { EventsCarousel } from './EventsCarousel';

const recentEvents = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    date: '2024-03-15',
    description: 'Join us for an immersive experience in the latest technology trends and innovations.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    title: 'Music Festival',
    date: '2024-02-28',
    description: 'A celebration of music featuring top artists from around the world.',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    title: 'Food & Wine Expo',
    date: '2024-02-10',
    description: 'Experience culinary excellence with master chefs and sommeliers.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80'
  }
];

export function MyEventsSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Your Recent Events</h2>
            <p className="text-gray-300">Revisit the memories from your past events</p>
          </div>
          
          <Link
            to="/events/my-events"
            className="group inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-all"
          >
            <CalendarDays className="h-5 w-5" />
            <span>My Events</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <EventsCarousel events={recentEvents} />
      </div>
    </section>
  );
}