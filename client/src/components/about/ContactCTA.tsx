import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

export function ContactCTA() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your Events?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Get in touch with our team and discover how EventEase can help you create unforgettable experiences.
        </p>
        <Link
          to="/contact"
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-purple-500 hover:to-pink-400 transition-all"
        >
          <Mail className="h-6 w-6" />
          <span className="font-medium">Contact Us</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}