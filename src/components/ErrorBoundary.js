import React, { Component } from 'react';
import { Box } from '@chakra-ui/react'; // Import Chakra UI components

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box bg="red.200" p={4} borderRadius="md"> {/* Add background color, padding, and border radius */}
          <h1>Something went wrong. Please try again later.</h1>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
