import React, { useState } from 'react';
import { ArrowLeft, Upload, Music, Film, Image as ImageIcon, X, Play, Pause, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  title: string;
  eventId: string;
  uploadDate: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
}

export function EventGalleryPage() {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedMediaType, setSelectedMediaType] = useState<'all' | 'image' | 'video' | 'audio'>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEventWarning, setShowEventWarning] = useState(false);

  // Sample events data - would come from your state management
  const events: Event[] = [
    { id: '1', name: 'Tech Conference 2024', date: '2024-06-15' },
    { id: '2', name: 'Wedding Celebration', date: '2024-07-20' },
    { id: '3', name: 'Birthday Party', date: '2024-03-10' }
  ];

  // Sample media items - would come from your backend
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80',
      title: 'Opening Ceremony',
      eventId: '1',
      uploadDate: '2024-03-15'
    },
    {
      id: '2',
      type: 'video',
      url: 'https://example.com/sample-video.mp4',
      title: 'Keynote Speech',
      eventId: '1',
      uploadDate: '2024-03-15'
    },
    {
      id: '3',
      type: 'audio',
      url: 'https://example.com/sample-audio.mp3',
      title: 'Welcome Address',
      eventId: '1',
      uploadDate: '2024-03-15'
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (!selectedEvent) {
      setShowEventWarning(true);
      event.target.value = ''; // Reset file input
      return;
    }

    setIsUploading(true);
    setShowEventWarning(false);

    // Simulate file upload
    setTimeout(() => {
      const newMediaItems: MediaItem[] = Array.from(files).map((file, index) => ({
        id: Date.now().toString() + index,
        type: file.type.startsWith('image/') ? 'image' : 
              file.type.startsWith('video/') ? 'video' : 'audio',
        url: URL.createObjectURL(file),
        title: file.name,
        eventId: selectedEvent,
        uploadDate: new Date().toISOString().split('T')[0]
      }));

      setMediaItems([...mediaItems, ...newMediaItems]);
      setIsUploading(false);
    }, 1500);
  };

  const deleteMediaItem = (id: string) => {
    setMediaItems(mediaItems.filter(item => item.id !== id));
  };

  const filteredMedia = mediaItems.filter(item => 
    (selectedEvent ? item.eventId === selectedEvent : true) &&
    (selectedMediaType === 'all' || item.type === selectedMediaType)
  );

  const toggleAudioPlayback = (audioUrl: string) => {
    if (currentAudio === audioUrl) {
      setIsPlaying(!isPlaying);
      const audioElement = document.getElementById('audio-player') as HTMLAudioElement;
      if (audioElement) {
        isPlaying ? audioElement.pause() : audioElement.play();
      }
    } else {
      setCurrentAudio(audioUrl);
      setIsPlaying(true);
    }
  };

  return (
    <main className="flex-1 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/events/my-events"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-white">Event Gallery</h1>
        </div>

        {/* Event Selection and Warning */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Event *
          </label>
          <select
            value={selectedEvent}
            onChange={(e) => {
              setSelectedEvent(e.target.value);
              setShowEventWarning(false);
            }}
            className="w-full bg-white/10 border border-white/20 rounded-lg text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="" className="bg-gray-900">Select an event</option>
            {events.map(event => (
              <option key={event.id} value={event.id} className="bg-gray-900">
                {event.name} ({new Date(event.date).toLocaleDateString()})
              </option>
            ))}
          </select>
          {showEventWarning && (
            <div className="flex items-center gap-2 mt-2 text-yellow-400">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">Please select an event before uploading media</p>
            </div>
          )}
        </div>

        {/* Filters and Upload */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Media Type Filter */}
          <select
            value={selectedMediaType}
            onChange={(e) => setSelectedMediaType(e.target.value as any)}
            className="bg-white/10 border border-white/20 rounded-lg text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all" className="bg-gray-900">All Media Types</option>
            <option value="image" className="bg-gray-900">Images</option>
            <option value="video" className="bg-gray-900">Videos</option>
            <option value="audio" className="bg-gray-900">Audio</option>
          </select>

          {/* Upload Button */}
          <div className="relative">
            <input
              type="file"
              id="file-upload"
              multiple
              accept="image/*,video/*,audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className={`inline-flex items-center justify-center w-full gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-500 hover:to-pink-400 transition-all cursor-pointer ${
                isUploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Upload className="h-5 w-5" />
              {isUploading ? 'Uploading...' : 'Upload Media'}
            </label>
          </div>
        </div>

        {/* Media Grid */}
        {filteredMedia.length === 0 ? (
          <div className="text-center py-12">
            <Upload className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">
              {selectedEvent 
                ? 'No media items found. Upload some memories!'
                : 'Select an event to view or upload media'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="backdrop-blur-sm bg-purple-950/40 rounded-xl border border-purple-800/50 overflow-hidden group"
              >
                {item.type === 'image' && (
                  <div className="aspect-video relative">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}

                {item.type === 'video' && (
                  <div className="aspect-video relative">
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      controls
                    />
                  </div>
                )}

                {item.type === 'audio' && (
                  <div className="aspect-video bg-purple-900/30 flex items-center justify-center">
                    <button
                      onClick={() => toggleAudioPlayback(item.url)}
                      className="p-6 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      {currentAudio === item.url && isPlaying ? (
                        <Pause className="h-8 w-8 text-white" />
                      ) : (
                        <Play className="h-8 w-8 text-white" />
                      )}
                    </button>
                  </div>
                )}

                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-400">
                        {events.find(e => e.id === item.eventId)?.name}
                      </p>
                      <p className="text-sm text-gray-400">{item.uploadDate}</p>
                    </div>
                    <button
                      onClick={() => deleteMediaItem(item.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hidden audio player for audio files */}
        {currentAudio && (
          <audio
            id="audio-player"
            src={currentAudio}
            autoPlay
            onEnded={() => {
              setIsPlaying(false);
              setCurrentAudio(null);
            }}
            className="hidden"
          />
        )}
      </div>
    </main>
  );
}