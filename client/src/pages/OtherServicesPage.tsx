import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

interface ServiceOption {
  id: string;
  title: string;
  image: string;
  description: string;
  selected: boolean;
}

export function OtherServicesPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<ServiceOption[]>([
    {
      id: 'venue',
      title: 'VENUES',
      description: 'Find the perfect space for your event',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80',
      selected: false
    },
    {
      id: 'catering',
      title: 'CATERING',
      description: 'Food and beverage services',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80',
      selected: false
    },
    {
      id: 'equipment',
      title: 'EQUIPMENT RENTAL',
      description: 'Audio, visual, and other equipment',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
      selected: false
    },
    {
      id: 'decoration',
      title: 'DECORATION',
      description: 'Event styling and decor services',
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&q=80',
      selected: false
    },
    {
      id: 'entertainment',
      title: 'ENTERTAINMENT',
      description: 'Musicians, performers, and activities',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80',
      selected: false
    },
    {
      id: 'photographer',
      title: 'PHOTOGRAPHER',
      description: 'Professional event photography',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80',
      selected: false
    },
    {
      id: 'transportation',
      title: 'TRANSPORTATION',
      description: 'Event transportation services',
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80',
      selected: false
    },
    {
      id: 'staffing',
      title: 'EVENT STAFF',
      description: 'Professional event personnel',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80',
      selected: false
    }
  ]);

  const toggleService = (id: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, selected: !service.selected } : service
    ));
  };

  const handleNext = () => {
    const selectedServices = services.filter(service => service.selected);
    if (selectedServices.length > 0) {
      navigate('/events/create/other/places', {
        state: { selectedServices }
      });
    }
  };

  return (
    <main className="flex-1 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="text-pink-500">Custom Event</span> Services
          </h1>
          <p className="text-xl text-gray-300">
            Select the services you need for your unique event
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`group relative overflow-hidden rounded-xl border transition-all ${
                service.selected 
                  ? 'border-pink-500 ring-2 ring-pink-500' 
                  : 'border-white/10 hover:border-purple-400/50'
              }`}
            >
              <div className="aspect-video">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/20" />
              </div>
              
              {service.selected && (
                <div className="absolute top-4 right-4 bg-pink-500 rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
                <p className="text-sm text-gray-300">{service.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleNext}
            className="px-12 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:from-purple-500 hover:to-pink-400 transition-all text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!services.some(service => service.selected)}
          >
            NEXT
          </button>
        </div>
      </div>
    </main>
  );
}