import React, { useState } from 'react';
import { Filter, X, Calendar, DollarSign, Users, MapPin } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

function FilterModal({ isOpen, onClose, onApply }: FilterModalProps) {
  const [filters, setFilters] = useState({
    dateRange: {
      start: '',
      end: ''
    },
    priceRange: {
      min: '',
      max: ''
    },
    capacity: {
      min: '',
      max: ''
    },
    location: ''
  });

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      dateRange: { start: '', end: '' },
      priceRange: { min: '', max: '' },
      capacity: { min: '', max: '' },
      location: ''
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/90 rounded-xl border border-white/10 w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Filter Events</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Date Range */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-white">Date Range</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, start: e.target.value }
                    }))}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, end: e.target.value }
                    }))}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-white">Price Range</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange.min}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, min: e.target.value }
                    }))}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange.max}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: { ...prev.priceRange, max: e.target.value }
                    }))}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Capacity */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-white">Capacity</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Min guests"
                    value={filters.capacity.min}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      capacity: { ...prev.capacity, min: e.target.value }
                    }))}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Max guests"
                    value={filters.capacity.max}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      capacity: { ...prev.capacity, max: e.target.value }
                    }))}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-white">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter location"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  location: e.target.value
                }))}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-white/10">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-500 hover:to-pink-400 transition-all"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export function EventsFilter() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  const handleApplyFilters = (filters: any) => {
    // Count non-empty filters
    let count = 0;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    if (filters.priceRange.min || filters.priceRange.max) count++;
    if (filters.capacity.min || filters.capacity.max) count++;
    if (filters.location) count++;
    setActiveFilters(count);

    // Here you would typically update your event list based on the filters
    console.log('Applied filters:', filters);
  };

  return (
    <div className="flex gap-2">
      <select className="bg-white/10 border border-white/20 rounded-md text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 [&>option]:bg-gray-900">
        <option value="" className="text-gray-400">All Categories</option>
        <option value="wedding">Wedding</option>
        <option value="engagement">Engagement</option>
        <option value="birthday">Birthday</option>
        <option value="graduation">Graduation</option>
        <option value="party">Party</option>
        <option value="seminar">Seminar</option>
        <option value="workshop">Workshop</option>
        <option value="other">Other</option>
      </select>
      
      <button
        onClick={() => setIsFilterModalOpen(true)}
        className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-md hover:bg-white/20 transition-all relative"
      >
        <Filter className="h-5 w-5" />
        Filters
        {activeFilters > 0 && (
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
            {activeFilters}
          </span>
        )}
      </button>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
}