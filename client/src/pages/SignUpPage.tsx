import React from 'react';
import { SignUpForm } from '../components/auth/SignUpForm';
import { SocialAuth } from '../components/auth/SocialAuth';

export function SignUpPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 backdrop-blur-sm bg-purple-950/70 p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Sign <span className="text-pink-500">Up</span>
          </h1>
          <p className="text-gray-300 text-lg italic">
            Be a part of our big family
          </p>
        </div>

        <SignUpForm />
        <SocialAuth />
      </div>
    </main>
  );
}