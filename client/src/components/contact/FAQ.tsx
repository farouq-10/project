import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useFAQ } from '../../hooks/useFAQ';

const faqs = [
  {
    question: "How quickly can I expect a response?",
    answer: "We typically respond to all inquiries within 24 hours during business days."
  },
  {
    question: "What information should I include in my message?",
    answer: "Please include as much relevant detail as possible about your inquiry, including any specific event details, dates, or requirements."
  },
  {
    question: "Do you offer emergency support?",
    answer: "Yes, we provide emergency support for ongoing events. Premium customers have access to 24/7 support."
  }
];

export function FAQ() {
  const { activeIndex, toggleFAQ } = useFAQ();

  return (
    <section className="py-16">
      <h2 className="text-2xl font-semibold text-white mb-8 text-center">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="backdrop-blur-sm bg-purple-950/40 rounded-xl border border-purple-800/50"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span className="font-medium text-white">{faq.question}</span>
              {activeIndex === index ? (
                <Minus className="h-5 w-5 text-pink-500" />
              ) : (
                <Plus className="h-5 w-5 text-pink-500" />
              )}
            </button>
            {activeIndex === index && (
              <div className="px-4 pb-4 text-gray-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}