import React, { useContext } from 'react';
import AuthForm from '../components/AuthForm';
import AuthLayout from '../layouts/AuthLayout';
import { useRegister } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { AuthResponse, RegisterCredentials } from '../types';
import Loading from '../components/Loading';
import { message } from 'antd';

const Register: React.FC = () => {
  const mutation = useRegister();
  const authContext = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: RegisterCredentials) => {
    mutation.mutate(values, {
      onSuccess: (data: AuthResponse) => {
        messageApi.success({
          content: 'Registration successful. Welcome aboard!',
          duration: 5,
        });
        authContext?.setaccessToken(data.token);
        authContext?.setUser(data.user);
      },
      onError: (error: any) => {
        if (error.response) {
          messageApi.error({
            content: error?.response?.data?.message,
            duration: 10,
          });
        } else {
          messageApi.error(
            'Registration failed due to a server error. Please try again later.'
          );
        }
      },
    });
  };

  return authContext && !authContext.loading ? (
    <>
      {contextHolder}
      <AuthLayout>
        <AuthForm onFinish={onFinish} isLogin={false} />
      </AuthLayout>
    </>
  ) : (
    <Loading />
  );
};

export default Register;
