import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@/theme/exports';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { DashboardProvider } from '@/contexts/DashboardContext';
import DashboardContent from '@/features/dashboard/components/DashboardContent';

interface DashboardPageProps {
  contentComponent?: string;
  disableCustomTheme?: boolean;
}

export default function DashboardPage({ contentComponent, disableCustomTheme }: DashboardPageProps) {
  return (
    <DashboardProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider>
          <CssBaseline enableColorScheme />
          <DashboardLayout>
            <DashboardContent />
          </DashboardLayout>
        </ThemeProvider>
      </LocalizationProvider>
    </DashboardProvider>
  );
}
