import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { SubscriptionPlan } from '@/services/subscriptionService';

export default function Pricing() {
  const { plans, loading, error, subscribe } = useSubscription();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleSubscribe = async (planId: string) => {
    if (!isAuthenticated) {
      localStorage.setItem('pendingSubscription', planId);
      router.push('/login');
      return;
    }

    try {
      await subscribe(planId);
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" gutterBottom>
          Choose your plan
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Select the perfect plan for your needs. Upgrade or downgrade at any time.
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
      >
        {plans.map((plan) => (  
          <Grid
            key={plan.id}
            size={{
              xs: 12,
              sm: plan.title === 'Enterprise' ? 12 : 6,
              md: 4
            }}
          >
            <Card
              sx={(theme) => ({
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                gap: 2,
                backgroundColor: theme.palette.background.paper,
                ...(plan.recommended && {
                  borderWidth: 2,
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.mode === 'light' 
                    ? theme.palette.primary[50] 
                    : theme.palette.primary[900],
                  boxShadow: theme.shadows[4],
                }),
              })}
              variant="outlined"
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 2 }}>
                  {plan.recommended && (
                    <Chip
                      icon={<AutoAwesomeIcon />}
                      label="Recommended"
                      color="primary"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  )}
                  <Typography variant="h5" component="h3" gutterBottom>
                    {plan.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography variant="h3" component="span">
                      ${plan.price}
                    </Typography>
                    <Typography variant="subtitle1" component="span">
                      /{plan.interval}
                    </Typography>
                  </Box>
                </Box>
                <Divider />
                <Box sx={{ mt: 2 }}>
                  {plan.description?.map((feature) => (
                    <Box
                      key={feature}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        py: 0.5,
                      }}
                    >
                      <CheckCircleRoundedIcon
                        sx={(theme) => ({
                          fontSize: 20,
                          color: plan.recommended
                            ? theme.palette.primary.main
                            : theme.palette.mode === 'light'
                              ? theme.palette.primary[700]
                              : theme.palette.primary[300]
                        })}
                      />
                      <Typography
                        variant="body2"
                        sx={(theme) => ({
                          color: plan.recommended
                            ? theme.palette.mode === 'light'
                              ? theme.palette.primary[900]
                              : theme.palette.primary[100]
                            : theme.palette.text.secondary
                        })}
                      >
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={plan.buttonVariant}
                  color={plan.buttonColor}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {plan.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
