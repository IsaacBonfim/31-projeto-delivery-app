import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestRegister } from '../Services/Axios';
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

  const history = useNavigate();

  const validateRegister = async () => {
    const result = await requestRegister('/register', { name, email, password });
    console.log(result);
    if (!result) {
      setErrorMessage(true);
    } else {
      history('/login');
    }
  };

  return (
    <div className="main-container">
      <h1 className="app-title">Delivery App</h1>

      <div className="register-input-container">
        <input
          type="name"
          name="name"
          placeholder="Informe seu Nome"
          className="access-input"
          data-testid="common_register__input-name"
          value={ name }
          onChange={ ({ target }) => setName(target.value) }
        />
        <input
          type="email"
          name="email"
          placeholder="Informe seu email"
          className="access-input"
          data-testid="common_register__input-email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          type="password"
          name="password"
          placeholder="Informe sua senha"
          className="access-input"
          data-testid="common_register__input-password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ btnLoginDisabled }
          onClick={ validateRegister }
        >
          CADASTRAR
        </button>
      </div>
      <p
        className={ errorMessage ? 'error-message' : 'message' }
        data-testid="common_register__element-invalid_register"
      >
        { errorMessage ? 'Erro' : 'Realize seu cadastro' }
      </p>
    </div>
  );
}

export default Register;
