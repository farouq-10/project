import React from 'react';
import { LegalHeader } from '../components/legal/LegalHeader';
import { TableOfContents } from '../components/legal/TableOfContents';
import { LegalSection } from '../components/legal/LegalSection';

const sections = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'information-collection', title: '2. Information We Collect' },
  { id: 'information-use', title: '3. How We Use Your Information' },
  { id: 'information-sharing', title: '4. Information Sharing' },
  { id: 'data-security', title: '5. Data Security' },
  { id: 'user-rights', title: '6. Your Rights' },
  { id: 'cookies', title: '7. Cookies and Tracking' },
  { id: 'children', title: '8. Children\'s Privacy' },
  { id: 'updates', title: '9. Updates to This Policy' },
  { id: 'contact', title: '10. Contact Us' }
];

export function PrivacyPolicyPage() {
  return (
    <main className="flex-1 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <LegalHeader 
          title="Privacy Policy" 
          lastUpdated="March 14, 2024"
        />
        
        <TableOfContents sections={sections} />

        <div className="space-y-12">
          <LegalSection id="introduction" title="1. Introduction">
            <p className="text-gray-300">
              At EventEase, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
          </LegalSection>

          <LegalSection id="information-collection" title="2. Information We Collect">
            <p className="text-gray-300">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-4">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Payment information</li>
              <li>Event details and preferences</li>
              <li>Communications with us</li>
            </ul>
          </LegalSection>

          {/* Additional sections... */}
          
          <LegalSection id="contact" title="10. Contact Us">
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 text-gray-300">
              <p>Email: privacy@eventease.com</p>
              <p>Address: 123 Event Street, San Francisco, CA 94105</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </LegalSection>
        </div>
      </div>
    </main>
  );
}