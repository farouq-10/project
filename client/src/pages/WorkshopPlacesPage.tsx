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

export function WorkshopPlacesPage() {
  const location = useLocation();
  const selectedServices = location.state?.selectedServices || [];
  const [activeService, setActiveService] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const places: Place[] = [
    // Workspaces
    {
      id: 'workspace1',
      name: 'Creative Studio Hub',
      rating: 4.9,
      address: '123 Innovation Ave, San Francisco, CA 94105',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80',
      category: 'workspaces'
    },
    {
      id: 'workspace2',
      name: 'Maker Space',
      rating: 4.8,
      address: '456 Workshop St, San Francisco, CA 94106',
      image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80',
      category: 'workspaces'
    },
    {
      id: 'workspace3',
      name: 'Tech Workshop Lab',
      rating: 4.7,
      address: '789 Craft Blvd, San Francisco, CA 94107',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80',
      category: 'workspaces'
    },
    // Halls
    {
      id: 'hall1',
      name: 'Innovation Center',
      rating: 4.9,
      address: '321 Learning Plaza, New York, NY 10001',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80',
      category: 'halls'
    },
    {
      id: 'hall2',
      name: 'Workshop Arena',
      rating: 4.8,
      address: '654 Skills Drive, New York, NY 10002',
      image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80',
      category: 'halls'
    },
    // Equipment Rental
    {
      id: 'equipment1',
      name: 'Tech Gear Rentals',
      rating: 4.9,
      address: '147 Equipment Lane, Chicago, IL 60601',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
      category: 'equipment'
    },
    {
      id: 'equipment2',
      name: 'Workshop Tools',
      rating: 4.8,
      address: '258 Hardware St, Chicago, IL 60602',
      image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80',
      category: 'equipment'
    },
    // Catering
    {
      id: 'catering1',
      name: 'Workshop Bites',
      rating: 4.9,
      address: '369 Catering Court, Boston, MA 02101',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80',
      category: 'catering'
    },
    {
      id: 'catering2',
      name: 'Creative Catering Co',
      rating: 4.8,
      address: '741 Food Lane, Boston, MA 02102',
      image: 'https://images.unsplash.com/photo-1587899897387-091ebd01a6b2?auto=format&fit=crop&q=80',
      category: 'catering'
    },
    // AV Equipment
    {
      id: 'av1',
      name: 'Pro AV Solutions',
      rating: 4.9,
      address: '852 Tech Way, Los Angeles, CA 90001',
      image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80',
      category: 'av'
    },
    {
      id: 'av2',
      name: 'Workshop Media',
      rating: 4.8,
      address: '963 Audio St, Los Angeles, CA 90002',
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80',
      category: 'av'
    },
    // Photographers
    {
      id: 'photo1',
      name: 'Workshop Lens',
      rating: 4.9,
      address: '159 Camera Court, Seattle, WA 98101',
      image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80',
      category: 'photographer'
    },
    {
      id: 'photo2',
      name: 'Creative Captures',
      rating: 4.8,
      address: '267 Photo Lane, Seattle, WA 98102',
      image: 'https://images.unsplash.com/photo-1559070169-a3077159ee16?auto=format&fit=crop&q=80',
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
            to="/workshop/confirm-booking"
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