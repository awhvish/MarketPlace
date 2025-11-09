'use client';

import React from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/10 p-8 rounded-lg backdrop-blur-sm">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-center text-sm text-gray-300">
              {subtitle}
            </p>
          )}
        </div>
        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export function AuthFormDivider() {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-900 text-gray-300">Or continue with</span>
        </div>
      </div>
    </div>
  );
}

export function AuthFormLink({ href, label, text }: { href: string; label: string; text: string }) {
  return (
    <div className="mt-4 text-center">
      <Link
        href={href}
        className="text-sm text-gray-300 hover:text-white transition-colors"
        aria-label={label}
      >
        {text}
      </Link>
    </div>
  );
}