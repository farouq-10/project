import React from 'react';
import { Search } from 'lucide-react';
import { EventsList } from './EventsList';
import { EventsFilter } from './EventsFilter';

export function EventsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <EventsFilter />
      </div>
      <EventsList />
    </div>
  );
}