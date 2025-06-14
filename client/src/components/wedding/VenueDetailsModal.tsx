import { useState } from 'react';
import { X, Calendar, Users, Utensils, Camera, Music, Star, MapPin, Phone, Mail, Globe, Clock, MessageCircle, Info } from 'lucide-react';
// import { Link } from 'react-router-dom';

interface BuffetOption {
  id: string;
  name: string;
  description: string;
  pricePerPerson: number;
}

interface ZafaPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  includes: string[];
}

interface Singer {
  id: string;
  name: string;
  genre: string;
  price: number;
  image: string;
}

interface PhotographyPackage {
  id: string;
  type: string;
  description: string;
  price: number;
  includes: string[];
}

interface VenueDetailsModalProps {
  venue: {
    id: string;
    name: string;
    rating: number;
    address: string;
    image: string;
    description?: string;
    capacity: number;
    amenities: string[];
    contact: {
      phone: string;
      email: string;
      website: string;
    };
    hours: string;
  };
  onClose: () => void;
}

export function VenueDetailsModal({ venue, onClose }: VenueDetailsModalProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [guestCount, setGuestCount] = useState(100);
  const [selectedBuffet, setSelectedBuffet] = useState('');
  const [selectedPhotography, setSelectedPhotography] = useState<string[]>([]);
  const [selectedZafa, setSelectedZafa] = useState('');
  const [selectedSinger, setSelectedSinger] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  const buffetOptions: BuffetOption[] = [
    {
      id: 'first',
      name: 'First Class Buffet',
      description: 'Premium selection of international cuisine with live cooking stations',
      pricePerPerson: 150
    },
    {
      id: 'second',
      name: 'Second Class Buffet',
      description: 'Wide variety of local and international dishes',
      pricePerPerson: 100
    },
    {
      id: 'third',
      name: 'Third Class Buffet',
      description: 'Selection of classic dishes and favorites',
      pricePerPerson: 75
    },
    {
      id: 'open',
      name: 'Open Buffet',
      description: 'Unlimited access to all dishes with premium selections',
      pricePerPerson: 200
    }
  ];

  const photographyPackages: PhotographyPackage[] = [
    {
      id: 'photos',
      type: 'Photography',
      description: 'Professional photo coverage of your event',
      price: 1500,
      includes: [
        'Professional photographer',
        'High-resolution digital files',
        'Edited photos',
        'Online gallery'
      ]
    },
    {
      id: 'videos',
      type: 'Videography',
      description: 'Cinematic video coverage of your event',
      price: 2000,
      includes: [
        'Professional videographer',
        'Highlight reel',
        'Full ceremony coverage',
        'Drone footage'
      ]
    }
  ];

  const zafaPackages: ZafaPackage[] = [
    {
      id: 'zafa1',
      name: 'Zafa Package 1',
      description: 'Essential zafa package',
      price: 1000,
      includes: [
        'Basic decoration',
        'Standard lighting',
        'Traditional music',
        'Basic effects'
      ]
    },
    {
      id: 'zafa2',
      name: 'Zafa Package 2',
      description: 'Premium zafa experience',
      price: 2000,
      includes: [
        'Elegant decoration',
        'Advanced lighting',
        'Professional DJ',
        'Smoke effects',
        'LED screens'
      ]
    },
    {
      id: 'zafa3',
      name: 'Zafa Package 3',
      description: 'Luxury zafa celebration',
      price: 3000,
      includes: [
        'Luxury decoration',
        'Premium lighting system',
        'Professional DJ & Band',
        'Special effects',
        'LED screens & Projectors',
        'Customized theme'
      ]
    }
  ];

  const singers: Singer[] = [
    {
      id: 'singer1',
      name: 'Alexandra Rose',
      genre: 'Pop/Contemporary',
      price: 5000,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80'
    },
    {
      id: 'singer2',
      name: 'Michael Stone',
      genre: 'Jazz/Soul',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1549834125-82d3c48159a3?auto=format&fit=crop&q=80'
    },
    {
      id: 'singer3',
      name: 'The Harmony Band',
      genre: 'Various',
      price: 6000,
      image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=80'
    }
  ];

  const calculateTotal = () => {
    let total = 0;
    
    // Buffet cost
    const buffet = buffetOptions.find(b => b.id === selectedBuffet);
    if (buffet) {
      total += buffet.pricePerPerson * guestCount;
    }

    // Photography cost
    selectedPhotography.forEach(packageId => {
      const package_ = photographyPackages.find(p => p.id === packageId);
      if (package_) {
        total += package_.price;
      }
    });

    // Zafa package cost
    const zafa = zafaPackages.find(z => z.id === selectedZafa);
    if (zafa) {
      total += zafa.price;
    }

    // Singer cost
    const singer = singers.find(s => s.id === selectedSinger);
    if (singer) {
      total += singer.price;
    }

    return total;
  };

  const handleBooking = () => {
    // Add the venue to booked items
    // This is a placeholder - you'll want to implement proper state management
    console.log('Venue booked:', venue.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-purple-950/90 rounded-xl border border-purple-800/50 w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative h-64">
          <img
            src={venue.image}
            alt={venue.name}
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
            Chat with Merchant
          </button>
          <div className="absolute bottom-4 left-4">
            <h2 className="text-3xl font-bold text-white mb-2">{venue.name}</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-white">{venue.rating}</span>
              </div>
              <span className="text-white">•</span>
              <div className="flex items-center gap-1 text-gray-200">
                <MapPin className="h-4 w-4" />
                <span>{venue.address}</span>
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
              Venue Details
            </button>
            <button
              onClick={() => setActiveTab('booking')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'booking'
                  ? 'text-white border-b-2 border-pink-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Book Venue
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-400px)]">
          {activeTab === 'details' ? (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">About</h3>
                <p className="text-gray-300">{venue.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {venue.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-gray-300">
                      <div className="h-2 w-2 bg-purple-400 rounded-full" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="h-5 w-5 text-purple-400" />
                    <span>{venue.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="h-5 w-5 text-purple-400" />
                    <span>{venue.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Globe className="h-5 w-5 text-purple-400" />
                    <span>{venue.contact.website}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="h-5 w-5 text-purple-400" />
                    <span>{venue.hours}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Booking Information Hint */}
              <div className="mb-6 bg-gradient-to-r from-purple-900/50 to-pink-900/30 p-4 rounded-lg border border-purple-700/50">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium mb-1">Booking Information</h4>
                    <p className="text-gray-300 text-sm">Please select date and guest count. For other categories below, only select options if you want to include them in your booking. Leave unselected if not needed.</p>
                  </div>
                </div>
              </div>
              
              {/* Date and Guests */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Event Date
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
                    Number of Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={guestCount}
                      onChange={(e) => setGuestCount(parseInt(e.target.value))}
                      min="1"
                      max={venue.capacity}
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Maximum capacity: {venue.capacity} guests
                  </p>
                </div>
              </div>

              {/* Buffet Options */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    Select Buffet Package
                  </h3>
                  <div className="flex items-center gap-2 bg-purple-800/30 px-3 py-1.5 rounded-md border border-purple-700/50">
                    <Info className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-gray-300">Optional: Select one if you want catering</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {buffetOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`relative flex flex-col p-4 cursor-pointer rounded-lg border ${
                        selectedBuffet === option.id
                          ? 'border-pink-500 bg-pink-500/10'
                          : 'border-purple-800/50 bg-purple-950/50 hover:bg-purple-950/70'
                      }`}
                    >
                      <input
                        type="radio"
                        name="buffet"
                        value={option.id}
                        checked={selectedBuffet === option.id}
                        onChange={(e) => setSelectedBuffet(e.target.value)}
                        className="sr-only"
                      />
                      <Utensils className="h-6 w-6 text-purple-400 mb-2" />
                      <h4 className="font-medium text-white mb-1">{option.name}</h4>
                      <p className="text-sm text-gray-300 mb-2">{option.description}</p>
                      <p className="text-lg font-semibold text-white">
                        ${option.pricePerPerson}/person
                      </p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Photography Options */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    Photography Services
                  </h3>
                  <div className="flex items-center gap-2 bg-purple-800/30 px-3 py-1.5 rounded-md border border-purple-700/50">
                    <Info className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-gray-300">Optional: Select services if needed</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {photographyPackages.map((package_) => (
                    <label
                      key={package_.id}
                      className={`relative flex flex-col p-4 cursor-pointer rounded-lg border ${
                        selectedPhotography.includes(package_.id)
                          ? 'border-pink-500 bg-pink-500/10'
                          : 'border-purple-800/50 bg-purple-950/50 hover:bg-purple-950/70'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={package_.id}
                        checked={selectedPhotography.includes(package_.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPhotography([...selectedPhotography, package_.id]);
                          } else {
                            setSelectedPhotography(
                              selectedPhotography.filter((id) => id !== package_.id)
                            );
                          }
                        }}
                        className="sr-only"
                      />
                      <Camera className="h-6 w-6 text-purple-400 mb-2" />
                      <h4 className="font-medium text-white mb-1">{package_.type}</h4>
                      <p className="text-sm text-gray-300 mb-2">{package_.description}</p>
                      <ul className="text-sm text-gray-300 mb-4 space-y-1">
                        {package_.includes.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 bg-purple-400 rounded-full" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-lg font-semibold text-white">${package_.price}</p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Zafa Packages */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    Zafa Packages
                  </h3>
                  <div className="flex items-center gap-2 bg-purple-800/30 px-3 py-1.5 rounded-md border border-purple-700/50">
                    <Info className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-gray-300">Optional: Select one if you want a zafa package</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {zafaPackages.map((package_) => (
                    <label
                      key={package_.id}
                      className={`relative flex flex-col p-4 cursor-pointer rounded-lg border ${
                        selectedZafa === package_.id
                          ? 'border-pink-500 bg-pink-500/10'
                          : 'border-purple-800/50 bg-purple-950/50 hover:bg-purple-950/70'
                      }`}
                    >
                      <input
                        type="radio"
                        name="zafa"
                        value={package_.id}
                        checked={selectedZafa === package_.id}
                        onChange={(e) => setSelectedZafa(e.target.value)}
                        className="sr-only"
                      />
                      <Music className="h-6 w-6 text-purple-400 mb-2" />
                      <h4 className="font-medium text-white mb-1">{package_.name}</h4>
                      <p className="text-sm text-gray-300 mb-2">{package_.description}</p>
                      <ul className="text-sm text-gray-300 mb-4 space-y-1">
                        {package_.includes.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 bg-purple-400 rounded-full" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-lg font-semibold text-white">${package_.price}</p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Singers */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    Available Singers
                  </h3>
                  <div className="flex items-center gap-2 bg-purple-800/30 px-3 py-1.5 rounded-md border border-purple-700/50">
                    <Info className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-gray-300">Optional: Select one if you want a singer</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {singers.map((singer) => (
                    <label
                      key={singer.id}
                      className={`relative flex flex-col cursor-pointer rounded-lg border overflow-hidden ${
                        selectedSinger === singer.id
                          ? 'border-pink-500'
                          : 'border-purple-800/50 hover:border-purple-400/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="singer"
                        value={singer.id}
                        checked={selectedSinger === singer.id}
                        onChange={(e) => setSelectedSinger(e.target.value)}
                        className="sr-only"
                      />
                      <div className="aspect-video relative">
                        <img
                          src={singer.image}
                          alt={singer.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-950 to-transparent" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-white mb-1">{singer.name}</h4>
                        <p className="text-sm text-gray-300 mb-2">{singer.genre}</p>
                        <p className="text-lg font-semibold text-white">${singer.price}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Total Cost */}
              <div className="border-t border-purple-800/50 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">Total Cost</h3>
                  <p className="text-2xl font-bold text-white">${calculateTotal().toLocaleString()}</p>
                </div>
                <button
                  onClick={handleBooking}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg hover:from-purple-500 hover:to-pink-400 transition-all font-medium"
                >
                  Add to Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}