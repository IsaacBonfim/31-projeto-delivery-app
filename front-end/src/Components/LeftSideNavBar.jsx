import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Text } from '@chakra-ui/react';
import useUser from '../Context/user';

function LeftSideNavBar() {
  const { user } = useUser();

  switch (user.role) {
  case 'admin': return (
    <Text
      bgColor="green.500"
      borderRadius="md"
      color="white"
      fontWeight="semibold"
      px={ 3 }
      py={ 2 }
    >
      Gerenciar Usuários
    </Text>
  );

  case 'seller': return (
    <Button
      as={ Link }
      to={ user.role === 'admin' ? '' : '/seller/orders' }
      colorScheme="green"
      data-testid="customer_products__element-navbar-link-orders"
    >
      {user.role === 'admin' ? '' : 'Pedidos'}
    </Button>
  );

  default: return (
    <Stack as="section" direction="row" spacing={ 0 }>
      <Button
        as={ Link }
        to="/customer/products"
        borderRightRadius="none"
        colorScheme="green"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Produtos
      </Button>

      <Button
        as={ Link }
        to="/customer/orders"
        borderLeftRadius="none"
        colorScheme="blue"
        data-testid="customer_products__element-navbar-link-products"
      >
        Meus Pedidos
      </Button>
    </Stack>
  );
  }
}

export default LeftSideNavBar;
