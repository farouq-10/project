import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  department: z.string().min(1, 'Please select a department'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function useContactForm() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    // Handle form submission here
    console.log(data);
  });

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
  };
}