import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react'; 
const NotFoundPage = () => {
  return (
    <Box p={8} borderRadius="md" textAlign="center"> 
      <Image src="/404.png" alt="404 Image" mx="auto" mb={4} /> 
      <Text fontSize="2xl" fontWeight="bold">404 Not Found</Text> 
      <Text mt={2}>The page you're looking for does not exist.</Text>
    </Box>
  );
};

export default NotFoundPage;
