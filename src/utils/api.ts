import { useMutation } from 'react-query';
import { axiosInstance } from './axiosInstance';

const login = async (data: { email: string; password: string }) => {
  return axiosInstance.post('/auth/login', data);
};

const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return axiosInstance.post('/auth/register', data);
};

export const useLogin = () => {
  return useMutation(login);
};

export const useRegister = () => {
  return useMutation(register);
};
