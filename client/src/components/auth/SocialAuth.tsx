import React, { useState } from 'react';
import { supabase } from '../../services/supabase';

export function SocialAuth() {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  const socialButtons = [
    { name: 'Google', icon: 'https://authjs.dev/img/providers/google.svg' },
    { name: 'Facebook', icon: 'https://authjs.dev/img/providers/facebook.svg' },
    { name: 'Apple', icon: 'https://authjs.dev/img/providers/apple.svg' },
    { name: 'LinkedIn', icon: 'https://authjs.dev/img/providers/linkedin.svg' },
  ];

  const handleSocialLogin = async (provider: string) => {
    try {
      // Reset error state
      setError(null);
      // Set loading state for this provider
      setLoading(prev => ({ ...prev, [provider]: true }));
      
      console.log(`Initiating ${provider} OAuth sign-in...`);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as any,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: provider === 'google' ? 'email profile' : undefined,
          queryParams: provider === 'google' ? {
            access_type: 'offline',
            prompt: 'consent',
          } : undefined,
        },
      });

      if (error) {
        console.error(`Error signing in with ${provider}:`, error.message);
        setError(`${provider} sign-in failed: ${error.message}`);
      } else if (data?.url) {
        console.log(`Successfully generated OAuth URL for ${provider}:`, data.url);
        // Redirect to the OAuth provider's login page
        window.location.href = data.url;
      } else {
        setError(`Something went wrong with ${provider} sign-in. No URL returned.`);
      }
    } catch (error: any) {
      console.error(`Unexpected error during ${provider} OAuth sign-in:`, error);
      setError(`Unexpected error: ${error.message || 'Unknown error'}`);
    } finally {
      // Reset loading state
      setLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-500/20 text-red-400 border border-red-500/50 rounded-md text-center">
          {error}
        </div>
      )}
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-400 bg-purple-950">OR</span>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        {socialButtons.map((button) => (
          <button
            key={button.name}
            className={`p-2 rounded-full transition-colors ${loading[button.name.toLowerCase()] 
              ? 'bg-white/5 cursor-not-allowed' 
              : 'bg-white/10 hover:bg-white/20'}`}
            onClick={() => handleSocialLogin(button.name.toLowerCase())}
            aria-label={`Sign in with ${button.name}`}
            disabled={loading[button.name.toLowerCase()]}
          >
            <img 
              src={button.icon} 
              alt={`${button.name} logo`} 
              className="w-6 h-6" 
            />
            {loading[button.name.toLowerCase()] && (
              <span className="absolute w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}