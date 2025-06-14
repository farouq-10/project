import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ to, children, className = '' }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`block px-3 py-2 transition-colors duration-200
        ${isActive ? 'text-purple-400' : 'text-white hover:text-purple-400'}
        ${isActive ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-400 after:rounded-full' : ''}
        ${className}
      `}
    >
      {children}
    </Link>
  );
}