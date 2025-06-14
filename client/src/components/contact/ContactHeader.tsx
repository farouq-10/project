import React from 'react';
import { MessageSquare } from 'lucide-react';

export function ContactHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center justify-center p-2 bg-pink-500/10 rounded-full mb-4">
        <MessageSquare className="h-6 w-6 text-pink-500" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
      <p className="text-xl text-gray-300">
        We're here to help and answer any questions you might have. We look forward to hearing from you!
      </p>
    </div>
  );
}