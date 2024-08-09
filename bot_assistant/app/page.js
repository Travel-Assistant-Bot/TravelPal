// app/page.js
'use client'
import { Box, Stack, Button } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

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
        <Button
          variant='contained'
          color='primary'
          onClick={() => router.push('/login')}
        >
          Login
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => router.push('/signup')}
        >
          Sign Up
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => router.push('/bot')}
        >
          Chat
        </Button>
      </Stack>
    </Box>
  );
}
