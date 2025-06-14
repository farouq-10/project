import React, { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { PlaceCard } from '../components/wedding/PlaceCard';
import { ServicesSidebar } from '../components/wedding/ServicesSidebar';
import { useLocation, Link } from 'react-router-dom';

interface Place {
  id: string;
  name: string;
  rating: number;
  address: string;
  image: string;
  category: string;
}

export function OtherPlacesPage() {
  const location = useLocation();
  const selectedServices = location.state?.selectedServices || [];
  const [activeService, setActiveService] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const places: Place[] = [
    // Venues
    {
      id: 'venue1',
      name: 'The Grand Space',
      rating: 4.9,
      address: '123 Event Plaza, New York, NY 10001',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80',
      category: 'venue'
    },
    {
      id: 'venue2',
      name: 'Urban Loft',
      rating: 4.8,
      address: '456 Creative Ave, New York, NY 10002',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80',
      category: 'venue'
    },
    // Catering
    {
      id: 'catering1',
      name: 'Gourmet Events',
      rating: 4.9,
      address: '789 Culinary Blvd, Los Angeles, CA 90001',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80',
      category: 'catering'
    },
    {
      id: 'catering2',
      name: 'Elite Catering Co',
      rating: 4.8,
      address: '321 Taste Lane, Los Angeles, CA 90002',
      image: 'https://images.unsplash.com/photo-1587899897387-091ebd01a6b2?auto=format&fit=crop&q=80',
      category: 'catering'
    },
    // Equipment
    {
      id: 'equipment1',
      name: 'Tech Rentals Pro',
      rating: 4.9,
      address: '654 Gear Street, Chicago, IL 60601',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
      category: 'equipment'
    },
    {
      id: 'equipment2',
      name: 'Event Equipment Solutions',
      rating: 4.8,
      address: '987 Tech Road, Chicago, IL 60602',
      image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80',
      category: 'equipment'
    },
    // Decoration
    {
      id: 'decoration1',
      name: 'Elegant Designs',
      rating: 4.9,
      address: '147 Style Avenue, Miami, FL 33101',
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&q=80',
      category: 'decoration'
    },
    {
      id: 'decoration2',
      name: 'Creative Decor',
      rating: 4.8,
      address: '258 Decor Drive, Miami, FL 33102',
      image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80',
      category: 'decoration'
    },
    // Entertainment
    {
      id: 'entertainment1',
      name: 'Live Entertainment Co',
      rating: 4.9,
      address: '369 Performance Way, Nashville, TN 37201',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80',
      category: 'entertainment'
    },
    {
      id: 'entertainment2',
      name: 'Event Artists',
      rating: 4.8,
      address: '741 Music Row, Nashville, TN 37202',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80',
      category: 'entertainment'
    },
    // Photographers
    {
      id: 'photo1',
      name: 'Event Lens Studio',
      rating: 4.9,
      address: '852 Camera Court, San Francisco, CA 94101',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80',
      category: 'photographer'
    },
    {
      id: 'photo2',
      name: 'Moment Captures',
      rating: 4.8,
      address: '963 Photo Lane, San Francisco, CA 94102',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80',
      category: 'photographer'
    },
    // Transportation
    {
      id: 'transport1',
      name: 'Elite Transportation',
      rating: 4.9,
      address: '159 Transit Way, Boston, MA 02101',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80',
      category: 'transportation'
    },
    {
      id: 'transport2',
      name: 'Event Fleet Services',
      rating: 4.8,
      address: '267 Fleet Street, Boston, MA 02102',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80',
      category: 'transportation'
    },
    // Staffing
    {
      id: 'staff1',
      name: 'Professional Event Staff',
      rating: 4.9,
      address: '378 Service Road, Seattle, WA 98101',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80',
      category: 'staffing'
    },
    {
      id: 'staff2',
      name: 'Event Personnel Solutions',
      rating: 4.8,
      address: '485 Staff Street, Seattle, WA 98102',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80',
      category: 'staffing'
    }
  ];

  const filteredPlaces = places.filter(place => 
    (activeService === 'all' || place.category === activeService) &&
    (place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className="flex-1 flex">
      {/* Sidebar */}
      <ServicesSidebar
        services={[
          { id: 'all', title: 'ALL' },
          ...selectedServices
        ]}
        activeService={activeService}
        onServiceSelect={setActiveService}
      />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header with Search and Confirm Booking */}
        <div className="flex justify-between items-center mb-8">
          <div className="max-w-xl w-full">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search places..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <Link
            to="/other/confirm-booking"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:from-purple-500 hover:to-pink-400 transition-all"
          >
            <ShoppingCart className="h-5 w-5" />
            Confirm Booking
          </Link>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </main>
  );
}