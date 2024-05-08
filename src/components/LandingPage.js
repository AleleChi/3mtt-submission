import React from 'react';
import { Box, Heading, Text, Button, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; 

const LandingPage = () => {
  const navigate = useNavigate(); 

  // Define handleExplore function to navigate to repositories page
  const handleExplore = () => {
    navigate('/repositories');
  };

  return (
    <Box
      textAlign="center"
      p={8}
      backgroundImage="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      borderRadius="md"
      height="100vh" // Set height to 100vh to cover the entire viewport
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Image src="/github.png" alt="GitHub Logo" mx="auto" mb={8} w={64} /> 
      <Heading as="h1" mb={4} color="white">Welcome to My GitHub Portfolio</Heading>
      <Text fontSize="xl" mb={6} color="white">Explore my repositories and projects.</Text>
      <Button colorScheme="blue" size="lg" onClick={handleExplore} mb={4}>Explore Repositories</Button>
      <Text fontSize="sm" color="whiteAlpha.800">Don't have an account? <a href="https://github.com/join" style={{ color: '#fff' }}>Sign up for GitHub</a></Text>
    </Box>
  );
};

export default LandingPage;
