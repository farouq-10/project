import React from 'react';

interface LegalSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
      <div className="prose prose-invert max-w-none">
        {children}
      </div>
    </section>
  );
}