import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { ROLES_OPTIONS } from '../Constants';
import useUser from '../Context/user';

function ProtectedRoute({ children }) {
  const { user } = useUser();

  if (user) return <Navigate to={ ROLES_OPTIONS[user.role].main } />;

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
