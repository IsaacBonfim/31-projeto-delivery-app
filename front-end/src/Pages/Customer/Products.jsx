import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appContext from '../../Context/AppContext';
import NavBar from '../../Components/NavBar';
import ProductCard from '../../Components/ProductCard';
import { setTotal as setTotalLocal } from '../../Services/LocalStorage';
import '../../Styles/Products.css';

function Products() {
  const [total, setTotal] = useState(0);
  const [btnCheckoutDisabled, setBtnCheckout] = useState(true);
  const { products, cart, productsRequest } = useContext(appContext);

  const history = useNavigate();

  useEffect(() => {
    productsRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <div className="products-container">
      <NavBar />
      <section className="products-section">
        { products !== undefined && products !== null && products.length > 0 && (
          products.map((product) => (
            <ProductCard
              key={ product.id }
              product={ product }
            />
          ))
        ) }
      </section>
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
    </div>
  );
}

export default Products;
