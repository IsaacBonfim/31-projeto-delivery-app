import { Box } from '@chakra-ui/react';
import React from 'react';
import NavBar from '../Components/NavBar';

function Orders() {
  return (
    <>
      <NavBar />
      <Box
        mt={ ['157px', null, '65px'] }
      >
        Tela dos meus Pedidos
      </Box>
    </>
  );
}

export default Orders;
