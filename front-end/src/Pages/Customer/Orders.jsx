import React, { useContext, useEffect } from 'react';
import appContext from '../../Context/AppContext';
import NavBar from '../../Components/NavBar';
import OrderCard from '../../Components/OrderCard';
import { getUser } from '../../Services/LocalStorage';

function Orders() {
  const { customerOrders, ordersRequest } = useContext(appContext);

  useEffect(() => {
    const { id } = getUser();
    const endpoint = `/orders/customer/${id}`;

    ordersRequest(endpoint);
  }, []);

  return (
    <div className="products-container">
      <NavBar />
      <h1>Tela dos meus Pedidos</h1>
      <section>
        { customerOrders.length > 0 && (
          customerOrders.map((order, index) => (
            <OrderCard key={ index } order={ order } />
          ))
        )}
      </section>
    </div>
  );
}

export default Orders;
