import React from 'react';
import { useNavigate } from 'react-router-dom';

const eventTypes = [
  {
    id: 'wedding',
    title: 'WEDDING',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80',
  },
  {
    id: 'engagement',
    title: 'ENGAGEMENT',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80',
  },
  {
    id: 'birthday',
    title: 'BIRTHDAY',
    image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&q=80',
  },
  {
    id: 'graduation',
    title: 'GRADUATION',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=80',
  },
  {
    id: 'party',
    title: 'PARTY',
    image: 'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?auto=format&fit=crop&q=80',
  },
  {
    id: 'seminar',
    title: 'SEMINAR',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80',
  },
  {
    id: 'workshop',
    title: 'WORKSHOP',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
  },
  {
    id: 'other',
    title: 'OTHER',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80',
  },
];

export function EventTypePage() {
  const navigate = useNavigate();

  const handleTypeSelect = (typeId: string) => {
    switch (typeId) {
      case 'wedding':
        navigate('/events/create/wedding/services');
        break;
      case 'engagement':
        navigate('/events/create/engagement/services');
        break;
      case 'birthday':
        navigate('/events/create/birthday/services');
        break;
      case 'graduation':
        navigate('/events/create/graduation/services');
        break;
      case 'party':
        navigate('/events/create/party/services');
        break;
      case 'seminar':
        navigate('/events/create/seminar/services');
        break;
      case 'workshop':
        navigate('/events/create/workshop/services');
        break;
      case 'other':
        navigate('/events/create/other/services');
        break;
      default:
        navigate(`/events/create/${typeId}`);
    }
  };

  return (
    <main className="flex-1 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Select Your Event Type
          </h1>
          <p className="text-xl text-gray-300">
            Choose the type of event you want to create
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {eventTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeSelect(type.id)}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 hover:border-pink-500/50 transition-all"
            >
              <img
                src={type.image}
                alt={type.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3 className="text-xl font-bold text-white">{type.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}