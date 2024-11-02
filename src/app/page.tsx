'use client';

import * as React from 'react';
import MarketingPage from '@/views/landing/MarketingPage';
import { unstable_noStore as noStore } from 'next/cache';

export default function Home() {
  noStore();
  return <MarketingPage />;
}
