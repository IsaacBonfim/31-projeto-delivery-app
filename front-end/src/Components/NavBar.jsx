import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import appContext from '../Context/AppContext';
import { getUser } from '../Services/LocalStorage';
import '../Styles/Header.css';

function NavBar() {
  const { name } = useContext(appContext);
  const { role } = getUser();

  const history = useNavigate();

  function logout() {
    localStorage.clear();

    history('/login');
  }

  return (
    <header className="header">
      <nav className="ProductNav">
        <section className="left section">
          { role === 'customer' && (
            <button
              type="button"
              className="nav btn"
              data-testid="customer_products__element-navbar-link-products"
              onClick={ () => history('/customer/products') }
            >
              Produtos
            </button>
          ) }
          { role !== 'administrator' && (
            <button
              type="button"
              className="nav btn"
              data-testid="customer_products__element-navbar-link-orders"
              onClick={ () => history('/customer/orders') }
            >
              { role === 'customer' ? 'Meus Pedidos' : 'Pedidos' }
            </button>
          ) }
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
