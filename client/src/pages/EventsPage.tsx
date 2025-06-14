import React from 'react';
import { EventsHeader } from '../components/events/EventsHeader';
import { EventsDashboard } from '../components/events/EventsDashboard';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';

export function EventsPage() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <EventsHeader />
        <Link
          to="/invitation"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-500 hover:to-pink-400 transition-all"
        >
          <Send className="h-5 w-5" />
          Send Invitations
        </Link>
      </div>
      <EventsDashboard />
    </main>
  );
}