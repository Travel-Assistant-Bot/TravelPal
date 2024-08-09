// // app/page.js
// 'use client'
// import { Box, Stack, Button } from "@mui/material";
// import { useRouter } from 'next/navigation';

// export default function Home() {
//   const router = useRouter();

//   return (
//     <Box
//       width='100vw'
//       height='100vh'
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       alignItems="center"
//     >
//       <Stack
//         spacing={3}
//         direction="column"
//         justifyContent="center"
//         alignItems="center"
//       >
//         <Button
//           variant='contained'
//           color='primary'
//           onClick={() => router.push('/login')}
//         >
//           Login
//         </Button>
//         <Button
//           variant='contained'
//           color='primary'
//           onClick={() => router.push('/signup')}
//         >
//           Sign Up
//         </Button>
//         <Button
//           variant='contained'
//           color='secondary'
//           onClick={() => router.push('/bot')}
//         >
//           Chat
//         </Button>
//       </Stack>
//     </Box>
//   );
// }
'use client'

import { Box, Button, Typography, Card, CardContent, CardMedia, IconButton, AppBar, Toolbar } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CssBaseline from '@mui/material/CssBaseline';


// Array of destination objects, each containing name, image URL, and description
const destinations = [
  { name: 'Paris', image: 'https://th.bing.com/th/id/OIP.0nl1b3FtAxu8FCu6O6VXygHaE8?rs=1&pid=ImgDetMain', description: 'City of Love' },
  { name: 'Tokyo', image: 'https://th.bing.com/th/id/R.454fe15d44f015688602f30815b7be74?rik=kMMIAJexrzRU2g&pid=ImgRaw&r=0', description: 'Blend of tradition and modernity' },
  { name: 'New York', image: 'https://th.bing.com/th/id/R.49f01c81add1cdcf555028ef58179fe2?rik=SlNYH0HTtMPSbQ&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fz3C4Bql.jpg&ehk=KVq5SBFLioX79H4yQp1x4wvuTMYGjI2y4BHf3BNHZ1k%3d&risl=&pid=ImgRaw&r=0', description: 'The Big Apple' },
  { name: 'Rome', image: 'https://th.bing.com/th/id/OIP.qVgeNYiS9InkFFoAY8TCewHaFg?w=1178&h=875&rs=1&pid=ImgDetMain', description: 'Eternal City' },
  { name: 'Bali', image: 'https://th.bing.com/th/id/OIP.ddxDQs3ijjp7NxfY7quCrwHaEo?rs=1&pid=ImgDetMain', description: 'Island of the Gods' },
  { name: 'Mauritius', image: 'https://wallpaperaccess.com/full/1703473.jpg', description: 'Paradise Island' },
]

export default function LandingPage() {
    // Initializing the router for navigation
    const router = useRouter()
    // State to keep track of the currently active destination card
    const [activeIndex, setActiveIndex] = useState(1)
  
   // Effect to automatically change the active destination every 5 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % destinations.length)
      }, 5000) // Change slide every 5 seconds
  
      return () => clearInterval(interval)
    }, [])
  
    // Function to navigate to the chat page
    const handleStartChat = () => {
      router.push('/bot')
    }
  
    // Function to handle manual scrolling of destination cards
    const handleScroll = (direction) => {
      if (direction === 'left') {
        setActiveIndex((prevIndex) => (prevIndex - 1 + destinations.length) % destinations.length)
      } else {
        setActiveIndex((prevIndex) => (prevIndex + 1) % destinations.length)
      }
    }

  return (
    <Box>
        {/* Transparent AppBar */}
      <Box sx={{ position: 'absolute', width: '100%', zIndex: 1 }}>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'transparent' }}>
      <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
        TravelPal
      </Typography>
      <Button sx={{ color: 'White' }} onClick={() => router.push('/signup')}>Register</Button>
      </Toolbar>
      </AppBar>
      </Box>

      {/* Main content container */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundImage: 'url(https://duagency.com/wp-content/uploads/2017/06/4_Beaches.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: 4,
        }}
      >
        {/* Main section with title, subtitle, and CTA button */}
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0)',
            borderRadius: 2,
            p: 2,
            mt: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Discover the world with TravelPal
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'white', maxWidth: '600px', mx: 'auto', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Your trusted AI travel buddy.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            onClick={handleStartChat}
            sx={{ 
              px: 4, 
              py: 1.5, 
              fontSize: '1.2rem',
              backgroundColor: '#2196f3',
              '&:hover': {
                backgroundColor: '#1976d2',
              },
              mt: 2,
            }}
          >
            Start Chatting
          </Button>
        </Box>

        {/* Destination carousel section */}
        <Box position="relative" width="100%" maxWidth="1200px" mt={6}>
        {/* Left scroll button */}
        <IconButton 
          onClick={() => handleScroll('left')} 
          sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        {/* Container for destination cards */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="400px"
          overflow="hidden"
        >
           {/* Map through destinations and render cards */}
          {destinations.map((dest, index) => {
            const isActive = index === activeIndex
            const isPrev = (index === activeIndex - 1) || (activeIndex === 0 && index === destinations.length - 1)
            const isNext = (index === activeIndex + 1) || (activeIndex === destinations.length - 1 && index === 0)
            
            return (
              <Card 
                key={index} 
                sx={{ 
                  minWidth: isActive ? 300 : 180,
                  height: isActive ? 300 : 200,
                  mx: 2, 
                  transition: 'all 0.3s ease',
                  transform: isActive ? 'scale(1.1)' : (isPrev || isNext ? 'scale(0.9)' : 'scale(0.7)'),
                  opacity: isActive ? 1 : (isPrev || isNext ? 0.7 : 0.5),
                  position: 'absolute',
                  left: `${(index - activeIndex) * 350 + 450}px`,
                }}
              >
                <CardMedia
                  component="img"
                  height={isActive ? "200" : "100"}
                  image={dest.image}
                  alt={dest.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {dest.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {dest.description}
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
        </Box>
        {/* Right scroll button */}
        <IconButton 
          onClick={() => handleScroll('right')} 
          sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
    </Box>
  )
}
