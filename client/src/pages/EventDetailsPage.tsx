import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, ArrowLeft, Pencil } from 'lucide-react';

export function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // This would come from your state management solution
  const event = {
    id: 1,
    title: 'Tech Conference 2024',
    type: 'seminar',
    date: '2024-06-15',
    time: '09:00',
    location: 'Grand Conference Center, San Francisco',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80',
    status: 'upcoming',
    guests: 200,
    description: 'Join us for an immersive tech conference featuring industry leaders, innovative workshops, and networking opportunities.',
    services: [
      { name: 'Venue', provider: 'Grand Conference Center', details: 'Main Hall + 3 Workshop Rooms' },
      { name: 'Catering', provider: 'Gourmet Events', details: 'Breakfast, Lunch, and Coffee Breaks' },
      { name: 'Photography', provider: 'Event Lens Studio', details: 'Full Day Coverage + Edited Photos' }
    ],
    schedule: [
      { time: '08:00', activity: 'Registration & Breakfast' },
      { time: '09:00', activity: 'Opening Keynote' },
      { time: '10:30', activity: 'Workshop Sessions' },
      { time: '12:00', activity: 'Networking Lunch' },
      { time: '13:30', activity: 'Panel Discussions' },
      { time: '15:00', activity: 'Innovation Showcase' },
      { time: '16:30', activity: 'Closing Remarks' }
    ],
    totalCost: 15000
  };

  const handleEdit = () => {
    navigate(`/events/edit/${id}`);
  };

  const handleBack = () => {
    navigate('/events/my-events');
  };

  return (
    <main className="flex-1 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to My Events
          </button>
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <Pencil className="h-5 w-5" />
            Edit Event
          </button>
        </div>

        {/* Event Image */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <img
            src={event.image}
            alt={event.title}
            className="w-full aspect-video object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-2">{event.title}</h1>
            <p className="text-xl text-gray-300">{event.description}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="md:col-span-2 space-y-8">
            {/* Event Details */}
            <div className="backdrop-blur-sm bg-gray-900/50 rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Event Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="h-5 w-5 text-purple-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="h-5 w-5 text-purple-400" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="h-5 w-5 text-purple-400" />
                  <span>{event.guests} Guests</span>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="backdrop-blur-sm bg-gray-900/50 rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Schedule</h2>
              <div className="space-y-4">
                {event.schedule.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="text-purple-400 font-medium w-20">{item.time}</div>
                    <div className="text-gray-300">{item.activity}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Services */}
            <div className="backdrop-blur-sm bg-gray-900/50 rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Booked Services</h2>
              <div className="space-y-4">
                {event.services.map((service, index) => (
                  <div key={index} className="pb-4 border-b border-white/10 last:border-0 last:pb-0">
                    <div className="font-medium text-white mb-1">{service.name}</div>
                    <div className="text-purple-400 text-sm mb-1">{service.provider}</div>
                    <div className="text-gray-300 text-sm">{service.details}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Summary */}
            <div className="backdrop-blur-sm bg-gray-900/50 rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Cost Summary</h2>
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-300">Total Cost</span>
                <span className="text-white font-semibold">${event.totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}