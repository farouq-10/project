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

export function EngagementPlacesPage() {
  const location = useLocation();
  const selectedServices = location.state?.selectedServices || [];
  const [activeService, setActiveService] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const places: Place[] = [
    // Halls
    {
      id: 'hall1',
      name: 'Elegant Ballroom',
      rating: 4.9,
      address: '123 Luxury Avenue, Manhattan, NY 10001',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80',
      category: 'halls'
    },
    {
      id: 'hall2',
      name: 'Garden Terrace',
      rating: 4.8,
      address: '456 Elegance Street, Manhattan, NY 10002',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80',
      category: 'halls'
    },
    // Dresses and Suits
    {
      id: 'dress1',
      name: 'Bridal Elegance',
      rating: 4.8,
      address: '123 Fashion Avenue, New York, NY 10001',
      image: 'https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&q=80',
      category: 'dresses'
    },
    {
      id: 'dress2',
      name: 'Modern Suits',
      rating: 4.7,
      address: '456 Style Street, New York, NY 10002',
      image: 'https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?auto=format&fit=crop&q=80',
      category: 'dresses'
    },
    // Beauty Centers
    {
      id: 'beauty1',
      name: 'Luxe Beauty Spa',
      rating: 4.9,
      address: '321 Beauty Blvd, Los Angeles, CA 90001',
      image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80',
      category: 'beauty'
    },
    {
      id: 'beauty2',
      name: 'Serenity Spa',
      rating: 4.7,
      address: '654 Relaxation Road, Los Angeles, CA 90002',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80',
      category: 'beauty'
    },
    // Barber Shops
    {
      id: 'barber1',
      name: 'Gentleman\'s Grooming',
      rating: 4.8,
      address: '147 Trim Avenue, Chicago, IL 60601',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80',
      category: 'barber'
    },
    {
      id: 'barber2',
      name: 'Classic Cuts',
      rating: 4.7,
      address: '258 Shave Street, Chicago, IL 60602',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80',
      category: 'barber'
    },
    // Make Up Artists
    {
      id: 'makeup1',
      name: 'Glam Squad',
      rating: 4.9,
      address: '741 Glam Street, Miami, FL 33101',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80',
      category: 'makeup'
    },
    {
      id: 'makeup2',
      name: 'Beauty Pro',
      rating: 4.8,
      address: '852 Beauty Boulevard, Miami, FL 33102',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80',
      category: 'makeup'
    },
    // Cosmetic Doctors
    {
      id: 'cosmetic1',
      name: 'Advanced Aesthetics',
      rating: 4.9,
      address: '159 Medical Plaza, Beverly Hills, CA 90210',
      image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&q=80',
      category: 'cosmetic'
    },
    {
      id: 'cosmetic2',
      name: 'Beauty Med Spa',
      rating: 4.8,
      address: '267 Wellness Way, Beverly Hills, CA 90211',
      image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80',
      category: 'cosmetic'
    },
    // Photographers
    {
      id: 'photo1',
      name: 'Moments Captured',
      rating: 4.9,
      address: '753 Camera Lane, San Francisco, CA 94101',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80',
      category: 'photographer'
    },
    {
      id: 'photo2',
      name: 'Love Stories Studio',
      rating: 4.8,
      address: '951 Portrait Place, San Francisco, CA 94102',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80',
      category: 'photographer'
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
            to="/engagement/confirm-booking"
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