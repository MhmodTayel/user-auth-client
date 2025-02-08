import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import AuthLayout from '../layouts/AuthLayout';
import { useLogin } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { AuthResponse, LoginCredentials } from '../types';
import Loading from '../components/Loading';
import { message } from 'antd';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const mutation = useLogin();
  const authContext = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!authContext?.loading && authContext?.accessToken) {
      navigate('/');
    }
  }, [authContext?.loading, authContext?.accessToken, navigate]);

  const onFinish = (values: LoginCredentials) => {
    mutation.mutate(values, {
      onSuccess: (data: AuthResponse) => {
        messageApi.success({
          content: 'Login successful. Welcome back!',
          duration: 3,
        });
        authContext?.setaccessToken(data.token);
        authContext?.setUser(data.user);
        navigate('/');
      },
      onError: (error: any) => {
        console.log({ error });
        if (error.response) {
          messageApi.error({
            content: error?.response?.data?.message,
            duration: 5,
          });
        } else {
          messageApi.error({
            content:
              'Login failed due to a server error. Please try again later.',
            duration: 5,
          });
        }
      },
    });
  };

  if (authContext?.loading) {
    return <Loading />;
  }

  if (!authContext?.loading && !authContext?.accessToken) {
    return (
      <>
        {contextHolder}
        <AuthLayout>
          <AuthForm onFinish={onFinish} isLogin={true} />
        </AuthLayout>
      </>
    );
  }

  return null;
};

export default Login;
