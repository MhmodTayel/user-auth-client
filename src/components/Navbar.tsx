import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { AuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const isLoginRoute = location.pathname === '/login';
  const isRegisterRoute = location.pathname === '/register';
  const isLoggedin = authContext?.accessToken;
  const logout = authContext?.logout;

  const menuItems = [
    {
      key: 'home',
      label: <Link to="/">Home</Link>,
      className: 'ml-1',
    },
  ];

  if (isRegisterRoute) {
    menuItems.push({
      key: 'login',
      label: <Link to="/login">Login</Link>,
      className: '',
    });
  }

  if (isLoginRoute) {
    menuItems.push({
      key: 'register',
      label: <Link to="/register">Register</Link>,
      className: '',
    });
  }

  if (isLoggedin) {
    menuItems.push({
      key: 'logout',
      label: <a onClick={logout}>Logout</a>,
      className: '',
    });
  }

  return (
    <div className="">
      <Menu
        mode="horizontal"
        className="flex justify-end"
        selectedKeys={[
          isLoginRoute ? 'login' : isRegisterRoute ? 'register' : '',
        ]}
        items={menuItems}
      />
    </div>
  );
};

export default Navbar;
