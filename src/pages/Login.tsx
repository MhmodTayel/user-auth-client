import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import AuthLayout from '../layouts/AuthLayout';
import { useLogin } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { AuthResponse } from '../types/types';
import Loading from '../components/Loading';
import { message } from 'antd';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const mutation = useLogin();
  const authContext = useContext(AuthContext);

  const onFinish = (values: any) => {
    mutation.mutate(values, {
      onSuccess: ({ status, data }: { status: number; data: AuthResponse }) => {
        if (status == 200) {
          message.success('Login successful. Welcome back!');
          authContext?.setaccessToken(data.accessToken);
          authContext?.setUser(data.user);
          navigate('/');
        }
      },
      onError: (error: any) => {
        if (error.response) {
          message.error({
            content: error?.response?.data?.message,
            duration: 10,
          });
        } else {
          message.error(
            'Login failed due to a server error. Please try again later.'
          );
        }
      },
    });
  };

  return !authContext?.loading ? (
    <AuthLayout>
      <AuthForm onFinish={onFinish} isLogin={true} />
    </AuthLayout>
  ) : (
    <Loading />
  );
};

export default Login;
