import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function OrderCard(props) {
  const { order } = props;
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  function getDate(saleDate) {
    const orderDate = saleDate.split('T')[0].split('-').reverse();

    const [day, month, year] = orderDate;

    const newDate = `${day}/${month}/${year}`;

    setDate(newDate);
  }

  useEffect(() => {
    getDate(order.saleDate);
  }, []);

  return (
    <div
      role="button"
      tabIndex={ order.id }
      onClick={ () => navigate(`/customer/orders/${order.id}`) }
      onKeyDown={ () => navigate(`/customer/orders/${order.id}`) }
    >
      <span
        data-testid={ `customer_orders__element-order-id-${order.id}` }
      >
        { order.id }
      </span>
      <span
        data-testid={ `customer_orders__element-delivery-status-${order.id}` }
      >
        { order.status }
      </span>
      <span
        data-testid={ `customer_orders__element-order-date-${order.id}` }
      >
        { date }
      </span>
      <span
        data-testid={ `customer_orders__element-card-price-${order.id}` }
      >
        { `R$ ${Number(order.totalPrice).toFixed(2).replace('.', ',')}` }
      </span>
    </div>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    saledate: PropTypes.string,
    totalPrice: PropTypes.number,
  }),
}.isRequired;

export default OrderCard;
