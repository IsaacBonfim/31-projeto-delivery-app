import React, { useContext, useState, useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import appContext from '../Context/AppContext';
import NavBar from '../Components/NavBar';
import ProductCard from '../Components/ProductCard';
import { setTotal as setTotalLocal } from '../Services/LocalStorage';
import '../Styles/Products.css';

const GRID_COLUMNS = [
  1,
  2,
  2 + 1,
  2 + 2,
];

function Products() {
  const [total, setTotal] = useState(0);
  const [btnCheckoutDisabled, setBtnCheckout] = useState(true);
  const { products, cart, productsRequest } = useContext(appContext);

  const history = useNavigate();

  useEffect(() => {
    productsRequest();
  }, []);

  useEffect(() => {
    const soma = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    if (cart.length >= 1) {
      setBtnCheckout(false);
    } else {
      setBtnCheckout(true);
    }

    setTotal(soma);
    setTotalLocal(soma);
  }, [cart]);

  return (
    <>
      <NavBar />
      <SimpleGrid
        as="section"
        columns={ GRID_COLUMNS }
        mt={ ['112px', null, '64px'] }
        p={ 10 }
        spacing={ 10 }
      >
        { products !== undefined && products !== null && products.length > 0 && (
          products.map((product) => (
            <ProductCard
              key={ product.id }
              product={ product }
            />
          ))
        ) }
      </SimpleGrid>
      {/* <section className="products-section">
        { products !== undefined && products !== null && products.length > 0 && (
          products.map((product) => (
            <ProductCard
              key={ product.id }
              product={ product }
            />
          ))
        ) }
      </section> */}
      <section className="cart-section">
        <button
          type="button"
          className="btn"
          data-testid="customer_products__button-cart"
          disabled={ btnCheckoutDisabled }
          onClick={ () => history('/customer/checkout') }
        >
          Ver carrinho
        </button>
        <p
          data-testid="customer_products__checkout-bottom-value"
        >
          { `Ver Carrinho R$ ${total.toFixed(2).replace('.', ',')}` }
        </p>
      </section>
    </>
  );
}

export default Products;
