import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import appContext from '../Context/AppContext';
import { getUser } from '../Services/LocalStorage';
import { updateSaleRequest } from '../Services/Axios';

const testId38 = 'customer_order_details__element-order-details-label-seller-name';

function DetailsBoard(props) {
  const { details } = props;
  const { products } = details;
  const { role } = getUser();

  const [date, setDate] = useState('');
  const { setDetails } = useContext(appContext);

  async function update(status) {
    const endpoint = `/orders/sale/${details.id}`;

    const sale = await updateSaleRequest(endpoint, { status });

    setDetails(sale);
  }

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
            data-testid={ role === 'customer'
              ? 'customer_order_details__element-order-details-label-order-id'
              : 'seller_order_details__element-order-details-label-order-id' }
          >
            { `Pedido ${details.id}` }
          </th>
          { role === 'customer' && (
            <th
              data-testid={ testId38 }
            >
              { `Vendedor: ${details.sellerName}` }
            </th>
          ) }
          <th
            data-testid={ role === 'customer'
              ? 'customer_order_details__element-order-details-label-order-date'
              : 'seller_order_details__element-order-details-label-order-date' }
          >
            { date }
          </th>
          <th
            data-testid={ role === 'customer'
              ? 'customer_order_details__element-order-details-label-delivery-status'
              : 'seller_order_details__element-order-details-label-delivery-status' }
          >
            { details.status }
          </th>
          <th>
            { role === 'customer' && (
              <button
                type="button"
                disabled={ details.status !== 'Em Trânsito' }
                data-testid="customer_order_details__button-delivery-check"
                onClick={ () => update('Entregue') }
              >
                MARCAR COMO ENTREGUE
              </button>
            ) }
            { role === 'seller' && (
              <>
                <button
                  type="button"
                  disabled={ details.status !== 'Pendente' }
                  data-testid="seller_order_details__button-preparing-check"
                  onClick={ () => update('Preparando') }
                >
                  PREPARAR PEDIDO
                </button>
                <button
                  type="button"
                  disabled={ details.status !== 'Preparando' }
                  data-testid="seller_order_details__button-dispatch-check"
                  onClick={ () => update('Em Trânsito') }
                >
                  SAIU PARA ENTREGA
                </button>
              </>
            ) }
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
              data-testid={ role === 'customer'
                ? `customer_order_details__element-order-table-item-number-${index}`
                : `seller_order_details__element-order-table-item-number-${index}` }
            >
              { index + 1 }
            </th>
            <th
              data-testid={ role === 'customer'
                ? `customer_order_details__element-order-table-name-${index}`
                : `seller_order_details__element-order-table-name-${index}` }
            >
              { product.name }
            </th>
            <th
              data-testid={ role === 'customer'
                ? `customer_order_details__element-order-table-quantity-${index}`
                : `seller_order_details__element-order-table-quantity-${index}` }
            >
              { product.quantity }
            </th>
            <th
              data-testid={ role === 'customer'
                ? `customer_order_details__element-order-table-unit-price-${index}`
                : `seller_order_details__element-order-table-unit-price-${index}` }
            >
              { `R$ ${product.price.replace('.', ',')}` }
            </th>
            <th
              data-testid={ role === 'customer'
                ? `customer_order_details__element-order-table-sub-total-${index}`
                : `seller_order_details__element-order-table-sub-total-${index}` }
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
