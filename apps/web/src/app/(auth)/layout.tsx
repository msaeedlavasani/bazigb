import React from 'react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-900 text-white">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
              BaziGB
            </h1>
          </Link>
          <p className="mt-2 text-slate-400 font-medium">Online Board Game Platform</p>
        </header>
        {children}
      </div>
    </main>
  );
}
