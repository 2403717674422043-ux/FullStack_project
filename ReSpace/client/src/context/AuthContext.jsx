import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('respace_token');
      if (token) {
        try {
          const response = await authService.getMe();
          if (response.success) {
            setUser(response.data);
          } else {
            localStorage.removeItem('respace_token');
          }
        } catch (error) {
          console.error('Failed to restore auth session:', error.message);
          localStorage.removeItem('respace_token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    if (res.success && res.data?.token) {
      localStorage.setItem('respace_token', res.data.token);
      setUser(res.data);
    }
    return res;
  };

  const register = async (userData) => {
    const res = await authService.register(userData);
    if (res.success && res.data?.token) {
      localStorage.setItem('respace_token', res.data.token);
      setUser(res.data);
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('respace_token');
    setUser(null);
  };

  const updateUserProfile = async (profileData) => {
    const res = await authService.updateProfile(profileData);
    if (res.success && res.data) {
      if (res.data.token) {
        localStorage.setItem('respace_token', res.data.token);
      }
      setUser(res.data);
    }
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile: updateUserProfile,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
