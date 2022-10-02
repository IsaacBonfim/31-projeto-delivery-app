import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import NavBar from '../../Components/NavBar';
import OrderCard from '../../Components/OrderCard';

const ORDERS = [
  {
    id: 1,
    status: 'pendente',
    date: '2022-11-02T02:50:47.138Z',
    totalValue: 23.80,
    address: 'Rua Irmãos audu asdhuasoi dah a',
  },
  {
    id: 2,
    status: 'entregue',
    date: '2022-10-02T02:50:47.138Z',
    totalValue: 30.17,
    address: 'Rua Irmãos audu asdhuasoi dahu a',
  },
  {
    id: 3,
    status: 'preparando',
    date: '2022-10-02T02:50:47.138Z',
    totalValue: 30.17,
    address: 'Rua Irmãos audu asdhuasoi dahu a',
  },
  {
    id: 4,
    status: 'pendente',
    date: '2022-12-02T02:50:47.138Z',
    totalValue: 30.17,
    address: 'Rua Irmãos audu asdhuasoi daahu a',
  },
];

function Orders() {
  return (
    <>
      <NavBar />

      <SimpleGrid
        columns={ [1, null, 2, null, 2 + 1, 2 + 2] }
        mt={ ['157px', null, '64px'] }
        p={ 5 }
        spacing={ 5 }
      >
        {ORDERS.map((order) => (
          <OrderCard
            key={ order.id }
            order={ order }
          />
        ))}
      </SimpleGrid>
    </>
  );
}

export default Orders;
