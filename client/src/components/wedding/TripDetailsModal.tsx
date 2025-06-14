import { useState } from 'react';
import { X, Calendar, MapPin, Users, MessageCircle, Plane, Hotel, Car, Umbrella, CreditCard, Star } from 'lucide-react';

interface TripPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  includes: string[];
  image: string;
}

interface TripDetailsModalProps {
  trip: {
    id: string;
    name: string;
    rating: number;
    address: string;
    image: string;
    description?: string;
    contact?: {
      phone: string;
      email: string;
      website: string;
    };
    hours?: string;
  };
  onClose: () => void;
}

export function TripDetailsModal({ trip, onClose }: TripDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('details');
  const [selectedDate, setSelectedDate] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const tripPackages: TripPackage[] = [
    {
      id: 'luxury',
      name: 'Luxury Paradise Package',
      description: 'A premium all-inclusive honeymoon experience',
      price: 5000,
      duration: '7 days',
      includes: [
        'Luxury beachfront resort accommodation',
        'Private beach access',
        'Couples spa treatments',
        'Romantic sunset dinner cruise',
        'Private airport transfers',
        'All meals and premium drinks',
        'Water sports activities'
      ],
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80'
    },
    {
      id: 'adventure',
      name: 'Adventure Explorer Package',
      description: 'Perfect blend of adventure and relaxation',
      price: 4000,
      duration: '7 days',
      includes: [
        'Boutique resort accommodation',
        'Guided hiking tours',
        'Snorkeling excursions',
        'Zip-lining adventure',
        'Airport transfers',
        'Breakfast and dinner',
        'Adventure gear rental'
      ],
      image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80'
    },
    {
      id: 'romantic',
      name: 'Romantic Getaway Package',
      description: 'Intimate and romantic escape for couples',
      price: 4500,
      duration: '5 days',
      includes: [
        'Private villa accommodation',
        'Couples massage',
        'Private chef dinner',
        'Champagne breakfast',
        'Airport transfers',
        'All meals included',
        'Photography session'
      ],
      image: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&q=80'
    },
    {
      id: 'cultural',
      name: 'Cultural Discovery Package',
      description: 'Immersive cultural experience with luxury comfort',
      price: 3800,
      duration: '6 days',
      includes: [
        'Heritage hotel accommodation',
        'Local cooking classes',
        'Cultural site tours',
        'Traditional performances',
        'Airport transfers',
        'Most meals included',
        'Local guide services'
      ],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80'
    }
  ];

  const calculateTotal = () => {
    const package_ = tripPackages.find(p => p.id === selectedPackage);
    return package_ ? package_.price * guestCount : 0;
  };

  const handleBooking = () => {
    if (!selectedPackage || !selectedDate) return;
    
    // Add the trip to booked items
    console.log('Booked:', {
      tripId: trip.id,
      packageId: selectedPackage,
      date: selectedDate,
      guests: guestCount
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-purple-950/90 rounded-xl border border-purple-800/50 w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative h-64">
          <img
            src={trip.image}
            alt={trip.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <button
            className="absolute top-4 right-16 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-colors flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Chat with Agent
          </button>
          <div className="absolute bottom-4 left-4">
            <h2 className="text-3xl font-bold text-white mb-2">{trip.name}</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-white">{trip.rating}</span>
              </div>
              <span className="text-white">•</span>
              <div className="flex items-center gap-1 text-gray-200">
                <MapPin className="h-4 w-4" />
                <span>{trip.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-purple-800/50">
          <div className="flex">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'details'
                  ? 'text-white border-b-2 border-pink-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Trip Details
            </button>
            <button
              onClick={() => setActiveTab('booking')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'booking'
                  ? 'text-white border-b-2 border-pink-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Book Trip
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-400px)]">
          {activeTab === 'details' ? (
            <div className="space-y-6">
              {/* About */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">About</h3>
                <p className="text-gray-300">{trip.description || 'Experience an unforgettable journey with our carefully curated travel packages.'}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Trip Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Plane className="h-5 w-5 text-purple-400" />
                    <span>Flight Included</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Hotel className="h-5 w-5 text-purple-400" />
                    <span>Luxury Accommodation</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Car className="h-5 w-5 text-purple-400" />
                    <span>Transportation</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Umbrella className="h-5 w-5 text-purple-400" />
                    <span>Activities</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <p className="text-gray-300">Phone: {trip.contact?.phone || '+1 (555) 123-4567'}</p>
                  <p className="text-gray-300">Email: {trip.contact?.email || 'bookings@travelagency.com'}</p>
                  <p className="text-gray-300">Website: {trip.contact?.website || 'www.travelagency.com'}</p>
                  <p className="text-gray-300">Hours: {trip.hours || 'Mon-Sun: 9:00 AM - 8:00 PM'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Date and Guests */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Departure Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Travelers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={guestCount}
                      onChange={(e) => setGuestCount(parseInt(e.target.value))}
                      min="1"
                      max="10"
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Trip Packages */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Select Package
                </h3>
                <div className="bg-purple-900/50 border border-purple-700/50 rounded-md p-3 mb-4 flex items-start gap-2">
                  <div className="text-blue-400 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-300">
                    Select a package only if you want to book it. If you're just browsing or not ready to make a selection, you can leave this unselected.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {tripPackages.map((package_) => (
                    <label
                      key={package_.id}
                      className={`relative flex flex-col cursor-pointer rounded-lg overflow-hidden border transition-all ${
                        selectedPackage === package_.id
                          ? 'border-pink-500 ring-2 ring-pink-500'
                          : 'border-purple-800/50 hover:border-purple-400/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="package"
                        value={package_.id}
                        checked={selectedPackage === package_.id}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                        className="sr-only"
                      />
                      <div className="aspect-video relative">
                        <img
                          src={package_.image}
                          alt={package_.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 to-transparent" />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-white">{package_.name}</h4>
                            <p className="text-sm text-purple-400">{package_.duration}</p>
                          </div>
                          <p className="text-lg font-semibold text-white">${package_.price}</p>
                        </div>
                        <p className="text-sm text-gray-300 mb-4">{package_.description}</p>
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-white">Includes:</h5>
                          <ul className="space-y-1">
                            {package_.includes.map((item, index) => (
                              <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                                <div className="h-1.5 w-1.5 bg-purple-400 rounded-full" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Total Cost */}
              <div className="border-t border-purple-800/50 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">Total Cost</h3>
                    <p className="text-sm text-gray-400">Price per person × {guestCount} travelers</p>
                  </div>
                  <p className="text-2xl font-bold text-white">${calculateTotal().toLocaleString()}</p>
                </div>
                <button
                  onClick={handleBooking}
                  disabled={!selectedPackage || !selectedDate}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg hover:from-purple-500 hover:to-pink-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                >
                  <CreditCard className="h-5 w-5" />
                  Proceed to Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}