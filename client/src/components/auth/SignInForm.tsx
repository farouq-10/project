import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, setAuthToken } from '../../services/api'; // Assuming api.ts is in src/services

export function SignInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await loginUser(formData);
      // Assuming the API returns a token in response.data.token
      if (response.data && response.data.token) {
        setAuthToken(response.data.token);
        localStorage.setItem('token', response.data.token); // Store token
        // Redirect to a protected route or homepage
        navigate('/'); // Or '/dashboard', '/profile', etc.
      } else {
        // Handle cases where login is successful but no token is returned (if applicable)
        // Or if the response structure is different
        setError(response.data.message || 'Login successful, but no token received.');
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || err.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      {error && <div className="p-3 bg-red-500/20 text-red-400 border border-red-500/50 rounded-md text-center">{error}</div>}
      <div className="space-y-2">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      
      <div className="text-right">
        <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
          FORGOT PASSWORD?
        </Link>
      </div>

      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'SIGNING IN...' : 'SIGN IN'}
      </button>

      <div className="text-center text-sm text-gray-400">
        DON'T HAVE AN ACCOUNT?{' '}
        <Link to="/signup" className="text-purple-400 hover:text-purple-300">
          SIGN UP
        </Link>
      </div>
    </form>
  );
}