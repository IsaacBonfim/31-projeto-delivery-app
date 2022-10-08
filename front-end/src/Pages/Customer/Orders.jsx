import React, { useContext, useEffect } from 'react';
import appContext from '../../Context/AppContext';
import NavBar from '../../Components/NavBar';
import OrderCard from '../../Components/OrderCard';
import { getUser } from '../../Services/LocalStorage';

function Orders() {
  const { orders, ordersRequest } = useContext(appContext);
  const { id, role } = getUser();

  useEffect(() => {
    if (role === 'customer') {
      const endpoint = `/orders/customer/${id}`;

      ordersRequest(endpoint);
    } else {
      const endpoint = `/orders/seller/${id}`;

      ordersRequest(endpoint);
    }
  }, []);

  return (
    <div className="products-container">
      <NavBar />
      <h1>{ role === 'customer' ? 'Meus Pedidos' : 'Pedidos' }</h1>
      <section>
        { orders.length > 0 && (
          orders.map((order, index) => (
            <OrderCard key={ index } order={ order } />
          ))
        )}
      </section>
    </div>
  );
}

export default Orders;
