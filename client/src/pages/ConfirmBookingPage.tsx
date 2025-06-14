import React from 'react';
import { Trash2, Calendar, MapPin, Users, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function ConfirmBookingPage() {
  const navigate = useNavigate();
  
  // This would come from your state management solution
  const bookedItems = [
    {
      id: 1,
      type: 'Hall',
      name: 'Grand Palace Hall',
      date: '2024-06-15',
      guests: 200,
      selections: {
        buffet: 'First Class Buffet',
        photography: ['Photos', 'Videos'],
        zafa: 'Zafa Package 2',
        singer: 'Alexandra Rose'
      },
      total: 15000
    }
    // Add more booked items as needed
  ];

  const calculateTotal = () => {
    return bookedItems.reduce((sum, item) => sum + item.total, 0);
  };

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  return (
    <main className="flex-1 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Confirm Your Booking
          </h1>
          <p className="text-xl text-gray-300">
            Review and confirm your selected venues and services
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booked Items List */}
          <div className="lg:col-span-2 space-y-6">
            {bookedItems.map((item) => (
              <div
                key={item.id}
                className="backdrop-blur-sm bg-gray-900/50 rounded-xl border border-white/10 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="h-4 w-4" />
                        <span>{item.guests} Guests</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4 border-t border-white/10 pt-4">
                  <h4 className="font-medium text-white">Selected Services:</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-gray-300">
                        <span className="text-white">Buffet:</span> {item.selections.buffet}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-white">Photography:</span>{' '}
                        {item.selections.photography.join(' & ')}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-300">
                        <span className="text-white">Zafa Package:</span> {item.selections.zafa}
                      </p>
                      <p className="text-gray-300">
                        <span className="text-white">Singer:</span> {item.selections.singer}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end border-t border-white/10 mt-4 pt-4">
                  <p className="text-xl font-semibold text-white">
                    ${item.total.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

            <Link
              to="/events/create/wedding/places"
              className="inline-block text-purple-400 hover:text-purple-300 transition-colors"
            >
              ← Continue Adding Places
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-8">
            <div className="backdrop-blur-sm bg-gray-900/50 rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {bookedItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-gray-300">
                    <span>{item.name}</span>
                    <span>${item.total.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between text-white">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold">
                    ${calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedToPayment}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg hover:from-purple-500 hover:to-pink-400 transition-all font-medium flex items-center justify-center gap-2"
              >
                <CreditCard className="h-5 w-5" />
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}