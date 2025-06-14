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

export function SeminarPlacesPage() {
  const location = useLocation();
  const selectedServices = location.state?.selectedServices || [];
  const [activeService, setActiveService] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const places: Place[] = [
    // Workspaces
    {
      id: 'workspace1',
      name: 'Innovation Hub',
      rating: 4.9,
      address: '123 Tech Avenue, San Francisco, CA 94105',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80',
      category: 'workspaces'
    },
    {
      id: 'workspace2',
      name: 'Creative Commons',
      rating: 4.8,
      address: '456 Startup Street, San Francisco, CA 94106',
      image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80',
      category: 'workspaces'
    },
    {
      id: 'workspace3',
      name: 'Tech Campus',
      rating: 4.7,
      address: '789 Innovation Park, San Francisco, CA 94107',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80',
      category: 'workspaces'
    },
    // Conference Halls
    {
      id: 'hall1',
      name: 'Grand Conference Center',
      rating: 4.9,
      address: '321 Business Plaza, New York, NY 10001',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80',
      category: 'halls'
    },
    {
      id: 'hall2',
      name: 'Executive Forum',
      rating: 4.8,
      address: '654 Corporate Drive, New York, NY 10002',
      image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80',
      category: 'halls'
    },
    {
      id: 'hall3',
      name: 'Summit Hall',
      rating: 4.7,
      address: '987 Convention Center, New York, NY 10003',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80',
      category: 'halls'
    },
    // Photographers
    {
      id: 'photo1',
      name: 'Corporate Lens',
      rating: 4.9,
      address: '147 Media Street, Los Angeles, CA 90001',
      image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80',
      category: 'photographer'
    },
    {
      id: 'photo2',
      name: 'Event Visuals',
      rating: 4.8,
      address: '258 Camera Lane, Los Angeles, CA 90002',
      image: 'https://images.unsplash.com/photo-1559070169-a3077159ee16?auto=format&fit=crop&q=80',
      category: 'photographer'
    },
    {
      id: 'photo3',
      name: 'Business Photography',
      rating: 4.7,
      address: '369 Studio Boulevard, Los Angeles, CA 90003',
      image: 'https://images.unsplash.com/photo-1551818176-60579e574b91?auto=format&fit=crop&q=80',
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
            to="/seminar/confirm-booking"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:from-purple-500 hover:to-pink-400 transition-all"
          >
            <ShoppingCart className="h-5 w-5" />
            Confirm Booking
          </Link>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </main>
  );
}