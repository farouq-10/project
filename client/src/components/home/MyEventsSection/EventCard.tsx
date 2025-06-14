import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { formatDate } from '../../../utils/dateFormatter';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    date: string;
    description: string;
    image: string;
  };
  delay: number;
}

export function EventCard({ event, delay }: EventCardProps) {
  return (
    <div 
      className="group backdrop-blur-sm bg-purple-950/40 rounded-xl border border-purple-800/50 overflow-hidden hover:border-pink-500/50 transition-all"
      style={{ animation: `fadeIn 0.5s ease-out ${delay}s both` }}
    >
      <div className="aspect-video relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 to-transparent" />
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-white line-clamp-1">{event.title}</h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.date)}</span>
          </div>
        </div>
        
        <p className="text-gray-300 text-sm line-clamp-2">{event.description}</p>
      </div>
    </div>
  );
}