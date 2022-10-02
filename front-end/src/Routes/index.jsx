import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import Checkout from '../Pages/customer/Checkout';
import OrdersCustomer from '../Pages/customer/Orders';
import Products from '../Pages/customer/Products';

import OrdersSeller from '../Pages/seller/Orders';

import Login from '../Pages/Login';
import Register from '../Pages/Register';
import NotFound from '../Pages/NotFound';

import PrivateRoute from './Private.route';
import ProtectedRoute from './Protected.route';

import useUser from '../Context/user';
import { ROLES_OPTIONS } from '../Constants';

function Routes() {
  const { user } = useUser();

  return (
    <Switch>
      <Route
        exact
        path="/"
        element={ (
          <Navigate to={ user ? ROLES_OPTIONS[user.role].main : '/login' } replace />
        ) }
      />

      <Route
        exact
        path="/login"
        element={ (
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        ) }
      />

      <Route
        exact
        path="/register"
        element={ (
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        ) }
      />

      <Route
        exact
        path="/customer"
        element={
          <PrivateRoute>
            <Navigate to="/customer/products" replace />
          </PrivateRoute>
        }
      />

      <Route
        exact
        path="/customer/products"
        element={ (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ) }
      />

      <Route
        exact
        path="/customer/checkout"
        element={ (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ) }
      />

      <Route
        exact
        path="/customer/orders"
        element={ (
          <PrivateRoute>
            <OrdersCustomer />
          </PrivateRoute>
        ) }
      />

      <Route
        exact
        path="/seller/orders"
        element={ (
          <PrivateRoute>
            <OrdersSeller />
          </PrivateRoute>
        ) }
      />

      <Route
        exact
        path="/*"
        element={ <NotFound /> }
      />
    </Switch>
  );
}

export default Routes;
