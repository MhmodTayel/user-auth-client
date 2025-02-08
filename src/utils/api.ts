import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from './axiosInstance';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types';



const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
  return data;
};

const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/register', credentials);
  return data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};
