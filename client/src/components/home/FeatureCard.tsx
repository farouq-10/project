import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export function FeatureCard({ icon: Icon, title, description, color }: FeatureCardProps) {
  return (
    <div className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50 hover:border-pink-500/50 transition-colors group">
      <div className="mb-4">
        <Icon className={`h-8 w-8 ${color} group-hover:scale-110 transition-transform`} />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}