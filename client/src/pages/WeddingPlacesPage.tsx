import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { PlaceCard } from '../components/wedding/PlaceCard';
import { ServicesSidebar } from '../components/wedding/ServicesSidebar';
import { useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Place {
  id: string;
  name: string;
  rating: number;
  address: string;
  image: string;
  category: string;
}

export function WeddingPlacesPage() {
  const location = useLocation();
  const selectedServices = location.state?.selectedServices || [];
  const [activeService, setActiveService] = useState('all'); // Default to 'all'
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for each category
  const places: Place[] = [
    // Halls
    {
      id: 'hall1',
      name: 'Grand Palace Hall',
      rating: 4.9,
      address: '123 Luxury Avenue, Manhattan, NY 10001',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80',
      category: 'halls'
    },
    {
      id: 'hall2',
      name: 'Crystal Ballroom',
      rating: 4.8,
      address: '456 Elegance Street, Manhattan, NY 10002',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      category: 'halls'
    },
    {
      id: 'hall3',
      name: 'Royal Garden Venue',
      rating: 4.7,
      address: '789 Majestic Road, Manhattan, NY 10003',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80',
      category: 'halls'
    },
    {
      id: 'hall4',
      name: 'Sunset Harbor Hall',
      rating: 4.9,
      address: '321 Waterfront Drive, Manhattan, NY 10004',
      image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80',
      category: 'halls'
    },
    // Dresses and Suits
    {
      id: 'dress1',
      name: 'Elegant Bridal Boutique',
      rating: 4.8,
      address: '123 Fashion Avenue, New York, NY 10001',
      image: 'https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&q=80',
      category: 'dresses'
    },
    {
      id: 'dress2',
      name: 'Modern Groom',
      rating: 4.6,
      address: '456 Style Street, New York, NY 10002',
      image: 'https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?auto=format&fit=crop&q=80',
      category: 'dresses'
    },
    {
      id: 'dress3',
      name: 'Royal Wedding Attire',
      rating: 4.7,
      address: '789 Luxury Lane, New York, NY 10003',
      image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80',
      category: 'dresses'
    },
    // Beauty Centers
    {
      id: 'beauty1',
      name: 'Glamour Beauty Spa',
      rating: 4.9,
      address: '321 Beauty Blvd, Los Angeles, CA 90001',
      image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80',
      category: 'beauty'
    },
    {
      id: 'beauty2',
      name: 'Serenity Wellness Center',
      rating: 4.7,
      address: '654 Relaxation Road, Los Angeles, CA 90002',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80',
      category: 'beauty'
    },
    {
      id: 'beauty3',
      name: 'Pure Radiance Spa',
      rating: 4.8,
      address: '987 Glow Street, Los Angeles, CA 90003',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80',
      category: 'beauty'
    },
    // Barber Shops
    {
      id: 'barber1',
      name: 'Classic Cuts',
      rating: 4.6,
      address: '147 Trim Avenue, Chicago, IL 60601',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80',
      category: 'barber'
    },
    {
      id: 'barber2',
      name: 'Gentleman\'s Quarter',
      rating: 4.8,
      address: '258 Shave Street, Chicago, IL 60602',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80',
      category: 'barber'
    },
    {
      id: 'barber3',
      name: 'Royal Grooming',
      rating: 4.7,
      address: '369 Style Lane, Chicago, IL 60603',
      image: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&q=80',
      category: 'barber'
    },
    // Make Up Artists
    {
      id: 'makeup1',
      name: 'Bridal Beauty Pro',
      rating: 4.9,
      address: '741 Glam Street, Miami, FL 33101',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80',
      category: 'makeup'
    },
    {
      id: 'makeup2',
      name: 'Flawless Face Studio',
      rating: 4.8,
      address: '852 Beauty Boulevard, Miami, FL 33102',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80',
      category: 'makeup'
    },
    {
      id: 'makeup3',
      name: 'Glamour Squad',
      rating: 4.7,
      address: '963 Makeup Lane, Miami, FL 33103',
      image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80',
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
    {
      id: 'cosmetic3',
      name: 'Radiant Renewal Clinic',
      rating: 4.7,
      address: '378 Rejuvenation Road, Beverly Hills, CA 90212',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80',
      category: 'cosmetic'
    },
    // Photographers
    {
      id: 'photo1',
      name: 'Timeless Moments',
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
    },
    {
      id: 'photo3',
      name: 'Wedding Memories',
      rating: 4.7,
      address: '357 Snapshot Street, San Francisco, CA 94103',
      image: 'https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&q=80',
      category: 'photographer'
    },
    // Trips
    {
      id: 'trip1',
      name: 'Paradise Honeymoons',
      rating: 4.9,
      address: '456 Travel Plaza, Honolulu, HI 96801',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80',
      category: 'trips'
    },
    {
      id: 'trip2',
      name: 'Romantic Getaways',
      rating: 4.8,
      address: '789 Vacation Boulevard, Maui, HI 96761',
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80',
      category: 'trips'
    },
    {
      id: 'trip3',
      name: 'Dream Destinations',
      rating: 4.7,
      address: '123 Paradise Way, Kauai, HI 96766',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80',
      category: 'trips'
    },
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
        {/* Add Confirm Booking button at the top */}
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
            to="/wedding/confirm-booking"
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