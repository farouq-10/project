import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Mail, Share2, QrCode } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export function EventQRCodePage() {
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Sample events data - in a real app, this would come from your state management
  const events: Event[] = [
    {
      id: '1',
      title: 'Tech Conference 2024',
      date: '2024-06-15',
      time: '09:00',
      location: 'Grand Conference Center, San Francisco',
      description: 'Join us for an immersive tech conference featuring industry leaders.'
    },
    {
      id: '2',
      title: 'Wedding Celebration',
      date: '2024-07-20',
      time: '17:00',
      location: 'Crystal Ballroom, New York',
      description: 'Celebrate our special day with us!'
    },
    {
      id: '3',
      title: 'Birthday Party',
      date: '2024-03-10',
      time: '19:00',
      location: 'Fun Factory, Los Angeles',
      description: 'Come celebrate this milestone birthday!'
    }
  ];

  const selectedEventData = events.find(event => event.id === selectedEvent);

  const generateQRCodeData = (event: Event) => {
    return btoa(JSON.stringify({
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description
    }));
  };

  const getEventUrl = () => {
    return `${window.location.origin}/events/${selectedEvent}`;
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById('event-qr-code') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `event-qr-${selectedEventData?.title.toLowerCase().replace(/\s+/g, '-')}.png`;
      a.click();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getEventUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareEvent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedEventData?.title,
          text: `Join me at ${selectedEventData?.title}!`,
          url: getEventUrl()
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <main className="flex-1 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/invitation"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-white">Event QR Code</h1>
        </div>

        {/* Event Selection */}
        <div className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Select Event</h2>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="" className="bg-gray-900">Choose an event</option>
            {events.map(event => (
              <option key={event.id} value={event.id} className="bg-gray-900">
                {event.title} ({new Date(event.date).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>

        {selectedEventData ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* QR Code Card */}
            <div className="backdrop-blur-sm bg-purple-950/40 p-8 rounded-xl border border-purple-800/50">
              <div className="flex justify-center mb-8">
                <div className="p-4 bg-white rounded-xl">
                  <QRCodeSVG
                    id="event-qr-code"
                    value={generateQRCodeData(selectedEventData)}
                    size={250}
                    level="H"
                    includeMargin
                  />
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={downloadQRCode}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-500 hover:to-pink-400 transition-all"
                >
                  <Download className="h-5 w-5" />
                  Download QR Code
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-4 py-3 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>

                  <button
                    onClick={shareEvent}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-4 py-3 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <Share2 className="h-5 w-5" />
                    Share Event
                  </button>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-8">
              <div className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50">
                <h2 className="text-xl font-semibold text-white mb-4">Event Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Event Title
                    </label>
                    <p className="text-white">{selectedEventData.title}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Date & Time
                    </label>
                    <p className="text-white">
                      {new Date(selectedEventData.date).toLocaleDateString()} at {selectedEventData.time}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Location
                    </label>
                    <p className="text-white">{selectedEventData.location}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Description
                    </label>
                    <p className="text-white">{selectedEventData.description}</p>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50">
                <h2 className="text-xl font-semibold text-white mb-4">How to Use</h2>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white">
                      1
                    </div>
                    <p>Share the QR code with your guests</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white">
                      2
                    </div>
                    <p>Guests can scan the QR code with their phone's camera</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white">
                      3
                    </div>
                    <p>They'll be directed to the event page with all details</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white">
                      4
                    </div>
                    <p>Guests can RSVP and access event information instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <QrCode className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">
              Select an event to generate its QR code
            </p>
          </div>
        )}
      </div>
    </main>
  );
}