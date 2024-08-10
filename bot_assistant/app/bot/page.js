'use client';
import { Box, Stack, TextField, Button, Typography, AppBar, Toolbar, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, Rating, DialogActions } from "@mui/material";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Chatbot() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('en'); // Default language is English
  const [rating, setRating] = useState(0); // State for star rating
  const [review, setReview] = useState(''); // State for review text
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility

  // Initial greeting message
  const initialGreeting = {
    role: 'assistant',
    content: 'Hi there! I am your personal travel assistant. How can I help you today?'
  };

  useEffect(() => {
    // Append the initial greeting message only if it's not already present
    if (messages.length === 0) {
      setMessages([initialGreeting]);
    }
  }, []);

  const translateMessage = async (text, targetLanguage) => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, targetLanguage }),
      });
      const data = await response.json();
      return data.translatedText || text;
    } catch (error) {
      console.error('Error translating message:', error);
      return text;
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const currentMessage = message; // Store the current message

    // Append user message
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: 'user',
        content: currentMessage
      }
    ]);

    // Clear the input field
    setMessage('');

    // Fetch response from chat API
    const chatResponse = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages, { role: 'user', content: currentMessage }]),
    });

    const reader = chatResponse.body.getReader();
    const decoder = new TextDecoder();
    let result = '';

    reader.read().then(function processText({ done, value }) {
      if (done) {
        // Update assistant's response after reading is complete
        const translatedResponse = async () => {
          const translation = await translateMessage(result, language);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: 'assistant',
              content: translation // Use plain text for content
            }
          ]);
        };
        translatedResponse(); // Call the function to translate and update the message
        return result;
      }

      const text = decoder.decode(value || new Uint8Array(), { stream: true });
      result += text;

      return reader.read().then(processText);
    });
  };

  // Function to handle dialog open
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  // Function to handle dialog close
  const handleClose = () => {
    setOpenDialog(false);
  };

  // Function to submit rating
  const handleSubmit = () => {
    console.log('Rating:', rating);
    console.log('Review:', review);
    // Add any additional logic for handling submitted data here
    setOpenDialog(false);
    setRating(0);
    setReview('');
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
            <Button variant="text" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }} onClick={() => router.push('/')}>
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
          backgroundSize: 'fill',
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
        backgroundColor={'rgba(255, 255, 255, 0.6)'}
        borderRadius={4}
        position="relative"
        zIndex={1}
      >
        {/* Language selection */}
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            label="Language"
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="fr">French</MenuItem>
            <MenuItem value="de">German</MenuItem>
            <MenuItem value="al">Albanian</MenuItem>
            {/* Add more languages as needed */}
          </Select>
        </FormControl>
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
                  message.role === 'assistant' ? 'primary.main' : 'rgba(230, 155, 155)'
                }
                color='white'
                borderRadius={10}
                p={2}
                maxWidth='100%'
                sx={{ wordBreak: 'break-word' }}
              >
                {message.content.split('\n').map((paragraph, index) => (
                  <Typography key={index} variant="body1" paragraph>
                    {paragraph}
                  </Typography>
                ))}
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
            sx={{ borderRadius: 2 }}
            onClick={sendMessage}
          >
            Send
          </Button>
        </Stack>
      </Stack>

      {/* Rating Button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 2
        }}
      >
        <Button
          variant='contained'
          color='primary'
          onClick={handleClickOpen}
        >
          Rate Me
        </Button>
      </Box>

      {/* Rating Dialog */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Rate Us</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
            />
            <TextField
              label="Write a review"
              multiline
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
