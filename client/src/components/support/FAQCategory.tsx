import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../../types/support';

interface FAQCategoryProps {
  title: string;
  items: FAQItem[];
  expandedItem: number | null;
  onItemClick: (index: number) => void;
}

export function FAQCategory({ title, items, expandedItem, onItemClick }: FAQCategoryProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="backdrop-blur-sm bg-purple-950/40 rounded-xl border border-purple-800/50 overflow-hidden"
          >
            <button
              onClick={() => onItemClick(index)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span className="font-medium text-white">{item.question}</span>
              {expandedItem === index ? (
                <ChevronUp className="h-5 w-5 text-purple-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-purple-400" />
              )}
            </button>
            {expandedItem === index && (
              <div className="px-4 pb-4">
                <p className="text-gray-300">{item.answer}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-400">Was this helpful?</div>
                  <div className="space-x-2">
                    <button className="px-3 py-1 text-sm bg-white/10 rounded-md text-white hover:bg-white/20">
                      Yes
                    </button>
                    <button className="px-3 py-1 text-sm bg-white/10 rounded-md text-white hover:bg-white/20">
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}