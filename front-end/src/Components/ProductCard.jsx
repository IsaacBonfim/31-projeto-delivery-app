import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { MdAdd, MdRemove } from 'react-icons/md';
import {
  Center,
  IconButton,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
} from '@chakra-ui/react';

import appContext from '../Context/AppContext';
import { setCart as setCartLocal } from '../Services/LocalStorage';
import Img from './Img';

function ProductCard(props) {
  const [quant, setQuant] = useState(0);
  const { cart, setCart } = useContext(appContext);
  const { product } = props;

  function addCart(quantity) {
    const cartItem = cart.find((item) => item.id === product.id);
    let newCart = [];

    if (!cartItem) {
      const newItem = { ...product, quantity };
      newCart = [...cart, newItem];
    } else {
      const index = cart.findIndex((item) => item.id === product.id);
      newCart = [...cart];
      newCart[index].quantity = quantity;
    }

    setCart(newCart);
    setCartLocal(newCart);
  }

  function calculate(num) {
    if (num <= 0) {
      const newCart = cart.filter((item) => item.id !== product.id);

      setQuant(0);
      setCart(newCart);
    } else {
      setQuant(num);
      addCart(num);
    }
  }

  return (
    <Stack
      align="center"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="xl"
      boxShadow="md"
      overflow="hidden"
      pos="relative"
    >
      <Img
        alt={ product.name }
        maxH={ 200 }
        m={ 4 }
        mt="auto"
        pointerEvents="none"
        src={ product.urlImage }
        w="auto"
        data-testid={ `customer_products__img-card-bg-image-${product.id}` }
      />

      <Center
        bgColor="gray.300"
        flexDirection="column"
        h={ 24 }
      >
        <Text
          fontWeight="semibold"
          mb={ 2 }
          data-testid={ `customer_products__element-card-title-${product.id}` }
        >
          {product.name}
        </Text>

        <Stack direction="row" justify="center" spacing={ 0 }>
          <IconButton
            aria-label="Remover"
            borderRightRadius="none"
            colorScheme="green"
            icon={ <MdRemove size={ 20 } /> }
            zIndex={ 1 }
            onClick={ () => calculate(quant - 1) }
            data-testid={ `customer_products__button-card-rm-item-${product.id}` }
          />

          <NumberInput
            variant="filled"
            maxW="50%"
            value={ quant }
          >
            <NumberInputField
              borderRadius="none"
              data-testid={ `customer_products__input-card-quantity-${product.id}` }
            />
          </NumberInput>

          <IconButton
            aria-label="Adicionar"
            borderLeftRadius="none"
            colorScheme="green"
            icon={ <MdAdd size={ 20 } /> }
            zIndex={ 1 }
            onClick={ () => calculate(quant + 1) }
            data-testid={ `customer_products__button-card-add-item-${product.id}` }
          />
        </Stack>
      </Center>

      <Text
        borderRadius="lg"
        bgColor="green.200"
        color="green.900"
        fontSize="xl"
        fontWeight="semibold"
        left={ 2 }
        pos="absolute"
        px={ 2 }
        py={ 1 }
        top={ 0 }
        data-testid={ `customer_products__element-card-price-${product.id}` }
      >
        R$
        {' '}
        {product.price.replace('.', ',')}
      </Text>
    </Stack>
    // <div
    //   tabIndex={ product.id }
    //   className="product-card"
    // >
    //   <p
    //     data-testid={ `customer_products__element-card-title-${product.id}` }
    //   >
    //     { product.name }
    //   </p>
    //   <img
    //     className="product-img"
    //     src={ product.urlImage }
    //     alt={ product.name }
    //     data-testid={ `customer_products__img-card-bg-image-${product.id}` }
    //   />
    //   <p
    //     className="product-price"
    //     data-testid={ `customer_products__element-card-price-${product.id}` }
    //   >
    //     { `R$ ${product.price.replace('.', ',')}` }
    //   </p>
    //   <div>
    //     <button
    //       type="button"
    //       className="btn-prod-card"
    //       data-testid={ `customer_products__button-card-rm-item-${product.id}` }
    //       onClick={ () => calculate(quant - 1) }
    //     >
    //       -
    //     </button>
    //     <input
    //       type="number"
    //       className="input-value"
    //       value={ quant }
    //       data-testid={ `customer_products__input-card-quantity-${product.id}` }
    //       onChange={ ({ target }) => calculate(target.value) }
    //     />
    //     <button
    //       type="button"
    //       className="btn-prod-card"
    //       data-testid={ `customer_products__button-card-add-item-${product.id}` }
    //       onClick={ () => calculate(quant + 1) }
    //     >
    //       +
    //     </button>
    //   </div>
    // </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }),
}.isRequired;

export default ProductCard;
