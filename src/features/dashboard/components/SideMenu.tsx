import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from '@/features/dashboard/components/MenuContent';
import OptionsMenu from '@/features/dashboard/components/OptionsMenu';
import { useCustomer } from '@/hooks/useCustomer';
import { useAuth } from '@/contexts/AuthContext';
import Skeleton from '@mui/material/Skeleton';
import { SitemarkIcon } from '@/theme/components/icons/SitemarkIcon';
import { useSubscription } from '@/hooks/useSubscription';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

const LoadingState = () => (
  <Stack direction="row" sx={{ p: 2, gap: 1, alignItems: 'center' }}>
    <Skeleton variant="circular" width={36} height={36} />
    <Box sx={{ mr: 'auto', width: '100%' }}>
      <Skeleton variant="text" width="70%" height={20} />
      <Skeleton variant="text" width="40%" height={16} />
    </Box>
  </Stack>
);

export default function SideMenu() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { customer, loading: customerLoading, error, fetchCurrentCustomer } = useCustomer();
  const { currentPlan, loading: subscriptionLoading } = useSubscription();

  const isLoading = authLoading || customerLoading || subscriptionLoading;

  React.useEffect(() => {
    if (isAuthenticated && !authLoading && !customer) {
      fetchCurrentCustomer().catch(error => {
        console.error('Error fetching customer:', error);
      });
    }
  }, [isAuthenticated, authLoading, customer, fetchCurrentCustomer]);

  if (error) {
    console.error('Customer loading error:', error);
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
          justifyContent: 'left',
          alignItems: 'center'
        }}
      >
        <SitemarkIcon sx={{ width: 100, height: 100 }} />
      </Box>
      <Divider />
      <MenuContent />
      {/* <CardAlert /> */}
      {isLoading ? (
        <LoadingState />
      ) : (
        <Stack
          direction="row"
          sx={{
            p: 2,
            gap: 1,
            alignItems: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Avatar
            sizes="small"
            alt={customer ? `${customer.user.first_name} ${customer.user.last_name}` : 'User'}
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ mr: 'auto' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
              {customer ? `${customer.user.first_name} ${customer.user.last_name}` : 'User'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {customer?.user.email || 'No email available'}
            </Typography>
            <Divider sx={{ my: 0.5 }} />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {currentPlan ? `${currentPlan.title} Plan` : 'No active plan'}
            </Typography>
          </Box>
          <OptionsMenu />
        </Stack>
      )}
      <Typography variant="caption" sx={{ color: 'error.main' }}>
        {error ? 'Error loading profile' : ''}
      </Typography>
    </Drawer>
  );
}
