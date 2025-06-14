import React from 'react';
import { ContactHeader } from '../components/contact/ContactHeader';
import { ContactForm } from '../components/contact/ContactForm';
import { ContactInfo } from '../components/contact/ContactInfo';
import { FAQ } from '../components/contact/FAQ';

export function ContactPage() {
  return (
    <main className="flex-1 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <ContactHeader />
        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          <ContactForm />
          <ContactInfo />
        </div>
        <FAQ />
      </div>
    </main>
  );
}