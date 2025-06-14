import React from 'react';
import { Mail, User, Phone, Send } from 'lucide-react';
import { useContactForm } from '../../hooks/useContactForm';

export function ContactForm() {
  const { handleSubmit, register, errors, isSubmitting } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6 backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Full Name *</label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            {...register('name')}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Email Address *</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            {...register('email')}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Phone Number (Optional)</label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="tel"
            {...register('phone')}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Department *</label>
        <select
          {...register('department')}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Select a department</option>
          <option value="support">Customer Support</option>
          <option value="sales">Sales</option>
          <option value="business">Business Development</option>
          <option value="technical">Technical Support</option>
        </select>
        {errors.department && <p className="text-red-400 text-sm mt-1">{errors.department}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Message *</label>
        <textarea
          {...register('message')}
          rows={4}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="How can we help you?"
        />
        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-md hover:from-purple-500 hover:to-pink-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="h-5 w-5" />
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}