import React from 'react';

interface LegalHeaderProps {
  title: string;
  lastUpdated: string;
}

export function LegalHeader({ title, lastUpdated }: LegalHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-gray-300">
        Last Updated: {lastUpdated}
      </p>
    </div>
  );
}