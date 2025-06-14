import { useState } from 'react';
import { X, Clock, Heart, MessageCircle, Info } from 'lucide-react';

interface DressSuitOption {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  features: string[];
  availableSizes: string[];
  rentalPeriod: string;
  designer: string;
}

interface DressSuitDetailsModalProps {
  item: {
    id: string;
    name: string;
    rating: number;
    address: string;
    image: string;
    description?: string;
    contact?: {
      phone: string;
      email: string;
      website: string;
    };
    hours?: string;
  };
  onClose: () => void;
}

export function DressSuitDetailsModal({ item, onClose }: DressSuitDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('details');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');

  // Sample dress/suit options
  const options: DressSuitOption[] = [
    {
      id: 'dress1',
      name: 'Elegant Lace Wedding Gown',
      description: 'A stunning A-line wedding dress with delicate lace details and a sweetheart neckline',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80',
      features: [
        'Hand-sewn lace appliques',
        'Chapel length train',
        'Built-in corset',
        'Pearl button details'
      ],
      availableSizes: ['2', '4', '6', '8', '10', '12'],
      rentalPeriod: '3 days',
      designer: 'Vera Wang'
    },
    {
      id: 'dress2',
      name: 'Modern Minimalist Silk Gown',
      description: 'A sleek and modern silk wedding dress with clean lines and elegant simplicity',
      price: 2200,
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80',
      features: [
        'Premium silk fabric',
        'Minimalist design',
        'Open back detail',
        'Side slit'
      ],
      availableSizes: ['4', '6', '8', '10', '12', '14'],
      rentalPeriod: '3 days',
      designer: 'Carolina Herrera'
    },
    {
      id: 'suit1',
      name: 'Classic Black Tuxedo',
      description: 'A timeless black tuxedo with satin lapels and expert tailoring',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80',
      features: [
        'Super 150s wool',
        'Satin peak lapels',
        'Hand-finished details',
        'Italian fabric'
      ],
      availableSizes: ['38R', '40R', '42R', '44R', '46R', '48R'],
      rentalPeriod: '3 days',
      designer: 'Tom Ford'
    },
    {
      id: 'suit2',
      name: 'Navy Blue Three-Piece Suit',
      description: 'A sophisticated navy blue three-piece suit perfect for any formal occasion',
      price: 1600,
      image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&q=80',
      features: [
        'Premium wool blend',
        'Matching waistcoat',
        'Modern fit',
        'Pick-stitched details'
      ],
      availableSizes: ['38R', '40R', '42R', '44R', '46R'],
      rentalPeriod: '3 days',
      designer: 'Hugo Boss'
    }
  ];

  const handleBooking = () => {
    if (!selectedOption || !selectedSize) return;
    
    // Add the dress/suit to booked items
    console.log('Booked:', {
      itemId: item.id,
      optionId: selectedOption,
      size: selectedSize
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-purple-950/90 rounded-xl border border-purple-800/50 w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative h-64">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <button
            className="absolute top-4 right-16 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-colors flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Chat with Merchant
          </button>
          <div className="absolute bottom-4 left-4">
            <h2 className="text-3xl font-bold text-white mb-2">{item.name}</h2>
            <p className="text-gray-300">{item.address}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-purple-800/50">
          <div className="flex">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'details'
                  ? 'text-white border-b-2 border-pink-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Store Details
            </button>
            <button
              onClick={() => setActiveTab('booking')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'booking'
                  ? 'text-white border-b-2 border-pink-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Book Item
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-400px)]">
          {activeTab === 'details' ? (
            <div className="space-y-6">
              {/* About */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">About</h3>
                <p className="text-gray-300">{item.description || 'A premier destination for wedding attire, offering a curated selection of designer dresses and suits.'}</p>
              </div>

              {/* Designers */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Featured Designers</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Vera Wang', 'Carolina Herrera', 'Tom Ford', 'Hugo Boss'].map((designer) => (
                    <div key={designer} className="flex items-center gap-2 text-gray-300">
                      <div className="h-2 w-2 bg-purple-400 rounded-full" />
                      <span>{designer}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Services</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    'Professional Fitting',
                    'Alterations',
                    'Style Consultation',
                    'Accessories',
                    'Preservation',
                    'Rush Service'
                  ].map((service) => (
                    <div key={service} className="flex items-center gap-2 text-gray-300">
                      <div className="h-2 w-2 bg-purple-400 rounded-full" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <p className="text-gray-300">Phone: {item.contact?.phone || '+1 (555) 123-4567'}</p>
                  <p className="text-gray-300">Email: {item.contact?.email || 'info@store.com'}</p>
                  <p className="text-gray-300">Website: {item.contact?.website || 'www.store.com'}</p>
                  <p className="text-gray-300">Hours: {item.hours || 'Mon-Sun: 10:00 AM - 7:00 PM'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Hint Message */}
              <div className="backdrop-blur-sm bg-purple-950/40 p-4 rounded-xl border border-purple-800/50 flex items-start gap-3">
                <Info className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300">
                  Select a dress or suit option only if you want to book this specific item. If you're just browsing or not ready to make a selection, you can skip this step.
                </p>
              </div>
              
              {/* Available Options */}
              <div className="grid md:grid-cols-2 gap-6">
                {options.map((option) => (
                  <label
                    key={option.id}
                    className={`block relative cursor-pointer rounded-lg overflow-hidden border transition-all ${
                      selectedOption === option.id
                        ? 'border-pink-500 ring-2 ring-pink-500'
                        : 'border-purple-800/50 hover:border-purple-400/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="option"
                      value={option.id}
                      checked={selectedOption === option.id}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="sr-only"
                    />
                    <div className="aspect-video relative">
                      <img
                        src={option.image}
                        alt={option.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 to-transparent" />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-white">{option.name}</h4>
                          <p className="text-sm text-purple-400">By {option.designer}</p>
                        </div>
                        <p className="text-lg font-semibold text-white">${option.price}</p>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">{option.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Clock className="h-4 w-4 text-purple-400" />
                          <span>Rental period: {option.rentalPeriod}</span>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {selectedOption && (
                <>
                  {/* Features */}
                  <div className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50">
                    <h3 className="text-xl font-semibold text-white mb-4">Features & Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {options.find(o => o.id === selectedOption)?.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-300">
                          <Heart className="h-4 w-4 text-pink-400" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50">
                    <div className="flex items-start gap-3 mb-4">
                      <h3 className="text-xl font-semibold text-white">Select Size</h3>
                      <div className="ml-auto flex items-center gap-2 bg-purple-900/50 px-3 py-1 rounded-full">
                        <Info className="h-4 w-4 text-purple-400" />
                        <span className="text-xs text-gray-300">Required to proceed</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {options.find(o => o.id === selectedOption)?.availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`p-2 rounded-md border transition-colors ${
                            selectedSize === size
                              ? 'border-pink-500 bg-pink-500/20 text-white'
                              : 'border-purple-800/50 text-gray-300 hover:border-purple-400/50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Total Cost */}
                  <div className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">Total Cost</h3>
                        <p className="text-sm text-gray-400">Includes rental and service fee</p>
                      </div>
                      <div className="text-2xl font-bold text-white">
                        ${options.find(o => o.id === selectedOption)?.price}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-purple-900/50 px-3 py-2 rounded-lg mb-4">
                      <Info className="h-4 w-4 text-purple-400" />
                      <p className="text-sm text-gray-300">Clicking "Proceed to Booking" will add this item to your wedding plan. You can review all selections before finalizing your booking.</p>
                    </div>
                    <button
                      onClick={handleBooking}
                      disabled={!selectedSize}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg hover:from-purple-500 hover:to-pink-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      Proceed to Booking
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}