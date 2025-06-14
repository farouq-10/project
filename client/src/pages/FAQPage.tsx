import React, { useState } from 'react';
import { SearchBar } from '../components/support/SearchBar';
import { FAQCategory } from '../components/support/FAQCategory';
import { faqCategories } from '../data/faqData';

export function FAQPage() {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
    setExpandedItem(null);
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchQuery) ||
      item.answer.toLowerCase().includes(searchQuery)
    )
  })).filter(category => category.items.length > 0);

  return (
    <main className="flex-1 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300">
            Find answers to common questions about our services
          </p>
        </div>

        <div className="mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="space-y-12">
          {filteredCategories.map((category, index) => (
            <FAQCategory
              key={index}
              title={category.title}
              items={category.items}
              expandedItem={expandedItem}
              onItemClick={setExpandedItem}
            />
          ))}
        </div>
      </div>
    </main>
  );
}