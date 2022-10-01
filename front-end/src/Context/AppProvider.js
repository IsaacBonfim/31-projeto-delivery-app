import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './AppContext';
import { requestProducts } from '../Services/Axios';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [btnLoginDisabled, setBtnLogin] = useState(true);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const productsRequest = async () => {
    const prodList = await requestProducts('/customer/products');

    setProducts(prodList);
  };

  const memo = useMemo(() => {
    const objApp = {
      email,
      btnLoginDisabled,
      name,
      products,
      cart,
      setEmail,
      setBtnLogin,
      setName,
      setProducts,
      setCart,
      productsRequest,
    };

    return objApp;
  }, [email, btnLoginDisabled, name, products, cart]);

  return (
    <appContext.Provider value={ memo }>
      { children }
    </appContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
