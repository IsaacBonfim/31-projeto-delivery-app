import React from 'react';
import { MdAccountCircle, MdLogout } from 'react-icons/md';
import { Button, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useUser from '../Context/user';
import '../Styles/Header.css';

function NavBar() {
  const { user, setUser } = useUser();

  return (
    <header>
      <Stack
        as="nav"
        align="center"
        bgColor="gray.100"
        direction={ ['column', null, 'row'] }
        justify="space-between"
        left={ 0 }
        px={ 4 }
        py={ 3 }
        pos="fixed"
        right={ 0 }
        top={ 0 }
      >
        <Stack as="section" direction="row" spacing={ 0 }>
          <Button
            as={ Link }
            to="/customer/products"
            borderRightRadius="none"
            colorScheme="green"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Meus Pedidos
          </Button>

          <Button
            as={ Link }
            to="/customer/orders"
            borderLeftRadius="none"
            colorScheme="blue"
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </Button>
        </Stack>

        <Stack as="section" align="center" direction="row" spacing={ 0 }>
          <Stack
            align="center"
            bgColor="purple.600"
            borderLeftRadius="md"
            color="white"
            direction="row"
            p={ 2 }
            px={ 3 }
            spacing={ 1 }
          >
            <MdAccountCircle size={ 24 } />
            <Text
              fontWeight="semibold"
              whiteSpace="nowrap"
              data-testid="customer_products__element-navbar-user-full-name"
            >
              {user.name}
            </Text>
          </Stack>

          <Button
            borderLeftRadius="none"
            colorScheme="red"
            rightIcon={ <MdLogout /> }
            onClick={ () => setUser(null) }
            data-testid="customer_products__element-navbar-link-logout"
          >
            Sair
          </Button>
        </Stack>
      </Stack>
    </header>
    // <header className="header">
    //   <nav className="ProductNav">
    //     <section className="left section">
    //       <button
    //         type="button"
    //         className="nav btn"
    //         data-testid="customer_products__element-navbar-link-products"
    //         onClick={ () => history('/customer/products') }
    //       >
    //         Produtos
    //       </button>
    //       <button
    //         type="button"
    //         className="nav btn"
    //         data-testid="customer_products__element-navbar-link-orders"
    //         onClick={ () => history('/customer/orders') }
    //       >
    //         Meus Pedidos
    //       </button>
    //     </section>
    //     <section className="right section">
    //       <p
    //         className="user-display"
    //         data-testid="customer_products__element-navbar-user-full-name"
    //       >
    //         { name || 'Teste'}
    //       </p>
    //       <button
    //         type="button"
    //         className="logout btn"
    //         data-testid="customer_products__element-navbar-link-logout"
    //         onClick={ () => setUser(null) }
    //       >
    //         Sair
    //       </button>
    //     </section>
    //   </nav>
    // </header>
  );
}

export default NavBar;
