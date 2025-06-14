import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Mail, Plus, Trash2, QrCode } from 'lucide-react';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  qrCode: string;
  status: 'pending' | 'sent';
}

export function GuestQRCodePage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const generateQRCode = (guest: Omit<Guest, 'id' | 'qrCode' | 'status'>) => {
    const data = {
      name: guest.name,
      email: guest.email,
      phone: guest.phone,
      timestamp: Date.now()
    };
    return btoa(JSON.stringify(data));
  };

  const addGuest = () => {
    if (newGuest.name) { // Only name is required
      const qrCode = generateQRCode(newGuest);
      setGuests([
        ...guests,
        {
          id: Date.now().toString(),
          ...newGuest,
          qrCode,
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

  const downloadQRCode = (guest: Guest) => {
    const canvas = document.getElementById(`qr-${guest.id}`) as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `qr-${guest.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      a.click();
    }
  };

  const downloadAllQRCodes = () => {
    guests.forEach(guest => {
      downloadQRCode(guest);
    });
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
            <h1 className="text-3xl font-bold text-white">Guest QR Codes</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={downloadAllQRCodes}
              disabled={guests.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-5 w-5" />
              Download All
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

        {/* Guest List with QR Codes */}
        <div className="backdrop-blur-sm bg-purple-950/40 rounded-xl border border-purple-800/50 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Guests ({guests.length})</h2>
            {guests.length === 0 ? (
              <div className="text-center py-12">
                <QrCode className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  No guests added yet. Add your first guest above.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guests.map((guest) => (
                  <div
                    key={guest.id}
                    className="backdrop-blur-sm bg-white/5 rounded-lg border border-white/10 p-4"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{guest.name}</h3>
                        {guest.email && (
                          <p className="text-sm text-gray-400">{guest.email}</p>
                        )}
                        {guest.phone && (
                          <p className="text-sm text-gray-400">{guest.phone}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeGuest(guest.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex justify-center mb-4">
                      <div className="p-2 bg-white rounded-lg">
                        <QRCodeSVG
                          id={`qr-${guest.id}`}
                          value={guest.qrCode}
                          size={150}
                          level="H"
                          includeMargin
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
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
                        onClick={() => downloadQRCode(guest)}
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
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