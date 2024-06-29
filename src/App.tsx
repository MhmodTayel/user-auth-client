import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './guards/PrivateRoute';
import MainLayout from './layouts/MainLayout';
import AuthContextWrapper from './context/AuthContext';
import QueryProvider from './context/QueryProvider';

const App: React.FC = () => {
  return (
    <QueryProvider>
      <AuthContextWrapper>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
            </Routes>
          </MainLayout>
        </Router>
      </AuthContextWrapper>
    </QueryProvider>
  );
};

export default App;
