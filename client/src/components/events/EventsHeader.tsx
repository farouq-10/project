import React from 'react';
import { Plus, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EventsHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
      <h1 className="text-3xl font-bold text-white">Events Dashboard</h1>
      <div className="flex gap-4">
        <Link
          to="/events/create"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-md hover:from-purple-500 hover:to-pink-400 transition-all"
        >
          <Plus className="h-5 w-5" />
          Create Event
        </Link>
        <Link
          to="/events/my-events"
          className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-2 rounded-md hover:bg-white/20 transition-all"
        >
          <Calendar className="h-5 w-5" />
          My Events
        </Link>
      </div>
    </div>
  );
}