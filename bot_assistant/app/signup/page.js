// app/signup/page.js
'use client'
import React, { useState } from 'react';
import { Box, Stack, TextField, Button, Typography, Alert } from "@mui/material";
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
        border={'1px solid lightgrey'}
        p={4}
        borderRadius={4}
      >
        <Typography variant="h5">Sign Up</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignUp}
          fullWidth
        >
          Sign Up
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleGoogleSignUp}
          fullWidth
        >
          Sign Up with Google
        </Button>
      </Stack>
    </Box>
  );
}
