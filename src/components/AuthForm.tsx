import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import {
  loginValidationSchema,
  registerValidationSchema,
} from '../utils/validations';

interface AuthFormProps {
  onFinish: (values: any) => void;
  isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ onFinish, isLogin }) => {
  const validationSchema = isLogin
    ? loginValidationSchema
    : registerValidationSchema;

  const redirectTo = isLogin ? '/register' : '/login';
  const switchText = isLogin
    ? "Don't have an account? Register now!"
    : 'Already have an account? Log in here.';

  const handleSubmit = async (values: any) => {
    await onFinish(values);
  };

  return (
    <Formik
      initialValues={
        isLogin
          ? { email: '', password: '' }
          : { name: '', email: '', password: '' }
      }
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="w-full max-w-lg mx-auto mt-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {!isLogin && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs italic"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <Field name="password">
              {({ field }: any) => (
                <Input.Password
                  {...field}
                  id="password"
                  type="password"
                  placeholder="**********"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              )}
            </Field>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs italic"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="primary" htmlType="submit" block>
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </div>
          <div className="mt-4 text-center">
            <p>
              {switchText}{' '}
              <Link to={redirectTo} className="text-blue-500">
                Click here
              </Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
