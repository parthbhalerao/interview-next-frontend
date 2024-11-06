import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '@/features/dashboard/components/AppNavbar';
import Header from '@/features/dashboard/components/Header';
import MainGrid from '@/features/dashboard/components/MainGrid';
import SideMenu from '@/features/dashboard/components/SideMenu';
import { ThemeProvider } from '@/theme/exports';
import Copyright from '@/theme/components/Copyright';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../../features/dashboard/theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

// Add this interface above the component definition
interface DashboardPageProps {
  contentComponent?: string;
  disableCustomTheme?: boolean;
}

// Update the component to use the interface
export default function DashboardPage({ contentComponent, disableCustomTheme }: DashboardPageProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider>
        <CssBaseline enableColorScheme />
        <Box sx={{ display: 'flex' }}>
          <SideMenu />
          <AppNavbar />
          {/* Main content */}
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                : alpha(theme.palette.background.default, 1),
              overflow: 'auto',
            })}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: 'center',
                mx: 3,
                pb: 5,
                mt: { xs: 8, md: 0 },
              }}
            >
              <Header />
              <MainGrid />
              <Copyright sx={{ mt: 'auto', py: 3 }} />
            </Stack>
          </Box>
        </Box>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
