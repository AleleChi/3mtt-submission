import React, { useState } from 'react';
import { Box, Button, Input, Text, Alert, AlertIcon } from '@chakra-ui/react';

const NewRepositoryModal = ({ onClose, onCreate }) => {
  const [repoName, setRepoName] = useState('');
  const [error, setError] = useState('');

  const handleCreate = async () => {
    try {
      // Perform validation
      if (!repoName.trim()) {
        throw new Error('Repository name cannot be empty');
      }
  
      // Call the onCreate callback to create the repository
      await onCreate(repoName);
      onClose();
    } catch (error) {
      setError('Error creating repository. Please try again.');
      console.error('Error creating repository:', error.message);
    }
  };
  
  const handleCloseAlert = () => {
    setError('');
  };

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex="999"
    >
      <Box
        bg="white"
        p={4}
        borderRadius="md"
        width="400px"
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.15)"
      >
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          Create New Repository
        </Text>
        <Input
          type="text"
          placeholder="Repository Name"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          mb={2}
        />
        {error && (
          <Alert status="error" mb={2} rounded="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <Button colorScheme="blue" mr={2} onClick={handleCreate}>
          Create
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default NewRepositoryModal;
