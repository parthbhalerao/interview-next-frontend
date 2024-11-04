'use client';
import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '@/contexts/AuthContext';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AuthProvider>
            <CssBaseline />
            {props.children}
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
