import React from 'react';

interface Service {
  id: string;
  title: string;
}

interface ServicesSidebarProps {
  services: Service[];
  activeService: string;
  onServiceSelect: (serviceId: string) => void;
}

export function ServicesSidebar({ services, activeService, onServiceSelect }: ServicesSidebarProps) {
  return (
    <aside className="w-64 bg-purple-950/50 backdrop-blur-sm border-r border-purple-800/50">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white mb-6">WHAT YOU WANT</h2>
        <nav className="space-y-2">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => onServiceSelect(service.id)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeService === service.id
                  ? 'bg-pink-500 text-white'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              {service.title}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}