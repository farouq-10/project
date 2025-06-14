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

export function WorkshopServicesPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<ServiceOption[]>([
    {
      id: 'workspaces',
      title: 'WORKSPACES',
      description: 'Professional spaces for hands-on activities',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80',
      selected: false
    },
    {
      id: 'halls',
      title: 'HALLS',
      description: 'Large venues for group sessions',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80',
      selected: false
    },
    {
      id: 'equipment',
      title: 'EQUIPMENT RENTAL',
      description: 'Tools and tech for your workshop',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
      selected: false
    },
    {
      id: 'catering',
      title: 'CATERING SERVICE',
      description: 'Food and beverages for participants',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80',
      selected: false
    },
    {
      id: 'av',
      title: 'AV EQUIPMENT',
      description: 'Professional audio/visual setup',
      image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80',
      selected: false
    },
    {
      id: 'photographer',
      title: 'PHOTOGRAPHER',
      description: 'Document your workshop professionally',
      image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80',
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
      navigate('/events/create/workshop/places', {
        state: { selectedServices }
      });
    }
  };

  return (
    <main className="flex-1 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="text-pink-500">Workshop</span> Services
          </h1>
          <p className="text-xl text-gray-300">
            Select the services to create an engaging workshop experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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