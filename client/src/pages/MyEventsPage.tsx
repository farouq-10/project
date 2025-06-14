import React, { useState, useEffect } from 'react'; // Import useEffect
import { Calendar, MapPin, Clock, Users, Pencil, Trash2, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getEvents, deleteEvent, setAuthToken } from '../services/api'; // Import API functions
import apiClient from '../services/api'; // Import apiClient for direct header check

// Define an interface for your event data structure for better type safety
interface Event {
  id: number | string; // Allow string if IDs from backend might be strings
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  image: string;
  status: string;
  guests: number;
  services: Array<{ name: string; provider: string }>;
  totalCost: number;
  // Add any other properties your event object might have
}

interface DeleteModalProps {
  isOpen: boolean;
  eventTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteModal({ isOpen, eventTitle, onConfirm, onCancel }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-white/10 rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 text-red-400 mb-4">
          <AlertTriangle className="h-6 w-6" />
          <h3 className="text-xl font-semibold">Delete Event</h3>
        </div>
        
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete <span className="text-white font-medium">"{eventTitle}"</span>? 
          This action cannot be undone.
        </p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function MyEventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]); // Use Event interface and initialize as empty
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; eventId: number | string | null; eventTitle: string }>({ // Allow string for eventId
    isOpen: false,
    eventId: null,
    eventTitle: ''
  });

  useEffect(() => {
    const fetchUserEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (token && !apiClient.defaults.headers.common['Authorization']) {
          setAuthToken(token);
        }
        // Ensure token is set before making the call if route is protected
        if (!apiClient.defaults.headers.common['Authorization'] && token) {
            // This check is a bit redundant if setAuthToken was just called,
            // but good for robustness if there are other paths to this effect.
            setAuthToken(token);
        } else if (!token) {
            // If no token at all, and the endpoint requires auth, handle appropriately
            // For now, we assume getEvents might work for public events or handle auth internally
            // or the backend returns 401/403 which we catch below.
        }

        const response = await getEvents();
        setEvents(response.data as Event[]); // Cast to Event[]
      } catch (err: any) {
        console.error('Failed to fetch events:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Failed to load your events.';
        setError(errorMessage);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          setAuthToken(null);
          navigate('/signin');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, [navigate]);

  const handleEdit = (eventId: number | string) => {
    navigate(`/events/edit/${eventId}`);
  };

  const handleDelete = (eventId: number | string, eventTitle: string) => {
    setDeleteModal({ isOpen: true, eventId, eventTitle });
  };

  const confirmDelete = async () => {
    if (deleteModal.eventId) {
      try {
        await deleteEvent(deleteModal.eventId.toString());
        setEvents(events.filter(event => event.id !== deleteModal.eventId));
        setDeleteModal({ isOpen: false, eventId: null, eventTitle: '' });
      } catch (err: any) {
        console.error('Failed to delete event:', err);
        setError('Failed to delete event. Please try again.'); // Set user-facing error
        // Optionally, keep the modal open or provide more specific feedback
        // For now, we'll close it as per original logic, but error is shown.
        setDeleteModal({ isOpen: false, eventId: null, eventTitle: '' });
      }
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, eventId: null, eventTitle: '' });
  };

  const handleViewDetails = (eventId: number | string) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <main className="flex-1 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Events</h1>
            <p className="text-gray-300">Manage your upcoming and past events</p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/events/gallery"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all"
            >
              <ImageIcon className="h-5 w-5" />
              Gallery
            </Link>
            <Link
              to="/events/create"
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-500 hover:to-pink-400 transition-all"
            >
              Create New Event
            </Link>
          </div>
        </div>

        {loading && <div className="text-center py-10"><p className="text-gray-300 text-lg">Loading your events...</p></div>}
        {error && <div className="text-center py-10"><p className="text-red-400 text-lg bg-red-500/10 p-4 rounded-md">{error}</p></div>}
        
        {!loading && !error && events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">You haven't created any events yet.</p>
            <Link
              to="/events/create"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Create your first event
            </Link>
          </div>
        ) : null}

        {!loading && !error && events.length > 0 && (
          <div className="grid gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="backdrop-blur-sm bg-gray-900/50 rounded-xl border border-white/10 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Event Image */}
                  <div className="md:w-1/3 aspect-video md:aspect-auto relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-4 py-1 rounded-full text-sm font-medium ${ 
                        event.status === 'upcoming' 
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-gray-500/20 text-gray-300'
                      }`}>
                        {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                      </span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">{event.type}</span>
                        <h2 className="text-2xl font-bold text-white mt-1 mb-2 hover:text-purple-300 transition-colors cursor-pointer" onClick={() => handleViewDetails(event.id)}>{event.title}</h2>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(event.id)} className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleDelete(event.id, event.title)} className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-300 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-400" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-purple-400" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <MapPin className="h-4 w-4 text-purple-400" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-400" />
                        <span>{event.guests} Guests</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white mb-1">Services:</h4>
                      <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                        {event.services.map(service => (
                          <li key={service.name}>{service.name} - <span className="italic">{service.provider}</span></li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <p className="text-lg font-semibold text-white">
                        Total Cost: <span className="text-purple-400">${event.totalCost.toLocaleString()}</span>
                      </p>
                      <button 
                        onClick={() => handleViewDetails(event.id)}
                        className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
                      >
                        View Details &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <DeleteModal 
        isOpen={deleteModal.isOpen} 
        eventTitle={deleteModal.eventTitle} 
        onConfirm={confirmDelete} 
        onCancel={cancelDelete} 
      />
    </main>
  );
}