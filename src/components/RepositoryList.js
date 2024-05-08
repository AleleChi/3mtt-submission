import React, { useState, useEffect } from 'react';
import { Box, Input, Button, Text, ListItem, UnorderedList } from '@chakra-ui/react'; 

const RepositoryList = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRepositories, setFilteredRepositories] = useState([]);
  const [page, setPage] = useState(1);
  const repositoriesPerPage = 10;

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/AleleChi/repos`);
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepositories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRepositories();
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * repositoriesPerPage;
    const endIndex = startIndex + repositoriesPerPage;
    setFilteredRepositories(
      repositories
        .filter(repo =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(startIndex, endIndex)
    );
  }, [repositories, searchQuery, page]);

  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Your GitHub Repositories</Text>
      <Input
        type="text"
        placeholder="Search Repositories"
        value={searchQuery}
        onChange={handleSearch}
        mb={4} 
      />
      <UnorderedList listStyleType="none" padding={0}>
        {filteredRepositories.map(repo => (
          <ListItem
            key={repo.id}
            mb={4}
            borderWidth="1px"
            borderStyle="solid"
            borderColor="gray.300"
            p={4}
            borderRadius="md"
            _hover={{ borderColor: 'blue.500', boxShadow: 'md' }}
          >
            <Text
              fontSize="lg"
              fontWeight="bold"
              mb={2}
              cursor="pointer"
              onClick={() => window.location.href = `/repos/${repo.name}`}
            >
              {repo.name}
            </Text>
            <Text fontSize="sm" color="gray.500">{repo.description}</Text>
          </ListItem>
        ))}
      </UnorderedList>
      <Button onClick={prevPage} disabled={page === 1} mr={2}>Previous Page</Button>
      <Button onClick={nextPage} disabled={filteredRepositories.length < repositoriesPerPage}>Next Page</Button>
    </Box>
  );
};

export default RepositoryList;
