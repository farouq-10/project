import React, { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function NotificationButton() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Sample notifications - in a real app, these would come from your backend
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Event Booked',
      message: 'Your Tech Conference 2024 has been successfully booked.',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      title: 'Payment Confirmed',
      message: 'Payment for Wedding Celebration has been processed.',
      time: '1 day ago',
      read: false
    },
    {
      id: '3',
      title: 'Upcoming Event',
      message: 'Birthday Party starts in 2 days. Don\'t forget to check the details.',
      time: '2 days ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle clicks outside to close the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleViewAll = () => {
    setIsOpen(false);
    navigate('/notifications');
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg hover:from-purple-500 hover:to-pink-400 transition-all"
        >
          <Bell className="h-6 w-6 text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notifications Dropdown */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute bottom-full right-0 mb-2 w-80 bg-gray-900/95 backdrop-blur-xl border border-purple-800/50 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="p-4 border-b border-purple-800/50">
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-400">
                  No notifications yet
                </div>
              ) : (
                <div className="divide-y divide-purple-800/50">
                  {notifications.slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-white/5 transition-colors ${
                        !notification.read ? 'bg-purple-900/20' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-white">{notification.title}</h4>
                        <span className="text-xs text-gray-400">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-300">{notification.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-purple-800/50">
              <button 
                onClick={handleViewAll}
                className="w-full text-center text-purple-400 hover:text-purple-300 transition-colors text-sm"
              >
                View All Notifications
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}