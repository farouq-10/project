import React from 'react';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className="space-y-6 backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50">
      <h2 className="text-2xl font-semibold text-white">Contact Information</h2>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-pink-500 mt-1" />
          <div>
            <h3 className="font-medium text-white">Business Hours</h3>
            <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-300">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-gray-300">Sunday: Closed</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-pink-500 mt-1" />
          <div>
            <h3 className="font-medium text-white">Location</h3>
            <p className="text-gray-300">123 Event Street</p>
            <p className="text-gray-300">San Francisco, CA 94105</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-pink-500 mt-1" />
          <div>
            <h3 className="font-medium text-white">Phone</h3>
            <p className="text-gray-300">+1 (555) 123-4567</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-pink-500 mt-1" />
          <div>
            <h3 className="font-medium text-white">Email</h3>
            <p className="text-gray-300">support@eventease.com</p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-purple-800/50">
        <p className="text-gray-300">
          <span className="font-medium text-white">Response Time:</span> We typically respond within 24 hours during business days.
        </p>
      </div>
    </div>
  );
}