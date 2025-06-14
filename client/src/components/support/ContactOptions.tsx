import React from 'react';
import { Mail, Phone, MessageSquare, Clock } from 'lucide-react';

export function ContactOptions() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50">
        <Mail className="h-6 w-6 text-purple-400 mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Email Support</h3>
        <p className="text-gray-300 mb-4">Get a response within 24 hours</p>
        <a
          href="mailto:support@example.com"
          className="inline-flex items-center text-purple-400 hover:text-purple-300"
        >
          support@example.com
        </a>
      </div>

      <div className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50">
        <Phone className="h-6 w-6 text-purple-400 mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Phone Support</h3>
        <p className="text-gray-300 mb-4">Available Mon-Fri, 9AM-6PM EST</p>
        <a
          href="tel:+1-555-123-4567"
          className="inline-flex items-center text-purple-400 hover:text-purple-300"
        >
          +1 (555) 123-4567
        </a>
      </div>

      <div className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50">
        <MessageSquare className="h-6 w-6 text-purple-400 mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Live Chat</h3>
        <p className="text-gray-300 mb-4">Instant support for urgent issues</p>
        <button className="text-purple-400 hover:text-purple-300">
          Start Chat
        </button>
      </div>
    </div>
  );
}