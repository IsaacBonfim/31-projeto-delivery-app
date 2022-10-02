import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useUser from '../Context/user';
import { ROLES_OPTIONS } from '../Constants';
import NotPermission from '../Pages/NotPermission';

function PrivateRoute({ children }) {
  const { user } = useUser();
  const { pathname } = useLocation();

  if (!user) return <Navigate to="/login" />;

  if (!ROLES_OPTIONS[user.role].permPaths.includes(pathname.split('/')[1])) {
    return <NotPermission />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
