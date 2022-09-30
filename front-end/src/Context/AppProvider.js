import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './AppContext';
import { requestProducts } from '../Services/Axios';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [btnLoginDisabled, setBtnLogin] = useState(true);
  const [products, setProducts] = useState([]);

  const productsRequest = async () => {
    const prodList = await requestProducts('/products');

    setProducts(prodList);
  };

  const memo = useMemo(() => {
    const setLocalStorageAccessInfo = (user) => {
      localStorage.setItem('name', JSON.stringify({ name: user.name }));
      localStorage.setItem('email', JSON.stringify({ email }));
      localStorage.setItem('role', JSON.stringify({ role: user.role }));
      localStorage.setItem('token', JSON.stringify({ token: user.token }));
    };

    const objApp = {
      email,
      btnLoginDisabled,
      name,
      products,
      setEmail,
      setBtnLogin,
      setName,
      setProducts,
      productsRequest,
      setLocalStorageAccessInfo,
    };

    return objApp;
  }, [email, btnLoginDisabled, name, products]);

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
