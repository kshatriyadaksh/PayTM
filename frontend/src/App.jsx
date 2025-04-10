// App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Signup from './Components/Signup';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import { SendMoney } from './Components/SendMoney';
import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

<Route
        path="/dashboard"
        element={
          <PublicRoute>
            <Dashboard />
          </PublicRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Private Routes */}
      
      <Route
        path="/sendmoney"
        element={
          <PrivateRoute>
            <SendMoney />
          </PrivateRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
