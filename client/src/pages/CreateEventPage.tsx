import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { EventForm } from '../components/events/EventForm';
import { EventPreview } from '../components/events/EventPreview';

const schema = z.object({
  title: z.string().min(3, 'Event title must be at least 3 characters'),
  description: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(1, 'Location is required'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  visibility: z.enum(['public', 'private'], {
    required_error: 'Please select event visibility',
  }),
  specialGuests: z.string().optional().transform(val => 
    val ? val.split('\n').filter(guest => guest.trim().length > 0) : []
  ),
  image: z.any().optional(),
});

type EventFormData = z.infer<typeof schema>;

export function CreateEventPage() {
  const [isPreview, setIsPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<EventFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      visibility: 'private',
      specialGuests: '',
      capacity: 100,
    },
  });

  const onSubmit = async (data: EventFormData) => {
    try {
      // Transform the special guests string into an array
      const formattedData = {
        ...data,
        specialGuests: data.specialGuests || []
      };

      // Store the event data (you can implement your storage logic here)
      console.log('Form data:', formattedData);
      
      // Navigate to the event type selection page
      navigate('/events/create/type');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className="flex-1 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Create Your Event
          </h1>
          <p className="text-xl text-gray-300">
            Fill in the details below to create your amazing event
          </p>
        </div>

        {isPreview ? (
          <div className="space-y-6">
            <EventPreview data={form.getValues()} image={selectedImage} />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsPreview(false)}
                className="px-6 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={form.handleSubmit(onSubmit)}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md hover:from-purple-500 hover:to-pink-400 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        ) : (
          <div className="backdrop-blur-sm bg-gray-900/50 rounded-xl border border-white/10 p-6">
            <EventForm
              form={form}
              onSubmit={onSubmit}
              setSelectedImage={setSelectedImage}
            />
          </div>
        )}
      </div>
    </main>
  );
}