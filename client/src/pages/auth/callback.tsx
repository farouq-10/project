import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import { setAuthToken } from '../../services/api';
import axios from 'axios';

export function AuthCallback() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState<string>('oauth');
  const navigate = useNavigate();

  useEffect(() => {
    // Extract provider from URL if available
    const urlParams = new URLSearchParams(window.location.search);
    const providerParam = urlParams.get('provider');
    if (providerParam) {
      setProvider(providerParam);
      console.log(`Processing ${providerParam} authentication callback`);
    }

    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      try {
        console.log('Getting auth session from Supabase...');
        // The hash contains the access token and other auth info
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting auth session:', error.message, error.stack);
          setError(`Authentication failed: ${error.message}`);
          setLoading(false);
          return;
        }

        if (data?.session) {
          // Store the session token
          const token = data.session.access_token;
          localStorage.setItem('token', token);
          setAuthToken(token);

          // Log user information and provider details
          console.log('Authentication successful');
          console.log('User info:', {
            id: data.session.user.id,
            email: data.session.user.email,
            provider: data.session.user.app_metadata?.provider || 'unknown'
          });
          
          // Log provider tokens if available (useful for debugging)
          if (data.session.provider_token) {
            console.log('Provider token available');
          }
          if (data.session.provider_refresh_token) {
            console.log('Provider refresh token available');
          }
          
          // Send user data to our backend to create/update user in our database
          try {
            const userInfo = {
              firstName: data.session.user.user_metadata?.full_name?.split(' ')[0] || 'User',
              secondName: data.session.user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
              email: data.session.user.email,
              provider: data.session.user.app_metadata?.provider || 'oauth'
            };
            
            console.log('Sending user data to backend:', userInfo);
            
            // Make API call to our backend
            const response = await axios.post(
              `${import.meta.env.VITE_API_URL}/users/auth/callback`, 
              { user: userInfo },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            
            console.log('Backend response:', response.data);
          } catch (backendError: any) {
            console.error('Error syncing with backend:', backendError.message);
            // Continue anyway since we have the Supabase auth
          }
          
          // Redirect to home page or dashboard
          navigate('/');
        } else {
          console.error('No session data found');
          setError('No session data found. Authentication may have failed.');
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Unexpected error during auth callback:', err);
        setError(`An unexpected error occurred: ${err.message || 'Unknown error'}`);
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 backdrop-blur-sm bg-purple-950/70 p-8 rounded-xl shadow-2xl text-center">
        {loading ? (
          <>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <h2 className="text-xl font-semibold text-white">Completing {provider} sign-in...</h2>
            </div>
            <p className="text-gray-300">Please wait while we authenticate your account</p>
          </>
        ) : error ? (
          <>
            <div className="text-red-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-semibold mt-2">Authentication Failed</h2>
              <p className="mt-1">{error}</p>
            </div>
            <button
              onClick={() => navigate('/signin')}
              className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md transition-colors"
            >
              Return to Sign In
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}