import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Calendar, Clock, MapPin, Users, Image as ImageIcon, FileText, UserPlus, Globe, Lock, Users2, Phone } from 'lucide-react';

interface EventFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => Promise<void>;
  setSelectedImage: (image: string | null) => void;
}

export function EventForm({ form, onSubmit, setSelectedImage }: EventFormProps) {
  const { register, handleSubmit: hookFormSubmit, formState: { errors }, watch } = form;
  const visibility = watch('visibility');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={hookFormSubmit(onSubmit)} className="space-y-8">
      {/* Required Fields Notice */}
      <div className="text-sm text-gray-400 flex items-center gap-1">
        <span className="text-pink-500">*</span>
        <span>Required fields</span>
      </div>

      {/* Basic Information */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Event Details</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Event Title <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              {...register('title')}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Give your event a catchy title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-400">{errors.title.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number <span className="text-pink-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                {...register('phone')}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your phone number"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-400">{errors.phone.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Describe your event..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">{errors.description.message as string}</p>
            )}
          </div>
        </div>
      </div>

      {/* Event Visibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Event Visibility <span className="text-pink-500">*</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label 
            className={`relative flex flex-col items-center gap-4 p-6 rounded-xl cursor-pointer transition-all ${
              visibility === 'private'
                ? 'bg-purple-600/30 border-2 border-purple-500'
                : 'bg-white/10 border border-white/20 hover:bg-white/20'
            }`}
          >
            <input
              type="radio"
              value="private"
              {...register('visibility')}
              className="sr-only"
            />
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Users2 className={`h-6 w-6 ${visibility === 'private' ? 'text-purple-400' : 'text-gray-400'}`} />
            </div>
            <div className="text-center">
              <div className="font-medium text-white">Private Event</div>
              <p className="text-sm text-gray-400 mt-1">Only invited guests can view and attend</p>
            </div>
            {visibility === 'private' && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <Lock className="h-3 w-3 text-white" />
              </div>
            )}
          </label>

          <label 
            className={`relative flex flex-col items-center gap-4 p-6 rounded-xl cursor-pointer transition-all ${
              visibility === 'public'
                ? 'bg-purple-600/30 border-2 border-purple-500'
                : 'bg-white/10 border border-white/20 hover:bg-white/20'
            }`}
          >
            <input
              type="radio"
              value="public"
              {...register('visibility')}
              className="sr-only"
            />
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Globe className={`h-6 w-6 ${visibility === 'public' ? 'text-purple-400' : 'text-gray-400'}`} />
            </div>
            <div className="text-center">
              <div className="font-medium text-white">Public Event</div>
              <p className="text-sm text-gray-400 mt-1">Anyone can discover and attend</p>
            </div>
            {visibility === 'public' && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <Globe className="h-3 w-3 text-white" />
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Date and Time */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Date & Time</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Date <span className="text-pink-500">*</span>
            </label>
            <label className="relative block cursor-pointer">
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                type="date"
                {...register('date')}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
              />
            </label>
            {errors.date && (
              <p className="mt-1 text-sm text-red-400">{errors.date.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Time <span className="text-pink-500">*</span>
            </label>
            <label className="relative block cursor-pointer">
              <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                type="time"
                {...register('time')}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
              />
            </label>
            {errors.time && (
              <p className="mt-1 text-sm text-red-400">{errors.time.message as string}</p>
            )}
          </div>
        </div>
      </div>

      {/* Location and Capacity */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Location & Capacity</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Location <span className="text-pink-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                {...register('location')}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Event location"
              />
            </div>
            {errors.location && (
              <p className="mt-1 text-sm text-red-400">{errors.location.message as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Maximum Capacity <span className="text-pink-500">*</span>
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="number"
                {...register('capacity', { valueAsNumber: true })}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Number of attendees"
              />
            </div>
            {errors.capacity && (
              <p className="mt-1 text-sm text-red-400">{errors.capacity.message as string}</p>
            )}
          </div>
        </div>
      </div>

      {/* Special Guests */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Special Guests</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Non-Tech Guest Names <span className="text-gray-400">(Optional)</span>
          </label>
          <div className="relative">
            <UserPlus className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              {...register('specialGuests')}
              rows={4}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter guest names (one per line)"
            />
          </div>
          <p className="mt-1 text-sm text-gray-400">
            Add names of special guests who can attend without an invitation
          </p>
        </div>
      </div>

      {/* Image Upload */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Event Image</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Upload Event Banner <span className="text-gray-400">(Optional)</span>
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/20 border-dashed rounded-md hover:border-purple-500/50 transition-colors">
            <div className="space-y-1 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-400">
                <label className="relative cursor-pointer rounded-md font-medium text-purple-400 hover:text-purple-300 focus-within:outline-none">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md hover:from-purple-500 hover:to-pink-400 transition-all"
        >
          Next
        </button>
      </div>
    </form>
  );
}