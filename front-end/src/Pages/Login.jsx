import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestAccess } from '../Services/Axios';
import appContext from '../Context/AppContext';
import { setAccessInfo } from '../Services/LocalStorage';
import '../Styles/Access.css';

function Login() {
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const { email, btnLoginDisabled, setEmail,
    setBtnLogin, setName } = useContext(appContext);

  useEffect(() => {
    const handleChage = () => {
      const number = 5;
      const validEmail = /\S+@\S+\.\S+/.test(email);

      if (password.length > number && validEmail) {
        setBtnLogin(false);
      } else {
        setBtnLogin(true);
      }
    };
    handleChage();
  }, [email, password, setBtnLogin]);

  const history = useNavigate();

  const validateLogin = async () => {
    const result = await requestAccess('/login', { email, password });
    const { role, name } = result;

    switch (role) {
    case 'administrator':
      setAccessInfo(result);
      history('/admin/manage');
      break;
    case 'seller':
      setAccessInfo(result);
      history('/seller/orders');
      break;
    case 'customer':
      setAccessInfo(result);
      setName(name);
      history('/customer/products');
      break;
    default: {
      setLoginError(result.message);
      setErrorMessage(true);
    }
    }
  };

  return (
    <div className="main-container">
      <h1 className="app-title">Delivery App</h1>

      <div className="login-input-container">
        <input
          type="email"
          name="email"
          placeholder="Digite seu login(email)"
          className="access-input"
          data-testid="common_login__input-email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          className="access-input"
          data-testid="common_login__input-password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          type="button"
          className="access-button"
          data-testid="common_login__button-login"
          disabled={ btnLoginDisabled }
          onClick={ validateLogin }
        >
          LOGIN
        </button>
      </div>
      <button
        type="button"
        className="access-button"
        data-testid="common_login__button-register"
        onClick={ () => history('/register') }
      >
        Ainda Não tenho Cadastro
      </button>

      { errorMessage
        && (
          <p
            className="error-message"
            data-testid="common_login__element-invalid-email"
          >
            { loginError }
          </p>
        )}
    </div>
  );
}

export default Login;
