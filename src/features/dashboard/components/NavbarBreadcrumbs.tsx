import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useDashboard } from '@/contexts/DashboardContext';

export default function NavbarBreadcrumbs() {
  const { currentView } = useDashboard();

  const getViewTitle = (view: string) => {
    switch (view) {
      case 'home':
        return 'Home';
      case 'interviews':
        return 'Mock Interviews';
      case 'insights':
        return 'Insights';
      case 'questions':
        return 'Questions';
      case 'notes':
        return 'Notes';
      default:
        return 'Home';
    }
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Typography color="text.secondary">Dashboard</Typography>
      <Typography color="text.primary">{getViewTitle(currentView)}</Typography>
    </Breadcrumbs>
  );
}
