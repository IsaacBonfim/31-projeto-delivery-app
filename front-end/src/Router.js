import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';

function Router() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" replace /> } />
      <Route exact path="/login" element={ <Login /> } />
    </Routes>
  );
}

export default Router;
