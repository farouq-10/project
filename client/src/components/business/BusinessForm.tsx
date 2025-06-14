import React, { useState } from 'react';
import { Building2, Mail, Phone, MapPin, Clock, Image as ImageIcon } from 'lucide-react';
import { useFormValidation } from '../../hooks/useFormValidation';

export function BusinessForm() {
  const { errors, validateField, validateForm } = useFormValidation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      // Handle form submission
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Basic Information</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Business Name
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="businessName"
                required
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onBlur={(e) => validateField('businessName', e.target.value)}
              />
            </div>
            {errors.businessName && (
              <p className="text-red-400 text-sm">{errors.businessName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Business Category
            </label>
            <select
              name="category"
              required
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 [&>option]:bg-gray-900"
            >
              <option value="" className="text-gray-400">Select a category</option>
              <option value="venue">Event Venue</option>
              <option value="catering">Catering Service</option>
              <option value="equipment">Equipment Rental</option>
              <option value="entertainment">Entertainment</option>
              <option value="decoration">Decoration Service</option>
              <option value="photography">Photography & Videography</option>
              <option value="transportation">Transportation</option>
              <option value="staffing">Event Staffing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Contact Information</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onBlur={(e) => validateField('email', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                required
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onBlur={(e) => validateField('phone', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Location & Hours */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Location & Hours</h3>
        
        <div className="space-y-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="address"
              placeholder="Physical Address"
              required
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="relative">
            <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="hours"
              placeholder="Operating Hours (e.g., Mon-Fri: 9AM-5PM)"
              required
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Description & Media */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Description & Media</h3>
        
        <div className="space-y-4">
          <textarea
            name="description"
            placeholder="Tell us about your business..."
            rows={4}
            required
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Upload Photos
            </label>
            <div className="relative">
              <input
                type="file"
                name="photos"
                multiple
                accept="image/*"
                className="hidden"
                id="photos"
              />
              <label
                htmlFor="photos"
                className="flex items-center gap-2 cursor-pointer bg-white/10 text-white px-4 py-2 rounded-md hover:bg-white/20 transition-all"
              >
                <ImageIcon className="h-5 w-5" />
                <span>Choose Files</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-md hover:from-purple-500 hover:to-pink-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Submit Business'}
      </button>
    </form>
  );
}