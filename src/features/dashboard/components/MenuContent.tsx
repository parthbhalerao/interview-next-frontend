import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import NotesIcon from '@mui/icons-material/Notes';
import { DashboardView, useDashboard } from '@/contexts/DashboardContext';

export default function MenuContent() {
  const { currentView, setCurrentView } = useDashboard();

  const mainListItems = [
    { id: 'home', text: 'Dashboard', icon: <HomeRoundedIcon /> },
    { id: 'interviews', text: 'Mock Interviews', icon: <PeopleRoundedIcon /> },
    { id: 'insights', text: 'Insights', icon: <InsightsRoundedIcon /> },
    { id: 'questions', text: 'Questions', icon: <AssignmentRoundedIcon /> },
    { id: 'notes', text: 'Notes', icon: <NotesIcon /> },
  ];

  const secondaryListItems = [
    { text: 'About', icon: <InfoRoundedIcon /> },
    { text: 'Feedback', icon: <HelpRoundedIcon /> },
  ];

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
              selected={currentView === item.id}
              onClick={() => setCurrentView(item.id as DashboardView)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
