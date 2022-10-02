import React, { useEffect, useState } from 'react';
import { MdAccountCircle, MdLogout } from 'react-icons/md';
import { Button, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useUser from '../Context/user';
import '../Styles/Header.css';

const HEADER_ELEVATED_IN_VALUE = 10;

function NavBar() {
  const scrollPosition = document.body.scrollTop || document.documentElement.scrollTop;
  const { user, setUser } = useUser();
  const [isElevated, setElevated] = useState(scrollPosition > HEADER_ELEVATED_IN_VALUE);

  useEffect(() => {
    function handleScroll() {
      const scroll = document.body.scrollTop
        || document.documentElement.scrollTop;

      setElevated(scroll > HEADER_ELEVATED_IN_VALUE);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <Stack
        as="nav"
        align="center"
        backdropFilter="auto"
        backdropBlur="xl"
        bgColor="whiteAlpha.800"
        borderBottom="1px solid"
        borderColor="gray.300"
        boxShadow={ isElevated ? 'md' : 'none' }
        direction={ ['column', null, 'row'] }
        justify="space-between"
        left={ 0 }
        px={ 4 }
        py={ 3 }
        pos="fixed"
        right={ 0 }
        top={ 0 }
        transitionDuration="200ms"
        zIndex="900"
      >
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

        <Text fontSize="2xl" fontWeight="semibold">
          Delivery App
        </Text>

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
