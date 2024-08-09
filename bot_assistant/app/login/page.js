// app/login/page.js
'use client'
import { useState } from 'react';
import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';

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
      router.push('/chat'); // Redirect to chat page after successful login
    } catch (err) {
      setError(err.message);
      console.error('Error logging in:', err);
    }
  };

  return (
    <Box
      width='100vw'
      height='100vh'
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        spacing={3}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4">Login</Typography>
        <TextField
          label='Email'
          type='email'
          variant='outlined'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label='Password'
          type='password'
          variant='outlined'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          variant='contained'
          color='primary'
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => router.push('/')}
        >
          Back
        </Button>
      </Stack>
    </Box>
  );
}
