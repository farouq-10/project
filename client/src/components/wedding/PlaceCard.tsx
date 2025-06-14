import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { VenueDetailsModal } from './VenueDetailsModal';
import { DressSuitDetailsModal } from './DressSuitDetailsModal';
import { TripDetailsModal } from './TripDetailsModal';
import { WorkspaceDetailsModal } from './WorkspaceDetailsModal';

interface PlaceCardProps {
  place: {
    id: string;
    name: string;
    rating: number;
    address: string;
    image: string;
    category: string;
    description?: string;
    capacity?: number;
    amenities?: string[];
    contact?: {
      phone: string;
      email: string;
      website: string;
    };
    hours?: string;
  };
}

export function PlaceCard({ place }: PlaceCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Add default values for optional properties
  const placeWithDefaults = {
    ...place,
    description: place.description || 'A beautiful venue for your special day.',
    capacity: place.capacity || 500,
    amenities: place.amenities || [
      'Air Conditioning',
      'Parking',
      'Wheelchair Accessible',
      'WiFi',
      'Catering Kitchen',
      'Sound System'
    ],
    contact: place.contact || {
      phone: '+1 (555) 123-4567',
      email: 'info@venue.com',
      website: 'www.venue.com'
    },
    hours: place.hours || 'Mon-Sun: 9:00 AM - 11:00 PM'
  };

  const renderDetailsModal = () => {
    if (!showDetails) return null;

    switch (place.category) {
      case 'dresses':
        return (
          <DressSuitDetailsModal
            item={placeWithDefaults}
            onClose={() => setShowDetails(false)}
          />
        );
      case 'trips':
        return (
          <TripDetailsModal
            trip={placeWithDefaults}
            onClose={() => setShowDetails(false)}
          />
        );
      case 'workspaces':
        return (
          <WorkspaceDetailsModal
            workspace={placeWithDefaults}
            onClose={() => setShowDetails(false)}
          />
        );
      default:
        return (
          <VenueDetailsModal
            venue={placeWithDefaults}
            onClose={() => setShowDetails(false)}
          />
        );
    }
  };

  return (
    <>
      <div className="backdrop-blur-sm bg-purple-950/40 rounded-xl border border-purple-800/50 overflow-hidden hover:border-pink-500/50 transition-all group">
        <div className="aspect-video relative">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 to-transparent" />
        </div>
        
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">{place.name}</h3>
            <div className="flex items-center gap-1">
              <span className="text-white">{place.rating}</span>
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
          
          <p className="text-sm text-gray-300 line-clamp-2">{place.address}</p>
          
          <button
            onClick={() => setShowDetails(true)}
            className="w-full bg-white/10 text-white py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>

      {renderDetailsModal()}
    </>
  );
}