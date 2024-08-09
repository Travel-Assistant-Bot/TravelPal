'use client'
import { Box, Stack,TextField,Button } from "@mui/material";
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {

  const router = useRouter()
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: 'Hi there! I am your personal travel assistant. How can I help you today?'
  }])

  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    setMessage('')
    setMessages((messages)=>[
      ...messages,
      {
        role: 'user',
        content: message
      },
      {
        role: 'assistant',
        content: ''
      }
    ])
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages,{role: 'user', content: message}]),
       
      }).then(async(res) => {
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let result = ''
        return reader.read().then(function proccessText({done, value}) {
          if (done) {
            return result
          }
          const text = decoder.decode(value || new Int8Array(),{stream:true})
          
          setMessages((messages) => {
            
            let lastMessage = messages[messages.length - 1]
            let  otherMessages = messages.slice(0, messages.length - 1) 
            
            return [
              ...otherMessages,
              {
                ...lastMessage,
                content: lastMessage.content + text
              }
            ]
          
        })
        return reader.read().then(proccessText)
      })

    })
  }

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
          width='600px'
          height='800px'
          p={2}
          spacing={3}
          direction="column"
          justifyContent="center"
          alignItems="center"
          border={'2px solid black'}
          >
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
                    direction="column"
                    justifyContent={
                      message.role === 'assistant' ? 'flex-start' : 'flex-end'
                    }
                    >                
                      <Box bgcolor={
                        message.role === 'assistant' ? 'primary.main'
                         : 'secondary.main'
                      }
                      color='white'
                      borderRadius={16} 
                      p={3}
                      >
                        {message.content}

                      </Box>
                      </Box>                 
                ))}
              </Stack>
              <Stack direction='row' spacing={2} width='100%' >
                <TextField
                  label='Message'
                  flexGrow={1}
                 
                  fullWidth 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  
                  />
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    sendMessage([
                      ...messages,
                      {
                        role: 'user',
                        content: message
                      }
                    ])
                    setMessage('')
                  }}
                  >
                    Send
                  </Button>

                
              </Stack>
        </Stack>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => router.push('/')}
        >
          Back
        </Button>
  </Box>


  )

}