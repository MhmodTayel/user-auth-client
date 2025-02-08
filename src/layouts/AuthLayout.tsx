import React, { ReactNode, useContext, useEffect } from 'react';
import { Layout } from 'antd';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const { Content } = Layout;

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext?.loading && authContext?.accessToken) {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }, [authContext?.loading, authContext?.accessToken, navigate]);

  if (authContext?.loading) {
    return <Loading />;
  }

  if (!authContext?.loading && !authContext?.accessToken) {
    return (
      <Layout style={{ height: '100vh' }}>
        <Content>{children}</Content>
      </Layout>
    );
  }

  return null;
};

export default AuthLayout;
