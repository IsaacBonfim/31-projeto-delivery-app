import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestLogin } from '../Services/Axios';
import appContext from '../Context/AppContext';
import '../Styles/Access.css';

function Login() {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const { email, btnLoginDisabled,
    setEmail, setBtnLogin } = useContext(appContext);

  useEffect(() => {
    const handleChage = () => {
      const number = 6;
      const validEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);

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
    const result = await requestLogin('/login', { email, password });

    if (!result) {
      setErrorMessage(true);
    } else {
      history('/register');
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
          data-testid="common_login__button-login"
          disabled={ btnLoginDisabled }
          onClick={ validateLogin }
        >
          LOGIN
        </button>
      </div>
      <button
        type="button"
        data-testid="common_login__button-register"
        onClick={ () => history('/register') }
      >
        Ainda Não tenho Cadastro
      </button>
      <p
        className={ errorMessage ? 'error-message' : 'message' }
        data-testid="common_login__element-invalid-email"
      >
        { errorMessage ? 'Erro' : 'Realize seu login' }
      </p>
    </div>
  );
}

export default Login;
