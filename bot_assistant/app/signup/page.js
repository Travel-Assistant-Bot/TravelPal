// app/signup/page.js
'use client'
import React, { useState } from 'react';
import { Box, Stack, TextField, Button, Typography, Alert, AppBar, Toolbar } from "@mui/material";
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword } from '../firebase';
import { useRouter } from 'next/navigation';


export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async () => {
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Sign-up successful!');
      setTimeout(() => {
        router.push('/bot');
      }, 2000); // Redirect to chat after 2 seconds
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setSuccess('Sign-up with Google successful!');
      setTimeout(() => {
        router.push('/bot');
      }, 2000); // Redirect to chat after 2 seconds
    } catch (error) {
      setError(error.message);
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
          <Toolbar>
            <Typography  variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
              
              <Button sx={{ flecxGrow: 1, color: 'white' }} onClick={() => router.push('/')}>
             Back
            </Button> 
            </Typography>
            <Button sx={{ color: 'white' }} onClick={() => router.push('/login')}>
             Log In
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
          color: '#0b5394 '
        }}
      >
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
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
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />
        </Stack>
        <Button
          variant="contained"
          onClick={handleSignUp}
          sx={{ mt: 2, backgroundColor: '#2196f3', '&:hover': { backgroundColor: '#1976d2' } }}
        >
          Sign Up
        </Button>
        <Button
          variant="contained"
          onClick={handleGoogleSignUp}
          sx={{ mt: 2, backgroundColor: '#f44336', '&:hover': { backgroundColor: '#c62828' } }}
        >
          Sign Up with Google
        </Button>
      </Box>
    </Box>
  );
}
