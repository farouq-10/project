import React, { useState } from 'react';
import { Plus, Trash2, Mail, Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'sent';
}

export function GuestListPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const addGuest = () => {
    if (newGuest.name) { // Only name is required
      setGuests([
        ...guests,
        {
          id: Date.now().toString(),
          ...newGuest,
          status: 'pending'
        }
      ]);
      setNewGuest({ name: '', email: '', phone: '' });
    }
  };

  const removeGuest = (id: string) => {
    setGuests(guests.filter(guest => guest.id !== id));
  };

  const sendInvitations = () => {
    // Only update status for guests with email addresses
    setGuests(guests.map(guest => ({
      ...guest,
      status: guest.email ? 'sent' : guest.status
    })));
  };

  const downloadGuestList = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Status'],
      ...guests.map(guest => [guest.name, guest.email, guest.phone, guest.status])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'guest-list.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Count guests with email addresses that haven't been sent invitations
  const guestsWithPendingEmails = guests.filter(guest => guest.email && guest.status === 'pending').length;

  return (
    <main className="flex-1 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/invitation"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-3xl font-bold text-white">Guest List</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={downloadGuestList}
              disabled={guests.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-5 w-5" />
              Export CSV
            </button>
            <button
              onClick={sendInvitations}
              disabled={guestsWithPendingEmails === 0}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-500 hover:to-pink-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail className="h-5 w-5" />
              Send Invitations
            </button>
          </div>
        </div>

        {/* Add Guest Form */}
        <div className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Add Guest</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name <span className="text-pink-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Guest name"
                value={newGuest.name}
                onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="email"
                placeholder="Email address"
                value={newGuest.email}
                onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="tel"
                placeholder="Phone number"
                value={newGuest.phone}
                onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={addGuest}
              disabled={!newGuest.name}
              className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-5 w-5" />
              Add Guest
            </button>
          </div>
        </div>

        {/* Guest List */}
        <div className="backdrop-blur-sm bg-purple-950/40 rounded-xl border border-purple-800/50 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Guests ({guests.length})</h2>
            {guests.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                No guests added yet. Add your first guest above.
              </p>
            ) : (
              <div className="space-y-4">
                {guests.map((guest) => (
                  <div
                    key={guest.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                  >
                    <div className="grid md:grid-cols-3 gap-4 flex-1">
                      <div className="text-white">{guest.name}</div>
                      <div className="text-gray-400">{guest.email || 'No email provided'}</div>
                      <div className="text-gray-400">{guest.phone || 'No phone provided'}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      {guest.email ? (
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          guest.status === 'sent'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {guest.status === 'sent' ? 'Sent' : 'Pending'}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-sm bg-gray-500/20 text-gray-300">
                          No Email
                        </span>
                      )}
                      <button
                        onClick={() => removeGuest(guest.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}