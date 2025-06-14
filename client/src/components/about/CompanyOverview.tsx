import React from 'react';
import { Target, Heart, Zap, Trophy } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Mission',
    description: 'To revolutionize event planning by making it accessible, efficient, and enjoyable for everyone.'
  },
  {
    icon: Heart,
    title: 'Trust',
    description: 'Building lasting relationships through transparency and reliability.'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Continuously evolving our platform with cutting-edge solutions.'
  },
  {
    icon: Trophy,
    title: 'Excellence',
    description: 'Delivering exceptional experiences that exceed expectations.'
  }
];

export function CompanyOverview() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            About <span className="text-pink-500">EventEase</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Since 2020, we've been transforming the way people plan, manage, and experience events. Our platform combines innovation with simplicity to make event planning accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div 
              key={value.title}
              className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50 hover:border-pink-500/50 transition-all group"
            >
              <value.icon className="h-8 w-8 text-pink-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}