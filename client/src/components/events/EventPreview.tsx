import React from 'react';
import { Calendar, Clock, MapPin, Users, Tag } from 'lucide-react';

interface EventPreviewProps {
  data: any;
  image: string | null;
}

export function EventPreview({ data, image }: EventPreviewProps) {
  return (
    <div className="backdrop-blur-sm bg-purple-950/40 rounded-xl border border-purple-800/50 overflow-hidden">
      {image && (
        <div className="aspect-video relative">
          <img
            src={image}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 to-transparent" />
        </div>
      )}
      
      <div className="p-8 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{data.title}</h2>
          <p className="text-gray-300">{data.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="h-5 w-5 text-purple-400" />
            <span>{data.date}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="h-5 w-5 text-purple-400" />
            <span>{data.time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="h-5 w-5 text-purple-400" />
            <span>{data.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-300">
            <Tag className="h-5 w-5 text-purple-400" />
            <span>{data.category}</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 border-t border-purple-800/50">
          <div className="flex items-center gap-2 text-gray-300">
            <Users className="h-5 w-5 text-purple-400" />
            <span>Capacity: {data.capacity} attendees</span>
          </div>
          
          <div className="text-xl font-semibold text-white">
            ${data.ticketPrice.toFixed(2)}
          </div>
        </div>

        {data.isPrivate && (
          <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
            Private Event
          </div>
        )}

        {data.specialGuests?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Special Guests</h3>
            <div className="space-y-1">
              {data.specialGuests.map((guest: string, index: number) => (
                <div key={index} className="text-gray-300">{guest}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}