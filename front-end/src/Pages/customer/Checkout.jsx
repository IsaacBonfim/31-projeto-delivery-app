import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import NavBar from '../../Components/NavBar';

function Checkout() {
  return (
    <>
      <NavBar />

      <Box
        maxW="1000px"
        mb="20px"
        mt={ ['177px', null, '85px'] }
        mx="auto"
        w="calc(100vw - 24px)"
      >
        <Text fontSize="2xl" fontWeight="bold">
          Tela de Checkout
        </Text>
      </Box>
    </>
  );
}

export default Checkout;
