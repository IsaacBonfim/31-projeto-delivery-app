import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './AppContext';
import { requestProducts, requestSellers,
  requestOrder, requestDetails } from '../Services/Axios';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [btnLoginDisabled, setBtnLogin] = useState(true);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [details, setDetails] = useState({});

  const productsRequest = async () => {
    const prodList = await requestProducts('/customer/products');

    setProducts(prodList);
  };

  const sellersRequest = async () => {
    const sellersList = await requestSellers('/customer/sellers');

    setSellers(sellersList);
  };

  const ordersRequest = async (endpoint) => {
    const customerOrdersList = await requestOrder(endpoint);

    setCustomerOrders(customerOrdersList);
  };

  const detailsRequest = async (id) => {
    const orderDetails = await requestDetails(`/orders/sale/${id}`);

    setDetails(orderDetails);
  };

  const memo = useMemo(() => {
    const objApp = {
      email,
      btnLoginDisabled,
      name,
      products,
      cart,
      sellers,
      customerOrders,
      details,
      setEmail,
      setBtnLogin,
      setName,
      setProducts,
      setCart,
      setSellers,
      setCustomerOrders,
      setDetails,
      productsRequest,
      sellersRequest,
      ordersRequest,
      detailsRequest,
    };

    return objApp;
  }, [email, btnLoginDisabled, name, products, cart, sellers, customerOrders, details]);

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
