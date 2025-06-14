import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { TeamMember } from '../../types/team';

const team: TeamMember[] = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    bio: 'With over 15 years in event management, Sarah leads EventEase with a vision for innovation and excellence.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    bio: 'A tech veteran with expertise in scalable platforms, Michael drives our technological advancement.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  }
];

export function TeamSection() {
  return (
    <section className="py-24 px-4 bg-purple-950/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-300">
            The passionate individuals behind EventEase
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div 
              key={member.name}
              className="backdrop-blur-sm bg-purple-950/40 rounded-xl border border-purple-800/50 overflow-hidden group"
            >
              <div className="aspect-square relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 to-transparent" />
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-pink-500">{member.role}</p>
                </div>
                
                <p className="text-gray-300">{member.bio}</p>
                
                <div className="flex gap-4">
                  <a href={member.social.linkedin} className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={member.social.twitter} className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href={member.social.github} className="text-gray-400 hover:text-white transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}