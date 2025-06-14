import React from 'react';

interface Section {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  return (
    <nav className="mb-12 backdrop-blur-sm bg-purple-950/40 p-6 rounded-xl border border-purple-800/50">
      <h2 className="text-xl font-semibold text-white mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}