import React, { useState, useEffect } from 'react';
import { User, Settings, LogOut, Camera, Edit2, Lock } from 'lucide-react';
import { getCurrentUser, updateUserProfile, updateProfilePicture, changePassword } from '../services/api';
import { toast } from 'react-hot-toast';
import { supabase } from '../services/supabase';

interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
  isOAuthUser?: boolean;
  authProvider?: string;
  preferences: {
    eventTypes: string[];
    notifications: boolean;
  };
}

export function ProfilePage() {
  // State for user data
  const [user, setUser] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    profilePicture: '',
    preferences: {
      eventTypes: [],
      notifications: true,
    },
  });

  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(true);

  // Form state for editing profile
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Password change form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Preferences form state
  const [preferencesData, setPreferencesData] = useState({
    eventTypes: [] as string[],
    notifications: true,
  });

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getCurrentUser();
        
        if (response.data && response.data.data) {
          const userData = response.data.data;
          
          // Map backend data to our UserProfile interface
          setUser({
            id: userData.id,
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            profilePicture: userData.avatar || 'https://via.placeholder.com/150', // Default image if none provided
            isOAuthUser: userData.isOAuthUser || false,
            authProvider: userData.authProvider || '',
            preferences: {
              eventTypes: userData.preferences?.eventTypes || [],
              notifications: userData.preferences?.notifications || true,
            },
          });

          // Initialize form data
          setFormData({
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
          });

          setPreferencesData({
            eventTypes: userData.preferences?.eventTypes || [],
            notifications: userData.preferences?.notifications || true,
          });

          // If user is OAuth user, disable email editing
          if (userData.isOAuthUser) {
            setIsEmailEditable(false);
            console.log(`User authenticated via ${userData.authProvider} OAuth`);
          } else {
            setIsEmailEditable(true);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
      
      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
      
      setIsEditingProfile(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      toast.success('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Failed to change password');
    }
  };

  const handlePreferencesUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        preferences: preferencesData,
      });
      
      setUser({
        ...user,
        preferences: preferencesData,
      });
      
      setIsEditingPreferences(false);
      toast.success('Preferences updated successfully');
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast.error('Failed to update preferences');
    }
  };

  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Show preview immediately
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUser({
            ...user,
            profilePicture: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
      
      // Upload to server
      try {
        const formData = new FormData();
        formData.append('profilePicture', file);
        
        await updateProfilePicture(formData);
        toast.success('Profile picture updated');
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        toast.error('Failed to update profile picture');
      }
    }
  };

  const handleLogout = () => {
    // Clear auth token
    localStorage.removeItem('token');
    // Clear Supabase session
    supabase.auth.signOut().then(() => {
      console.log('Supabase session cleared');
    }).catch(error => {
      console.error('Error clearing Supabase session:', error);
    });
    // Redirect to sign in page
    window.location.href = '/signin';
    toast.success('Logged out successfully');
  };

  const eventTypeOptions = [
    'Wedding',
    'Engagement',
    'Birthday',
    'Graduation',
    'Party',
    'Seminar',
    'Workshop',
    'Other',
  ];

  return (
    <main className="flex-1 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            My <span className="text-pink-500">Profile</span>
          </h1>
          <p className="text-xl text-gray-300">
            Manage your account information and preferences
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Profile Picture and Logout */}
            <div className="md:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center">
                <div className="relative group mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500">
                    <img
                      src={user.profilePicture || 'https://via.placeholder.com/150'}
                      alt={user.name || 'User'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="absolute bottom-0 right-0 bg-pink-500 p-2 rounded-full cursor-pointer group-hover:bg-pink-400 transition-colors">
                    <Camera className="h-5 w-5 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfilePictureChange}
                    />
                  </label>
                </div>

                <h2 className="text-2xl font-bold text-white mb-1">{user.name || 'User'}</h2>
                <p className="text-gray-400 mb-6">{user.email || 'No email provided'}</p>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            </div>

          {/* Right Column - User Information and Preferences */}
          <div className="md:col-span-2 space-y-8">
            {/* User Information Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">Personal Information</h2>
                </div>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </button>
                )}
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEmailEditable}
                      className={`w-full px-4 py-2 bg-gray-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${!isEmailEditable ? 'opacity-70 cursor-not-allowed' : ''}`}
                    />
                    {user.isOAuthUser && (
                      <p className="mt-1 text-sm text-purple-400">
                        Connected via {user.authProvider?.charAt(0).toUpperCase() + user.authProvider?.slice(1)} account
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-500 hover:to-pink-400 transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Full Name</h3>
                    <p className="text-white">{user.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Email Address</h3>
                    <p className="text-white">{user.email || 'No email provided'}</p>
                    {user.isOAuthUser && (
                      <p className="mt-1 text-sm text-purple-400">
                        Connected via {user.authProvider?.charAt(0).toUpperCase() + user.authProvider?.slice(1)} account
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Phone Number</h3>
                    <p className="text-white">{user.phone}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Password Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">Password</h2>
                </div>
                {!isChangingPassword && (
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
                  >
                    <Edit2 className="h-4 w-4" />
                    Change Password
                  </button>
                )}
              </div>

              {isChangingPassword ? (
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Current Password</label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsChangingPassword(false)}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-500 hover:to-pink-400 transition-all"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-gray-400">••••••••••••</p>
              )}
            </div>

            {/* Preferences Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">Preferences</h2>
                </div>
                {!isEditingPreferences && (
                  <button
                    onClick={() => setIsEditingPreferences(true)}
                    className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </button>
                )}
              </div>

              {isEditingPreferences ? (
                <form onSubmit={handlePreferencesUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Preferred Event Types</label>
                    <div className="grid grid-cols-2 gap-2">
                      {eventTypeOptions.map((type) => (
                        <label key={type} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={preferencesData.eventTypes.includes(type)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setPreferencesData({
                                  ...preferencesData,
                                  eventTypes: [...preferencesData.eventTypes, type],
                                });
                              } else {
                                setPreferencesData({
                                  ...preferencesData,
                                  eventTypes: preferencesData.eventTypes.filter((t) => t !== type),
                                });
                              }
                            }}
                            className="rounded border-gray-600 text-purple-500 focus:ring-purple-500 bg-gray-700"
                          />
                          <span className="text-white">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Notifications</label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={preferencesData.notifications}
                        onChange={(e) => setPreferencesData({ ...preferencesData, notifications: e.target.checked })}
                        className="rounded border-gray-600 text-purple-500 focus:ring-purple-500 bg-gray-700"
                      />
                      <span className="text-white">Receive email notifications for events</span>
                    </label>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingPreferences(false)}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-500 hover:to-pink-400 transition-all"
                    >
                      Save Preferences
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Preferred Event Types</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {user.preferences.eventTypes.map((type) => (
                        <span
                          key={type}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Notifications</h3>
                    <p className="text-white">
                      {user.preferences.notifications ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        )}</div>
    </main>
  );
}