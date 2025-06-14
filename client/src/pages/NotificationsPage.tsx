import React, { useState } from 'react';
import { Bell, Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
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

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <main className="flex-1 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-3xl font-bold text-white">Notifications</h1>
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`backdrop-blur-sm bg-purple-950/40 rounded-xl border transition-all ${
                  notification.read 
                    ? 'border-purple-800/50' 
                    : 'border-pink-500/50 bg-purple-900/20'
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-gray-300">{notification.message}</p>
                    </div>
                    <span className="text-sm text-gray-400 ml-4">
                      {notification.time}
                    </span>
                  </div>
                  
                  <div className="flex justify-end gap-4 mt-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <Check className="h-4 w-4" />
                        Mark as read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}