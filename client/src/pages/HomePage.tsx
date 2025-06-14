import React from 'react';
import { Hero } from '../components/home/Hero';
import { CreateEventSection } from '../components/home/CreateEventSection';
import { MyEventsSection } from '../components/home/MyEventsSection';
import { BusinessSection } from '../components/home/BusinessSection';
import { Features } from '../components/home/Features';
import { Showcase } from '../components/home/Showcase';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/animations.css';

export function HomePage() {
  useScrollAnimation();

  return (
    <main className="flex-1">
      <Hero />
      <div className="animate-on-scroll">
        <CreateEventSection />
      </div>
      <div className="animate-on-scroll">
        <Showcase />
      </div>
      <div className="animate-on-scroll">
        <MyEventsSection />
      </div>
      <div className="animate-on-scroll">
        <BusinessSection />
      </div>
      <div className="animate-on-scroll">
        <Features />
      </div>
    </main>
  );
}