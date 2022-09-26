import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './AppContext';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [btnLoginDisabled, setBtnLogin] = useState(true);
  const [name, setName] = useState('');

  const memo = useMemo(() => {
    const objApp = {
      email,
      btnLoginDisabled,
      name,
      setEmail,
      setBtnLogin,
      setName,
    };

    return objApp;
  }, [email, btnLoginDisabled, name]);

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
