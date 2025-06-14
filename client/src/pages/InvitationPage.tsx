import React, { useState } from 'react';
import { QrCode, List, Scan } from 'lucide-react';
import { Link } from 'react-router-dom';

interface InvitationOption {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

export function InvitationPage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options: InvitationOption[] = [
    {
      id: 'list',
      title: 'LIST THEIR NAMES',
      description: 'Create a guest list with names and contact details',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80',
      icon: <List className="h-6 w-6" />
    },
    {
      id: 'individual-qr',
      title: 'QR CODE FOR EACH GUEST',
      description: 'Generate unique QR codes for individual guests',
      image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80',
      icon: <QrCode className="h-6 w-6" />
    },
    {
      id: 'event-qr',
      title: 'QR CODE FOR THE EVENT',
      description: 'Create a single QR code for all guests',
      image: 'https://images.unsplash.com/photo-1598291286794-d417e2685f85?auto=format&fit=crop&q=80',
      icon: <Scan className="h-6 w-6" />
    }
  ];

  return (
    <main className="flex-1 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="text-pink-500">Invitation</span>
          </h1>
          <p className="text-xl text-gray-300">
            How would you like to invite your guests?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`group relative overflow-hidden rounded-xl border transition-all ${
                selectedOption === option.id
                  ? 'border-pink-500 ring-2 ring-pink-500'
                  : 'border-white/10 hover:border-purple-400/50'
              }`}
            >
              <div className="aspect-[4/3]">
                <img
                  src={option.image}
                  alt={option.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/20" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <div className="flex justify-center mb-3">
                  {option.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{option.title}</h3>
                <p className="text-sm text-gray-300">{option.description}</p>
              </div>
            </button>
          ))}
        </div>

        {selectedOption && (
          <div className="mt-8 flex justify-center">
            <Link
              to={`/invitation/${selectedOption}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-xl hover:from-purple-500 hover:to-pink-400 transition-all"
            >
              Continue
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}