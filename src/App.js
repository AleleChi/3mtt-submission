import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, Button, Flex } from '@chakra-ui/react'; // Import Chakra UI components
import RepositoryList from './components/RepositoryList';
import RepositoryDetail from './components/RepositoryDetail';
import NotFoundPage from './components/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';
import NewRepositoryModal from './components/NewRepositoryModal';
import LandingPage from './components/LandingPage';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateRepository = async (repoName) => {
    try {
      // Make a POST request to the GitHub API to create the repository
      const response = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({ name: repoName }),
      });

      if (!response.ok) {
        throw new Error('Failed to create repository');
      }

      // Repository created successfully
      console.log('Repository created successfully:', repoName);
    } catch (error) {
      console.error('Error creating repository:', error);
    }
  };

  return (
    <Router>
      <Box p={4}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/repositories" element={<RepositoryList />} />
            <Route path="/repos/:repoName" element={<RepositoryDetail />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Flex justifyContent="center" mt={4}>
            <Button colorScheme="teal" onClick={handleOpenModal}>
              Create New Repository
            </Button>
          </Flex>
          
          {isModalOpen && (
            <NewRepositoryModal onClose={handleCloseModal} onCreate={handleCreateRepository} />
          )}
        </ErrorBoundary>
      </Box>
    </Router>
  );
};

export default App;
