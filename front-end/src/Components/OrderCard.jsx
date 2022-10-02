import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { Button, Center, Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import { ID_LENGTH, ORDER_STATUS_OPTIONS } from '../Constants';

function OrderCard({ order }) {
  const navigate = useNavigate();

  return (
    <Stack
      as={ Button }
      border="1px solid"
      borderColor="gray.300"
      borderRadius="lg"
      boxShadow="md"
      direction={ ['column', 'row'] }
      h="auto"
      overflow="hidden"
      p={ 0 }
      onClick={ () => navigate(`/seller/orders/${order.id}`) }
    >
      <Center flexDir="column" p={ 5 }>
        <Text fontSize="sm">Pedido</Text>

        <Text fontSize="lg" fontWeight="semibold">
          {String(order.id).padStart(ID_LENGTH, '0')}
        </Text>
      </Center>

      <Stack
        bgColor="gray.200"
        spacing={ 0 }
        overflow="hidden"
        w={ ['100%', 'calc(100% - 85.34px)'] }
      >
        <Grid
          gap={ 2 }
          h="100%"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(2, 1fr)"
          p={ 2 }
          w="100%"
        >
          <GridItem
            as={ Center }
            bgColor={ ORDER_STATUS_OPTIONS[order.status].color }
            borderRadius="md"
            colSpan={ 1 }
            fontSize="lg"
            fontWeight="semibold"
            px={ 1 }
            rowSpan={ 2 }
            textTransform="uppercase"
          >
            {order.status}
          </GridItem>

          <GridItem
            as={ Center }
            bgColor="gray.100"
            borderRadius="md"
            colSpan={ 1 }
            fontSize="lg"
            fontWeight="semibold"
            rowSpan={ 1 }
            textTransform="uppercase"
          >
            08/12/22
          </GridItem>

          <GridItem
            as={ Center }
            bgColor="gray.100"
            borderRadius="md"
            colSpan={ 1 }
            fontSize="lg"
            fontWeight="semibold"
            rowSpan={ 1 }
            textTransform="uppercase"
          >
            {order.totalValue
              .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </GridItem>
        </Grid>

        <Text
          overflow="hidden"
          pb={ 4 }
          px={ 2 }
          textAlign="right"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          w="100%"
        >
          {order.address}
        </Text>
      </Stack>
    </Stack>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    date: PropTypes.string,
    totalValue: PropTypes.number,
    address: PropTypes.string,
  }).isRequired,
};

export default OrderCard;
