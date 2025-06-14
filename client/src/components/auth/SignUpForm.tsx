import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser, setAuthToken } from '../../services/api';
import { Eye, EyeOff } from 'lucide-react';

export function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Updated password validation to match backend
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{12,}$/;
    if (!passwordPattern.test(formData.password)) {
      setError(
        "Password must be at least 12 characters long and include uppercase, lowercase, a number, and a special character."
      );
      return;
    }

    setIsLoading(true);
    try {
      // Create a copy of formData without confirmPassword
      const { confirmPassword, ...signupData } = formData;
      
      const response = await signupUser(signupData);
      const token = response.data.token || response.data.user?.token;

      if (token) {
        localStorage.setItem('token', token);
        setAuthToken(token);
        setSuccessMessage('Signup successful! Redirecting to your dashboard...');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setError(response.data.message || 'Signup successful, but no token received. Please try logging in.');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      {error && (
        <div className="p-3 bg-red-500/20 text-red-400 border border-red-500/50 rounded-md text-center">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="p-3 bg-green-500/20 text-green-400 border border-green-500/50 rounded-md text-center">
          {successMessage}
        </div>
      )}

      {['firstName', 'secondName', 'phone', 'email'].map((field) => (
        <div key={field}>
          <input
            type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
            name={field}
            placeholder={field === 'firstName'
              ? 'FIRST NAME'
              : field === 'secondName'
              ? 'SECOND NAME'
              : field === 'phone'
              ? 'PHONE NUMBER'
              : 'EMAIL'}
            value={(formData as any)[field]}
            onChange={handleChange}
            required
            className="w-full pl-4 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      ))}

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="PASSWORD"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full pl-4 pr-10 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <div className="relative">
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="CONFIRM PASSWORD"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full pl-4 pr-10 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
      </button>

      <div className="text-center text-sm text-gray-400">
        ALREADY HAVE AN ACCOUNT?{' '}
        <Link to="/signin" className="text-purple-400 hover:text-purple-300">
          SIGN IN
        </Link>
      </div>
    </form>
  );
}
