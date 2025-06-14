import React from 'react';
import { LegalHeader } from '../components/legal/LegalHeader';
import { TableOfContents } from '../components/legal/TableOfContents';
import { LegalSection } from '../components/legal/LegalSection';

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'changes', title: '2. Changes to Terms' },
  { id: 'access', title: '3. Access and Use' },
  { id: 'accounts', title: '4. User Accounts' },
  { id: 'content', title: '5. User Content' },
  { id: 'intellectual-property', title: '6. Intellectual Property' },
  { id: 'liability', title: '7. Limitation of Liability' },
  { id: 'termination', title: '8. Termination' },
  { id: 'governing-law', title: '9. Governing Law' },
  { id: 'contact', title: '10. Contact Information' }
];

export function TermsPage() {
  return (
    <main className="flex-1 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <LegalHeader 
          title="Terms of Service" 
          lastUpdated="March 14, 2024"
        />
        
        <TableOfContents sections={sections} />

        <div className="space-y-12">
          <LegalSection id="acceptance" title="1. Acceptance of Terms">
            <p className="text-gray-300">
              By accessing or using EventEase's services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </LegalSection>

          <LegalSection id="changes" title="2. Changes to Terms">
            <p className="text-gray-300">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our platform.
            </p>
          </LegalSection>

          {/* Additional sections... */}

          <LegalSection id="governing-law" title="9. Governing Law">
            <p className="text-gray-300">
              These terms are governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles.
            </p>
          </LegalSection>

          <LegalSection id="contact" title="10. Contact Information">
            <p className="text-gray-300">
              For legal inquiries regarding these Terms of Service, please contact:
            </p>
            <div className="mt-4 text-gray-300">
              <p>Legal Department</p>
              <p>EventEase Inc.</p>
              <p>123 Event Street</p>
              <p>San Francisco, CA 94105</p>
              <p>Email: legal@eventease.com</p>
            </div>
          </LegalSection>
        </div>
      </div>
    </main>
  );
}