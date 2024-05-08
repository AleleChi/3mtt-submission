import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'; 
import { createRoot } from 'react-dom/client'; 

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <ChakraProvider> 
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
