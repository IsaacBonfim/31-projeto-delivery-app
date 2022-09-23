import React from 'react';
import { BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';
import AppProvider from './Context/AppProvider';
import Login from './Pages/Login';
import Register from './Pages/Register';
import './Styles/App.css';

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route exact path="/" element={ <Navigate to="/login" replace /> } />
          <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/register" element={ <Register /> } />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
