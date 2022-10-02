import React, { useState, useEffect } from 'react';
import { Button, SimpleGrid, toast } from '@chakra-ui/react';
import { MdShoppingCart } from 'react-icons/md';
import NavBar from '../Components/NavBar';
import ProductCard from '../Components/ProductCard';
import productsApi from '../Services/Api/products';
import '../Styles/Products.css';
import useCart from '../Context/cart';

const GRID_COLUMNS = [
  1,
  2,
  2 + 1,
  2 + 2,
];

function Products() {
  const { cart, totalValue } = useCart();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function load() {
      const { message, result } = await productsApi.list();

      if (result) {
        setProducts(result);
      } else {
        toast(message, { type: 'error' });
      }
    }

    load();
  }, []);

  return (
    <>
      <NavBar />

      <SimpleGrid
        as="section"
        columns={ GRID_COLUMNS }
        mt={ ['157px', null, '64px'] }
        mb="52px"
        p={ 10 }
        spacing={ 10 }
      >
        {products?.map((product) => (
          <ProductCard
            key={ product.id }
            product={ product }
          />
        ))}
      </SimpleGrid>

      <Button
        bottom={ 5 }
        colorScheme="purple"
        leftIcon={ <MdShoppingCart size={ 24 } /> }
        pos="fixed"
        right={ 5 }
        rightIcon={ (
          <strong
            data-testid="customer_products__checkout-bottom-value"
          >
            {totalValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </strong>
        ) }
        size="lg"
        zIndex={ 900 }
        isDisabled={ cart.length === 0 }
        data-testid="customer_products__button-cart"
      >
        Ver Carrinho
      </Button>
    </>
  );
}

export default Products;
