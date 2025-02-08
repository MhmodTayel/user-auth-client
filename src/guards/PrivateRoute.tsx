import React, { JSX, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authContext = useContext(AuthContext);
  return authContext?.accessToken && authContext?.user ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
