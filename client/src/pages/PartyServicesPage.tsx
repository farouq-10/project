import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

interface ServiceOption {
  id: string;
  title: string;
  image: string;
  selected: boolean;
}

export function PartyServicesPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<ServiceOption[]>([
    {
      id: 'pastry',
      title: 'PASTRY SHOP',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80',
      selected: false
    },
    {
      id: 'halls',
      title: 'HALLS',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80',
      selected: false
    },
    {
      id: 'beauty',
      title: 'BEAUTY CENTER',
      image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80',
      selected: false
    },
    {
      id: 'barber',
      title: 'BARBER SHOP',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80',
      selected: false
    },
    {
      id: 'makeup',
      title: 'MAKE UP ARTIST',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80',
      selected: false
    },
    {
      id: 'photographer',
      title: 'PHOTOGRAPHER',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80',
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
      navigate('/events/create/party/places', {
        state: { selectedServices }
      });
    }
  };

  return (
    <main className="flex-1 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="text-pink-500">Party</span> Services
          </h1>
          <p className="text-xl text-gray-300">
            Select the services to make your party unforgettable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`group relative aspect-square overflow-hidden rounded-xl border transition-all ${
                service.selected 
                  ? 'border-pink-500 ring-2 ring-pink-500' 
                  : 'border-white/10 hover:border-purple-400/50'
              }`}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/20" />
              
              {service.selected && (
                <div className="absolute top-4 right-4 bg-pink-500 rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3 className="text-lg font-bold text-white">{service.title}</h3>
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