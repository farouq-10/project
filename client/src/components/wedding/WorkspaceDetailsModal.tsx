import { useState } from 'react';
import { X, Calendar, MapPin, Users, MessageCircle, Wifi, Coffee, Monitor, Star, CreditCard, Printer, Info } from 'lucide-react';

interface WorkspacePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  capacity: number;
  amenities: string[];
  image: string;
}

interface WorkspaceDetailsModalProps {
  workspace: {
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

export function WorkspaceDetailsModal({ workspace, onClose }: WorkspaceDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('details');
  const [selectedDate, setSelectedDate] = useState('');
  const [guestCount, setGuestCount] = useState(10);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const workspacePackages: WorkspacePackage[] = [
    {
      id: 'conference',
      name: 'Conference Room Package',
      description: 'Perfect for large meetings and presentations',
      price: 500,
      duration: 'Full Day',
      capacity: 50,
      amenities: [
        'Large projector screen',
        'Video conferencing system',
        'Premium sound system',
        'Whiteboard walls',
        'Ergonomic seating',
        'Catering available',
        'Technical support'
      ],
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80'
    },
    {
      id: 'training',
      name: 'Training Room Package',
      description: 'Ideal for workshops and training sessions',
      price: 400,
      duration: 'Full Day',
      capacity: 30,
      amenities: [
        'Individual workstations',
        'Interactive displays',
        'Training materials',
        'Breakout areas',
        'Recording equipment',
        'Refreshments included',
        'Workshop supplies'
      ],
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80'
    },
    {
      id: 'collaborative',
      name: 'Collaborative Space Package',
      description: 'Flexible space for team collaboration',
      price: 300,
      duration: 'Full Day',
      capacity: 20,
      amenities: [
        'Modular furniture',
        'Smart boards',
        'Collaboration tools',
        'Lounge area',
        'Private booths',
        'Coffee bar access',
        'Creative supplies'
      ],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'
    },
    {
      id: 'executive',
      name: 'Executive Suite Package',
      description: 'Premium space for high-level meetings',
      price: 600,
      duration: 'Full Day',
      capacity: 15,
      amenities: [
        'Premium furnishings',
        'Private restrooms',
        'Concierge service',
        'Catering included',
        'VIP parking',
        'Security service',
        'Business services'
      ],
      image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&q=80'
    }
  ];

  const calculateTotal = () => {
    const package_ = workspacePackages.find(p => p.id === selectedPackage);
    return package_ ? package_.price : 0;
  };

  const handleBooking = () => {
    if (!selectedPackage || !selectedDate) return;
    
    // Add the workspace to booked items
    console.log('Booked:', {
      workspaceId: workspace.id,
      packageId: selectedPackage,
      date: selectedDate,
      attendees: guestCount
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-purple-950/90 rounded-xl border border-purple-800/50 w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative h-64">
          <img
            src={workspace.image}
            alt={workspace.name}
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
            Chat with Manager
          </button>
          <div className="absolute bottom-4 left-4">
            <h2 className="text-3xl font-bold text-white mb-2">{workspace.name}</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-white">{workspace.rating}</span>
              </div>
              <span className="text-white">•</span>
              <div className="flex items-center gap-1 text-gray-200">
                <MapPin className="h-4 w-4" />
                <span>{workspace.address}</span>
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
              Workspace Details
            </button>
            <button
              onClick={() => setActiveTab('booking')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'booking'
                  ? 'text-white border-b-2 border-pink-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Book Workspace
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
                <p className="text-gray-300">{workspace.description || 'A modern workspace designed for productivity and collaboration.'}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Workspace Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Wifi className="h-5 w-5 text-purple-400" />
                    <span>High-Speed WiFi</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Coffee className="h-5 w-5 text-purple-400" />
                    <span>Coffee & Tea</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Monitor className="h-5 w-5 text-purple-400" />
                    <span>AV Equipment</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Printer className="h-5 w-5 text-purple-400" />
                    <span>Business Center</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <p className="text-gray-300">Phone: {workspace.contact?.phone || '+1 (555) 123-4567'}</p>
                  <p className="text-gray-300">Email: {workspace.contact?.email || 'bookings@workspace.com'}</p>
                  <p className="text-gray-300">Website: {workspace.contact?.website || 'www.workspace.com'}</p>
                  <p className="text-gray-300">Hours: {workspace.hours || 'Mon-Fri: 8:00 AM - 8:00 PM'}</p>
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
                    <p className="text-gray-300 text-sm">Please select date and number of attendees. For the package selection below, only select an option if you want to include it in your booking. Leave unselected if not needed.</p>
                  </div>
                </div>
              </div>
              
              {/* Date and Attendees */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    Event Details
                  </h3>
                  <div className="flex items-center gap-2 bg-purple-800/30 px-3 py-1.5 rounded-md border border-purple-700/50">
                    <Info className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-gray-300">Required: Please fill in both fields</span>
                  </div>
                </div>
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
                    Number of Attendees
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={guestCount}
                      onChange={(e) => setGuestCount(parseInt(e.target.value))}
                      min="1"
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>

              {/* Workspace Packages */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    Select Package
                  </h3>
                  <div className="flex items-center gap-2 bg-purple-800/30 px-3 py-1.5 rounded-md border border-purple-700/50">
                    <Info className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-gray-300">Optional: Select one if you want a workspace package</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {workspacePackages.map((package_) => (
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
                            <p className="text-sm text-purple-400">Up to {package_.capacity} people • {package_.duration}</p>
                          </div>
                          <p className="text-lg font-semibold text-white">${package_.price}</p>
                        </div>
                        <p className="text-sm text-gray-300 mb-4">{package_.description}</p>
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-white">Amenities:</h5>
                          <ul className="space-y-1">
                            {package_.amenities.map((item, index) => (
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
                <div className="flex items-center gap-2 bg-purple-800/30 px-3 py-1.5 rounded-md border border-purple-700/50 mb-4">
                  <Info className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-gray-300">Your total is based on the selected package. You will only be charged if you complete the booking process.</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">Total Cost</h3>
                    <p className="text-sm text-gray-400">Full day rate</p>
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