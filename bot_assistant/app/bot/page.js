'use client'
import { Box, Stack, TextField, Button, Typography, AppBar, Toolbar } from "@mui/material";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CssBaseline from '@mui/material/CssBaseline';

export default function Chatbot() {
  const router = useRouter();
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: 'Hi there! I am your personal travel assistant. How can I help you today?'
  }]);

  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    setMessage('');
    setMessages((messages) => [
      ...messages,
      {
        role: 'user',
        content: message
      },
      {
        role: 'assistant',
        content: ''
      }
    ]);
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = '';
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), { stream: true });

        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);

          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text
            }
          ];
        });

        return reader.read().then(processText);
      });
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        py: 4,
        position: 'relative',
      }}
    >
      {/* Transparent AppBar */}
      <Box sx={{ position: 'absolute', width: '100%', zIndex: 1 }}>
        <AppBar position="static" elevation={0} sx={{ backgroundColor: 'transparent' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
              TravelPal
            </Typography>
            <Button variant= "text " sx={{ color: 'white',fontWeight: 'bold', fontSize: '1rem' }} onClick={() => router.push('/')}>
             Back
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Colorful Ribbons */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          background: 'linear-gradient(to top right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(https://pics.craiyon.com/2023-07-29/6a6255df5cd941faab3817002e094104.webp)',
          backgroundSize: 'fi',


        }}
      />

      {/* Main chat container */}
      <Stack
        width='600px'
        height='800px'
        p={2}
        spacing={3}
        direction="column"
        justifyContent="center"
        alignItems="center"
        border={'2px solid black'}
        backgroundColor = {'rgba(255, 255, 255, 0.6)'}
        borderRadius={4}
        position="relative"
        zIndex={1}
       
      >
        {/* Messages container */}
        <Stack
          p={2}
          spacing={3}
          overflow={'auto'}
          flexGrow={1}
          width={'100%'}

        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display={'flex'}
              p={2}
              spacing={3}
              flexDirection={message.role === 'assistant' ? 'column' : 'column-reverse'}
              alignItems={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              <Box
                bgcolor={
                  message.role === 'assistant' ? 'primary.main' : 'secondary.main'
                }
                color='white'
                borderRadius={10}
                p={2}
                maxWidth='100%'
                wordBreak='break-word'
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction='row' spacing={2} width='100%'>
          <TextField
            label='Message'
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            borderRadius={'26'} 
            onClick={sendMessage}
          >
            Send
          </Button>
        </Stack>
      </Stack>
      
    </Box>
  );
}
