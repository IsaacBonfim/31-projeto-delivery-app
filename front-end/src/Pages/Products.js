import React, { useContext, useEffect } from 'react';
import appContext from '../Context/AppContext';
import NavBar from '../Components/NavBar';
import ProductCard from '../Components/ProductCard';
import '../Styles/Products.css';

function Products() {
  const { products, productsRequest } = useContext(appContext);

  useEffect(() => {
    productsRequest();
  }, [productsRequest]);

  return (
    <div className="products-container">
      <NavBar />
      <section className="products-section">
        { products !== undefined && products !== null && products.length > 0 && (
          products.map((product, index) => (
            <div key={ index }>
              <ProductCard
                productId={ product.id }
                productName={ product.name }
                productImg={ product.img }
                productPrice={ product.price }
              />
            </div>
          ))
        ) }
      </section>
      <section className="cart-section">
        <button
          type="button"
          className="btn"
          data-testid="customer_products__checkout-bottom-value"
        >
          Ver Carrinho
        </button>
        <p>Valor total</p>
      </section>
    </div>
  );
}

export default Products;
