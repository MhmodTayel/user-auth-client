import React, { ReactNode, useContext, useEffect } from 'react';
import { Layout } from 'antd';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext?.accessToken) navigate('/');
  }, [authContext]);

  return (
    <Layout style={{ height: '100vh' }}>
      <Content>{children}</Content>
    </Layout>
  );
};

export default AuthLayout;
