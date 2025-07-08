'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils/cn';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'New Deal', href: '/new-deal' },
  { name: 'Deals', href: '/deals' },
  { name: 'Quotes', href: '/quotes' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with Animation */}
          <div className="flex items-center">
            <Link href="/" className="group flex items-center space-x-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300 group-hover:animate-pulse"></div>
                <div className="relative bg-white px-3 py-2 rounded-lg">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Broker
                  </span>
                  <span className="text-xl font-bold text-gray-800 ml-1">
                    Box
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Floating Tabs */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1 bg-gray-100/50 backdrop-blur-sm rounded-full p-1 border border-gray-200/50">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-in-out',
                      isActive
                        ? 'text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    )}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg animate-pulse"></div>
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 bg-white/90 backdrop-blur-sm rounded-lg mt-2 border border-gray-200/50 shadow-lg">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'block px-3 py-2 rounded-md text-base font-medium transition-all duration-200',
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 