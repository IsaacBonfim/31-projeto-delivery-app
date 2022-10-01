import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useUser from '../Context/user';

function PrivateRoute({ children }) {
  const { user } = useUser();

  if (!user) return <Navigate to="/login" />;

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
