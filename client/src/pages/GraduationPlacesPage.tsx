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

export function GraduationPlacesPage() {
  const location = useLocation();
  const selectedServices = location.state?.selectedServices || [];
  const [activeService, setActiveService] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const places: Place[] = [
    // Concert Venues
    {
      id: 'concert1',
      name: 'Grand Arena',
      rating: 4.9,
      address: '123 Music Avenue, Los Angeles, CA 90001',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80',
      category: 'concert'
    },
    {
      id: 'concert2',
      name: 'Harmony Hall',
      rating: 4.8,
      address: '456 Symphony Street, Los Angeles, CA 90002',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80',
      category: 'concert'
    },
    // Trip Packages
    {
      id: 'trip1',
      name: 'Paradise Resort',
      rating: 4.9,
      address: '789 Beach Road, Honolulu, HI 96815',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80',
      category: 'trip'
    },
    {
      id: 'trip2',
      name: 'Adventure Tours',
      rating: 4.8,
      address: '321 Explorer Way, Maui, HI 96761',
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80',
      category: 'trip'
    },
    // Halls
    {
      id: 'hall1',
      name: 'Graduation Plaza',
      rating: 4.9,
      address: '654 Academic Drive, New York, NY 10001',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80',
      category: 'halls'
    },
    {
      id: 'hall2',
      name: 'Scholar\'s Hall',
      rating: 4.8,
      address: '987 Diploma Street, New York, NY 10002',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80',
      category: 'halls'
    },
    // Pastry Shops
    {
      id: 'pastry1',
      name: 'Grad Cakes & More',
      rating: 4.9,
      address: '147 Baker Avenue, Chicago, IL 60601',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80',
      category: 'pastry'
    },
    {
      id: 'pastry2',
      name: 'Sweet Success',
      rating: 4.8,
      address: '258 Dessert Lane, Chicago, IL 60602',
      image: 'https://images.unsplash.com/photo-1464195244916-405fa0a82545?auto=format&fit=crop&q=80',
      category: 'pastry'
    },
    // Beauty Centers
    {
      id: 'beauty1',
      name: 'Grad Glam Spa',
      rating: 4.9,
      address: '369 Beauty Boulevard, Miami, FL 33101',
      image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80',
      category: 'beauty'
    },
    {
      id: 'beauty2',
      name: 'Celebration Beauty',
      rating: 4.8,
      address: '741 Spa Street, Miami, FL 33102',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80',
      category: 'beauty'
    },
    // Barber Shops
    {
      id: 'barber1',
      name: 'Graduate Cuts',
      rating: 4.9,
      address: '852 Style Avenue, San Francisco, CA 94101',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80',
      category: 'barber'
    },
    {
      id: 'barber2',
      name: 'Class of 2024 Grooming',
      rating: 4.8,
      address: '963 Trim Street, San Francisco, CA 94102',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80',
      category: 'barber'
    },
    // Make Up Artists
    {
      id: 'makeup1',
      name: 'Graduation Glam',
      rating: 4.9,
      address: '159 Beauty Way, Boston, MA 02101',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80',
      category: 'makeup'
    },
    {
      id: 'makeup2',
      name: 'Picture Perfect',
      rating: 4.8,
      address: '267 Makeup Lane, Boston, MA 02102',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80',
      category: 'makeup'
    },
    // Photographers
    {
      id: 'photo1',
      name: 'Graduation Memories',
      rating: 4.9,
      address: '378 Camera Court, Seattle, WA 98101',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80',
      category: 'photographer'
    },
    {
      id: 'photo2',
      name: 'Cap & Gown Studio',
      rating: 4.8,
      address: '485 Portrait Place, Seattle, WA 98102',
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
            to="/graduation/confirm-booking"
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