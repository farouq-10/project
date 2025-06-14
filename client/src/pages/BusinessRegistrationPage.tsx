import React from 'react';
import { BusinessForm } from '../components/business/BusinessForm';

export function BusinessRegistrationPage() {
  return (
    <main className="flex-1 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            List Your <span className="text-pink-500">Business</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Join our network of premier event venues and service providers
          </p>
        </div>

        <div className="backdrop-blur-sm bg-purple-950/40 rounded-xl border border-purple-800/50 p-6 md:p-8">
          <BusinessForm />
        </div>
      </div>
    </main>
  );
}