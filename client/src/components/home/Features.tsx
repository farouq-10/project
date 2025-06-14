import React from 'react';
import { Calendar, Users, Trophy, Sparkles } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export function Features() {
  const features = [
    {
      icon: Calendar,
      title: "Event Planning",
      description: "Seamlessly plan and organize events of any size with our intuitive tools.",
      color: "text-blue-400"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together efficiently with real-time updates and shared workspaces.",
      color: "text-green-400"
    },
    {
      icon: Trophy,
      title: "Success Tracking",
      description: "Monitor your event's success with comprehensive analytics and insights.",
      color: "text-yellow-400"
    },
    {
      icon: Sparkles,
      title: "Custom Solutions",
      description: "Tailor your event experience with customizable features and integrations.",
      color: "text-pink-400"
    }
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transform Your Events with <span className="text-pink-500">EventEase</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the perfect blend of powerful features and intuitive design, making event planning a breeze.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={feature.title} className="animate-on-scroll" style={{ animationDelay: `${index * 0.2}s` }}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}