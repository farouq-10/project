import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { NavLink } from './NavLink';
import { toast } from 'react-hot-toast';
import { supabase } from '../../services/supabase';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated via token
    const token = localStorage.getItem('token');
    
    // Also check Supabase session
    const checkSupabaseSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        // If we have a Supabase session but no token, store the token
        if (!token) {
          localStorage.setItem('token', data.session.access_token);
        }
        setIsAuthenticated(true);
      } else {
        // If no Supabase session, rely on token check
        setIsAuthenticated(!!token);
      }
    };
    
    checkSupabaseSession();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        localStorage.setItem('token', session.access_token);
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    });
    
    // Clean up listener on unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  
  const handleLogout = () => {
    // Clear auth token
    localStorage.removeItem('token');
    // Clear Supabase session
    supabase.auth.signOut().then(() => {
      console.log('Supabase session cleared');
    }).catch(error => {
      console.error('Error clearing Supabase session:', error);
    });
    // Update authentication state
    setIsAuthenticated(false);
    // Redirect to sign in page
    navigate('/signin');
    toast.success('Logged out successfully');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/80 backdrop-blur-xl text-white px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="group">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-transparent bg-clip-text transform group-hover:scale-105 transition-transform duration-300">EventEase</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/about">ABOUT US</NavLink>
            <NavLink to="/contact">CONTACT US</NavLink>
            <NavLink to="/events">EVENTS</NavLink>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="p-2 text-gray-300 hover:text-white transition-colors"
                    title="Profile"
                  >
                    <User className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 bg-red-600/80 px-4 py-2 rounded-md hover:bg-red-500 transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>LOGOUT</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/signin"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-2 rounded-md hover:from-pink-500 hover:to-purple-500 transition-all"
                >
                  SIGN IN
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-2">
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/about">ABOUT US</NavLink>
            <NavLink to="/contact">CONTACT US</NavLink>
            <NavLink to="/events">EVENTS</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/profile">PROFILE</NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full bg-red-600/80 px-4 py-2 rounded-md hover:bg-red-500 transition-all text-center mt-4"
                >
                  <LogOut className="h-4 w-4" />
                  <span>LOGOUT</span>
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="block bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-2 rounded-md hover:from-pink-500 hover:to-purple-500 transition-all text-center mt-4"
              >
                SIGN IN
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}