import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import AppProvider from './Context/AppProvider';
import Routes from './Routes';

import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <ChakraProvider resetCSS>
      <ToastContainer />
      <AppProvider>
        <Routes />
      </AppProvider>
    </ChakraProvider>
  );
}

export default App;
