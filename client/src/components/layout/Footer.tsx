import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const sections = [
    {
      title: 'Useful links',
      links: [
        { text: 'About Us', href: '/about' },
        { text: 'Privacy Policy', href: '/privacy' },
        { text: 'Terms of Service', href: '/terms' },
      ],
    },
    {
      title: 'Social Media',
      links: [
        { text: 'Facebook', href: 'https://facebook.com' },
        { text: 'Twitter', href: 'https://twitter.com' },
        { text: 'Instagram', href: 'https://instagram.com' },
      ],
    },
    {
      title: 'Need Help?',
      links: [
        { text: 'FAQs', href: '/faq' },
        { text: 'Support', href: '/support' },
        { text: 'Contact Us', href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-gray-900/80 backdrop-blur-xl text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xl font-semibold mb-4">
              {section.title.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? 'text-purple-400' : ''}>
                  {i === 1 ? ` ${word} ` : word}
                </span>
              ))}
            </h3>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.text} className="flex items-center space-x-2">
                  <ChevronRight className="h-4 w-4 text-purple-400" />
                  {link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      {link.text}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      {link.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}