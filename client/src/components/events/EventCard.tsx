import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventCardProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    category: string;
    image: string;
    participants: number;
    maxParticipants: number;
  };
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="backdrop-blur-sm bg-purple-950/40 rounded-xl border border-purple-800/50 overflow-hidden hover:border-pink-500/50 transition-all group">
      <div className="aspect-video relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 to-transparent" />
        <span className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
          {event.category}
        </span>
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-white">{event.title}</h3>
        
        <div className="space-y-2 text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{event.participants}/{event.maxParticipants} participants</span>
          </div>
        </div>

        <Link
          to={`/events/${event.id}`}
          className="inline-block w-full text-center bg-white/10 text-white px-4 py-2 rounded-md hover:bg-white/20 transition-all"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}