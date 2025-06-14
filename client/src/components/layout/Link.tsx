import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, children }: LinkProps) {
  return (
    <a
      href={href}
      className="hover:text-purple-400 transition-colors duration-200"
    >
      {children}
    </a>
  );
}