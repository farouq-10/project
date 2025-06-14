import React from 'react';
import { Users, Calendar, Award, Building2 } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '50K+',
    label: 'Active Users',
    color: 'text-blue-400'
  },
  {
    icon: Calendar,
    value: '100K+',
    label: 'Events Hosted',
    color: 'text-green-400'
  },
  {
    icon: Award,
    value: '15+',
    label: 'Industry Awards',
    color: 'text-yellow-400'
  },
  {
    icon: Building2,
    value: '1000+',
    label: 'Venue Partners',
    color: 'text-pink-400'
  }
];

export function Achievements() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Achievements</h2>
          <p className="text-xl text-gray-300">
            Milestones that mark our journey of success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div 
              key={stat.label}
              className="backdrop-blur-sm bg-purple-950/40 p-8 rounded-xl border border-purple-800/50 text-center group hover:border-pink-500/50 transition-all"
            >
              <stat.icon className={`h-8 w-8 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform`} />
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}