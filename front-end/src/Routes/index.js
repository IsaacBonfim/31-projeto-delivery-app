import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import Checkout from '../Pages/Checkout';
import Login from '../Pages/Login';
import NotFound from '../Pages/NotFound';
import Orders from '../Pages/Orders';
import Products from '../Pages/Products';
import Register from '../Pages/Register';
import PrivateRoute from './Private.route';
import ProtectedRoute from './Protected.route';

function Routes() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        element={ <Navigate to="/login" replace /> }
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
        element={ <Navigate to="/customer/products" replace /> }
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
        path="/customer/NotFound"
        element={ (
          <PrivateRoute>
            <Orders />
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
