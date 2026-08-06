import React from 'react';
import './globals.css';

export const metadata = {
  title: 'BaziGB',
  description: 'Online Board Game Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
