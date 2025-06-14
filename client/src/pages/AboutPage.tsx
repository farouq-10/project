import React from 'react';
import { CompanyOverview } from '../components/about/CompanyOverview';
import { TeamSection } from '../components/about/TeamSection';
import { Achievements } from '../components/about/Achievements';
import { Testimonials } from '../components/about/Testimonials';
import { ContactCTA } from '../components/about/ContactCTA';

export function AboutPage() {
  return (
    <main className="flex-1">
      <CompanyOverview />
      <TeamSection />
      <Achievements />
      <Testimonials />
      <ContactCTA />
    </main>
  );
}