import React from 'react';
import { BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';
import AppProvider from './Context/AppProvider';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Products from './Pages/Products';
import Checkout from './Pages/Checkout';
import Orders from './Pages/Orders';
import NotFound from './Pages/NotFound';
import './Styles/App.css';

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route
            exact
            path="/"
            element={ <Navigate to="/login" replace /> }
          />
          <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/register" element={ <Register /> } />
          <Route
            exact
            path="/customer"
            element={ <Navigate to="/customer/products" replace /> }
          />
          <Route exact path="/customer/products" element={ <Products /> } />
          <Route exact path="/customer/checkout" element={ <Checkout /> } />
          <Route exact path="/customer/orders/:id" element={ <Orders /> } />
          <Route exact path="/*" element={ <NotFound /> } />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
