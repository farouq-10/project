import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/support/SearchBar';
import { ContactOptions } from '../components/support/ContactOptions';
import { Book, FileText, MessageCircle } from 'lucide-react';

export function SupportPage() {
  return (
    <main className="flex-1 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            How Can We Help?
          </h1>
          <p className="text-xl text-gray-300">
            Find the support you need through our help resources
          </p>
        </div>

        <div className="mb-12">
          <SearchBar placeholder="Search our help center..." onSearch={() => {}} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link
            to="/faq"
            className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50 hover:border-purple-400/50 transition-colors"
          >
            <Book className="h-6 w-6 text-purple-400 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">FAQ</h2>
            <p className="text-gray-300">
              Browse our frequently asked questions
            </p>
          </Link>

          <Link
            to="/guides"
            className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50 hover:border-purple-400/50 transition-colors"
          >
            <FileText className="h-6 w-6 text-purple-400 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Guides</h2>
            <p className="text-gray-300">
              Step-by-step guides and tutorials
            </p>
          </Link>

          <Link
            to="/contact"
            className="backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50 hover:border-purple-400/50 transition-colors"
          >
            <MessageCircle className="h-6 w-6 text-purple-400 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Contact Us</h2>
            <p className="text-gray-300">
              Get in touch with our support team
            </p>
          </Link>
        </div>

        <ContactOptions />
      </div>
    </main>
  );
}