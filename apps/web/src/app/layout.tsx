import React from 'react';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import ThemeRegistry from './ThemeRegistry';
import AppShell from './AppShell';

export const metadata = {
  title: 'BaziGB — بازی جیبی',
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
        <ThemeRegistry>
          <AuthProvider>
            <AppShell>{children}</AppShell>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
