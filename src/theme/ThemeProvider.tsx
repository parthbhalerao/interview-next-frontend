'use client';
import * as React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme from './index';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MuiThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </MuiThemeProvider>
  );
} 