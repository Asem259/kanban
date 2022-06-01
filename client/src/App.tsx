import React from 'react';
import { Routes, Route, Link, Navigate, RouteProps } from 'react-router-dom';

import { useAppSelector } from './app/store/store';

import { Login } from './pages/Login';
import { Notification, NavBar } from './components';

interface PrivatePros {
  Component: React.ComponentType;
}

const Private = ({ Component }: PrivatePros) => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  return isAuthenticated ? <Component /> : <Navigate to='/login' />;
};

function App() {
  const isActive = useAppSelector((state) => state.notification.isActive);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  return (
    <>
      {isActive && <Notification />}
      {isAuthenticated && <NavBar />}
      <Routes>
        <Route path='/login' element={<Login page='login' />} />
        <Route path='/register' element={<Login page='register' />} />
      </Routes>
    </>
  );
}

export default App;
