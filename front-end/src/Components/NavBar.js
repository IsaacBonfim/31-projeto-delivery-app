import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import appContext from '../Context/AppContext';
import useUser from '../Context/user';
import '../Styles/Header.css';

function NavBar() {
  const { name } = useContext(appContext);
  const { setUser } = useUser();

  const history = useNavigate();

  function logout() {
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <header className="header">
      <nav className="ProductNav">
        <section className="left section">
          <button
            type="button"
            className="nav btn"
            data-testid="customer_products__element-navbar-link-products"
            onClick={ () => history('/customer/products') }
          >
            Produtos
          </button>
          <button
            type="button"
            className="nav btn"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ () => history('/customer/orders') }
          >
            Meus Pedidos
          </button>
        </section>
        <section className="right section">
          <p
            className="user-display"
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { name || 'Teste'}
          </p>
          <button
            type="button"
            className="logout btn"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ logout }
          >
            Sair
          </button>
        </section>
      </nav>
    </header>
  );
}

export default NavBar;
