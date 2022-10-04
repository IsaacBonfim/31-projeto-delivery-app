import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import appContext from '../Context/AppContext';
import { setCart as setCartLocal, setTotal } from '../Services/LocalStorage';

function ProductBoard(props) {
  const { cart } = props;
  const { setCart } = useContext(appContext);

  function removeProduct(id) {
    const newCart = cart.filter((item) => item.id !== id);

    const soma = newCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    setCart(newCart);
    setTotal(soma);
    setCartLocal(newCart);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidate</th>
          <th>Valor Unitário</th>
          <th>Sub-Total</th>
          <th>Remover Item</th>
        </tr>
      </thead>
      <tbody>
        { cart.map((item, index) => (
          <tr key={ index }>
            <th
              data-testid={
                `customer_checkout__element-order-table-item-number-${index}`
              }
            >
              { index + 1 }
            </th>
            <th
              data-testid={
                `customer_checkout__element-order-table-name-${index}`
              }
            >
              { item.name }
            </th>
            <th
              data-testid={
                `customer_checkout__element-order-table-quantity-${index}`
              }
            >
              { item.quantity }
            </th>
            <th
              data-testid={
                `customer_checkout__element-order-table-unit-price-${index}`
              }
            >
              { `R$ ${(item.price).replace('.', ',')}` }
            </th>
            <th
              data-testid={
                `customer_checkout__element-order-table-sub-total-${index}`
              }
            >
              { `R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}` }
            </th>
            <th
              data-testid={
                `customer_checkout__element-order-table-remove-${index}`
              }
            >
              <button
                type="button"
                onClick={ () => removeProduct(item.id) }
              >
                Remover
              </button>
            </th>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

ProductBoard.propTypes = {
  cart: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
  }),
}.isRequired;

export default ProductBoard;
