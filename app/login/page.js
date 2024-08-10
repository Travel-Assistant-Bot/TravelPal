// app/login/page.js
'use client'
import { useState } from 'react';
import { Box, Stack, TextField, Button, Typography, Alert, AppBar, Toolbar } from "@mui/material";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';
import CssBaseline from '@mui/material/CssBaseline';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setError('');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      router.push('/bot'); // Redirect to chat page after successful login
    } catch (err) {
      setError(err.message);
      console.error('Error logging in:', err);
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(https://duagency.com/wp-content/uploads/2017/06/4_Beaches.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 4,
      }}
    >
      {/* Transparent AppBar */}
      <Box sx={{ position: 'absolute', width: '100%', zIndex: 1 }}>
        <AppBar position="static" elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <Toolbar >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            <Button sx={{ flecxGrow: 1, color: 'white' }} onClick={() => router.push('/')}>
             Back
            </Button> 
          </Typography>
           
            <Button sx={{ color: 'white' }} onClick={() => router.push('/signup')}>
             Sign Up
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '500px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 4,

          p: 4,
          mt: 30,
          textAlign: 'center',
          color : '#0b5394'
        }}
      >
        <Typography variant="h5" gutterBottom>
          Log In
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
       
        <Stack spacing={3} width='100%'>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          
        </Stack>
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{ mt: 2, backgroundColor: '#2196f3', '&:hover': { backgroundColor: '#1976d2' } }}
        > 
          Log In
        </Button>
        
      </Box>
    </Box>
  );
}
