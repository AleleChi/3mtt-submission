import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Spinner, Alert, AlertIcon, Link } from '@chakra-ui/react'; // Import Chakra UI components

const RepositoryDetail = () => {
  const { repoName } = useParams();
  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/AleleChi/${repoName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch repository');
        }
        const data = await response.json();
        setRepository(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRepository();
  }, [repoName]);

  if (loading) {
    return (
      <Box textAlign="center">
        <Spinner size="lg" color="blue.500" />
        <Text mt={2}>Loading...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" mt={4}>
        <AlertIcon />
        Error: {error}
      </Alert>
    );
  }

  if (!repository) {
    return (
      <Box mt={4}>
        <Text>No data available for this repository.</Text>
      </Box>
    );
  }

  const description = repository.description || 'No description available';
  const stars = repository.stargazers_count || 0;
  const forks = repository.forks || 0;
  const language = repository.language || 'Unknown';
  const repoUrl = repository.html_url;

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold">{repository.name}</Text>
      <Text fontSize="lg" mt={2}>Description: {description}</Text>
      <Text fontSize="lg" mt={2}>Stars: {stars}</Text>
      <Text fontSize="lg" mt={2}>Forks: {forks}</Text>
      <Text fontSize="lg" mt={2}>Language: {language}</Text>
      <Text fontSize="lg" mt={2}>
        Repository URL: <Link href={repoUrl} isExternal>{repoUrl}</Link>
      </Text>
      
    </Box>
  );
};

export default RepositoryDetail;
