import React, { useContext, useState, useEffect } from 'react';
import appContext from '../Context/AppContext';

function Register() {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const { email, btnLoginDisabled, name,
    setEmail, setBtnLogin, setName } = useContext(appContext);

  useEffect(() => {
    const handleChage = () => {
      const nName = 12;
      const nPassword = 6;
      const validEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

      if (name.length > nName && password.length > nPassword && validEmail) {
        setBtnLogin(false);
      } else {
        setBtnLogin(true);
      }
    };
    handleChage();
  }, [name, email, password, setBtnLogin]);

  return (
    <div>
      <h1>Delivery App</h1>

      <input
        type="name"
        placeholder="Informe seu Nome"
        data-testid="common_register__input-name"
        name="name"
        value={ name }
        onChange={ ({ target }) => setName(target.value) }
      />
      <input
        type="email"
        placeholder="Informe seu email"
        data-testid="common_register__input-email"
        name="email"
        value={ email }
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        type="password"
        placeholder="Informe sua senha"
        data-testid="common_register__input-password"
        name="password"
        value={ password }
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <button
        type="button"
        data-testid="common_register__button-register"
        disabled={ btnLoginDisabled }
        onClick={ () => setErrorMessage(true) }
      >
        CADASTRAR
      </button>
      { errorMessage && (
        <p data-testid="common_login__element-invalid-email">
          ERRO
        </p>
      ) }
    </div>
  );
}

export default Register;
