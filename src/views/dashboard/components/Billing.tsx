import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useSubscription } from '@/hooks/useSubscription';

export default function Billing() {
  const { plans, currentPlan, loading, error, subscribe } = useSubscription();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Subscription Details
      </Typography>
      
      {currentPlan && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Current Plan: {currentPlan.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              ${currentPlan.price}/{currentPlan.interval}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Description
              </Typography>
              <Typography variant="body2">
                {currentPlan.description?.[0] || 'No description available'}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Available Plans
      </Typography>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {Array.isArray(plans) && plans.length > 0 ? plans.slice(0, 3).map((plan) => (
          <Card 
            key={plan.id}
            sx={{ 
              border: currentPlan?.id === plan.id ? '2px solid' : '1px solid',
              borderColor: currentPlan?.id === plan.id ? 'primary.main' : 'divider'
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {plan.title}
              </Typography>
              <Typography variant="h5" gutterBottom>
                ${plan.price}/{plan.interval}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {plan.description?.[0] || 'No description available'}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                disabled={currentPlan?.id === plan.id}
                onClick={() => subscribe(plan.id)}
              >
                {currentPlan?.id === plan.id ? 'Current Plan' : 'Switch Plan'}
              </Button>
            </CardContent>
          </Card>
        )) : (
          <Typography>No plans available</Typography>
        )}
      </Box>
    </Box>
  );
} 