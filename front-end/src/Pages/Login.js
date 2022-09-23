import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestLogin } from '../Services/Axios';
import appContext from '../Context/AppContext';

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
    }

    history('/register');
  };

  return (
    <div>
      <h1>Delivery App</h1>

      <div>
        <input
          type="email"
          placeholder="Digite seu login(email)"
          data-testid="common_login__input-email"
          name="email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          data-testid="common_login__input-password"
          name="password"
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
      { errorMessage && (
        <p data-testid="common_login__element-invalid-email">
          ERRO
        </p>
      ) }
    </div>
  );
}

export default Login;
