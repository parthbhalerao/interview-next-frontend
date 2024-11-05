import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { styled } from '@mui/material/styles';

import ForgotPassword from './ForgotPassword';
import { SitemarkIcon } from '@/theme/components/icons/SitemarkIcon';
import { GoogleIcon, LinkedInIcon } from '@/theme/components/icons/CustomBrandIcons';
import { useSignIn } from '@/hooks/useSignIn';
import { useRouter } from 'next/navigation';
import { useSubscription } from '@/hooks/useSubscription';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignInCard() {
  const router = useRouter();
  const { subscribe } = useSubscription();
  const { error, handleSignIn } = useSignIn();
  const [open, setOpen] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState({
    email: { error: false, message: '' },
    password: { error: false, message: '' }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const pendingSubscription = localStorage.getItem('pendingSubscription');
    
    try {
      const result = await handleSignIn({
        email: formData.get('email') as string,
        password: formData.get('password') as string
      });
      
      if (result) {
        if (pendingSubscription) {
          try {
            await subscribe(pendingSubscription);
            return;
          } catch (error) {
            console.error('Subscription error:', error);
            localStorage.removeItem('pendingSubscription');
            router.push('/dashboard');
          }
        } else {
          router.push('/dashboard');
        }
      } else {
        console.error('Sign in failed');
        setValidationErrors({
          ...validationErrors,
          email: { error: true, message: 'Invalid credentials' }
        });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setValidationErrors({
        email: { error: true, message: 'Invalid email or password' },
        password: { error: true, message: 'Invalid email or password' }
      });
    }
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={validationErrors.email.error}
            helperText={validationErrors.email.message}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={validationErrors.email.error ? 'error' : 'primary'}
            sx={{ ariaLabel: 'email' }}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'baseline' }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={validationErrors.password.error}
            helperText={validationErrors.password.message}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={validationErrors.password.error ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button type="submit" fullWidth variant="contained">
          Sign in
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <span>
            <Link
              href="/auth/signup"
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Sign up
            </Link>
          </span>
        </Typography>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Divider>or</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with Google')}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign in with LinkedIn')}
          startIcon={<LinkedInIcon />}
        >
          Sign in with LinkedIn
        </Button>
      </Box>
    </Card>
  );
}
