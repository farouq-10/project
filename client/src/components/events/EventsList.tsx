import React, { useEffect, useState } from 'react';
import { EventCard } from './EventCard';
import { getEvents } from '../../services/api'; // Assuming api.ts is in src/services

// Define an interface for the event object based on your API response
interface Event {
  id: string | number; // Use string if your API returns string IDs, otherwise number
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  participants?: number; // Optional fields
  maxParticipants?: number; // Optional fields
  // Add any other properties your event object might have
}

export function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getEvents();
        // Assuming the actual event data is in response.data
        // and it's an array. Adjust if your API response structure is different.
        setEvents(response.data.events || response.data); 
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch events:', err);
        setError(err.message || 'Failed to load events. Please try again later.');
        setEvents([]); // Clear events on error or set to a default state
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center text-white py-8">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">Error: {error}</div>;
  }

  if (events.length === 0) {
    return <div className="text-center text-gray-400 py-8">No events found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <EventCard key={event.id} event={event as any} /> // Cast to any if EventCard props don't match exactly yet
      ))}
    </div>
  );
}