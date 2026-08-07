import React from 'react';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'BaziG3 — بازی جیبی',
  description: 'همه‌ی بازی‌ها، توی جیبت. پلتفرم آنلاین بازی‌های رومیزی و استراتژیک.',
  icons: {
    icon: '/brand/logo-256.webp',
    apple: '/brand/logo-256.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
