import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const testId40 = 'customer_order_details__element-order-details-label-delivery-status';
const testId41 = 'customer_order_details__element-order-table-item-number-';
const testId43 = 'customer_order_details__element-order-table-quantity-';
const testId44 = 'customer_order_details__element-order-table-unit-price-';
const testId45 = 'customer_order_details__element-order-table-sub-total-';

function DetailsBoard(props) {
  const { details } = props;
  const { products } = details;

  const [date, setDate] = useState('');

  function getDate(saleDate) {
    const orderDate = saleDate.split('T')[0].split('-').reverse();

    const [day, month, year] = orderDate;

    const newDate = `${day}/${month}/${year}`;

    setDate(newDate);
  }

  useEffect(() => {
    getDate(details.saleDate);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            { `Pedido ${details.id}` }
          </th>
          <th
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            { `Vendedor: ${details.sellerName}` }
          </th>
          <th
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            { date }
          </th>
          <th
            data-testid={ testId40 }
          >
            { details.status }
          </th>
          <th>
            <button
              type="button"
              disabled={ details.status !== 'Em Trânsito' }
              data-testid="customer_order_details__button-delivery-check"
              onClick={ () => console.log('Tô aqui!') }
            >
              MARCAR COMO ENTREGUE
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-Total</th>
        </tr>
        { products.map((product, index) => (
          <tr key={ index }>
            <th
              data-testid={ `${testId41}${index}` }
            >
              { index + 1 }
            </th>
            <th
              data-testid={ `customer_order_details__element-order-table-name-${index}` }
            >
              { product.name }
            </th>
            <th
              data-testid={ `${testId43}${index}` }
            >
              { product.quantity }
            </th>
            <th
              data-testid={ `${testId44}${index}` }
            >
              { `R$ ${product.price.replace('.', ',')}` }
            </th>
            <th
              data-testid={ `${testId45}${index}` }
            >
              { `R$ ${product.subTotal.toFixed(2).replace('.', ',')}` }
            </th>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

DetailsBoard.propTypes = {
  details: PropTypes.shape({
    id: PropTypes.number,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.string,
        quantity: PropTypes.number,
        subTotal: PropTypes.number,
      }),
    ),
    saleDate: PropTypes.string,
    sellerName: PropTypes.string,
    status: PropTypes.string,
    totalPrice: PropTypes.string,
  }),
}.isRequired;

export default DetailsBoard;
