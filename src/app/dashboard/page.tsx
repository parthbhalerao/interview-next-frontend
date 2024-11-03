'use client';

import * as React from 'react';
import DashboardPage from '@/views/dashboard/DashboardPage';
import { unstable_noStore as noStore } from 'next/cache';

export default function Dashboard() {
  noStore();
  return <DashboardPage />;
}
