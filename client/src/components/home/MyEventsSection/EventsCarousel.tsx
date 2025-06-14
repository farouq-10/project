import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EventCard } from './EventCard';

interface EventsCarouselProps {
  events: Array<{
    id: string;
    title: string;
    date: string;
    description: string;
    image: string;
  }>;
}

export function EventsCarousel({ events }: EventsCarouselProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <EventCard 
          key={event.id} 
          event={event} 
          delay={0.1 * (index + 1)}
        />
      ))}
    </div>
  );
}