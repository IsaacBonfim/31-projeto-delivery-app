import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import appContext from '../../Context/AppContext';
import NavBar from '../../Components/NavBar';
import DetailsBoard from '../../Components/DetailsBoard';
import { getUser } from '../../Services/LocalStorage';

function OrderDetails() {
  const { details, detailsRequest } = useContext(appContext);
  const { id } = useParams();
  const { role } = getUser();

  useEffect(() => {
    detailsRequest(id);
  }, []);

  return (
    <div className="checkout-container">
      <NavBar />
      <h1>Detalhes do Pedido</h1>

      { details.id !== undefined && (
        <DetailsBoard details={ details } />
      ) }

      <span
        data-testid={ role === 'customer'
          ? 'customer_order_details__element-order-total-price'
          : 'seller_order_details__element-order-total-price' }
      >
        { `Total: R$ ${Number(details.totalPrice).toFixed(2).replace('.', ',')}` }
      </span>
    </div>
  );
}

export default OrderDetails;
