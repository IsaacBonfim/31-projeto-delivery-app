import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import appContext from '../../Context/AppContext';
import NavBar from '../../Components/NavBar';
import DetailsBoard from '../../Components/DetailsBoard';

function OrderDetails() {
  const { details, detailsRequest } = useContext(appContext);
  const { id } = useParams();

  useEffect(() => {
    detailsRequest(id);
  }, []);

  return (
    <div className="checkout-container">
      <NavBar />
      { console.log(details) }

      <h1>Detalhes do Pedido</h1>

      { details.id !== undefined && (
        <DetailsBoard details={ details } />
      ) }

      <span
        data-testid="customer_order_details__element-order-total-price"
      >
        { `Total: R$ ${Number(details.totalPrice).toFixed(2).replace('.', ',')}` }
      </span>
    </div>
  );
}

export default OrderDetails;
