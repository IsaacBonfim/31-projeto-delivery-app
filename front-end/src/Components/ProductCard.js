import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ProductCard(productId, productName, productImg, productPrice) {
  const [quant, setQuant] = useState(0);

  function add() {
    const quantity = quant;

    setQuant(quantity + 1);
  }

  function rmv() {
    let quantity = quant;

    if (quantity <= 0) {
      quantity = 0;
    } else {
      quantity -= 1;
    }

    setQuant(quantity);
  }

  return (
    <div
      tabIndex={ index }
      className="product-card"
    >
      <p
        data-testid={ `customer_products__element-card-title-${productId}` }
      >
        { productPrice }
      </p>
      <img
        className="product-img"
        src={ productImg }
        alt={ productName }
        data-testid={ `customer_products__img-card-bg-image-${productId}` }
      />
      <p
        data-testid={ ` customer_products__element-card-title-${productId}` }
      >
        { productName }
      </p>
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${productId}` }
        onClick={ add }
      >
        +
      </button>
      <input
        type="text"
        value={ quant }
        data-testid={ `customer_products__input-card-quantity-${productId}` }
      />
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${productId}` }
        onClick={ rmv }
      >
        -
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  productId: PropTypes.number,
  productName: PropTypes.string,
  productImg: PropTypes.string,
  productPrice: PropTypes.number,
}.isRequired;

export default ProductCard;
