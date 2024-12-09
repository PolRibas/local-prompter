// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: number;
  username: string;
  email: string;
  // Otros campos si es necesario
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  guestLogin: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => { },
  guestLogin: async () => false,
});

interface AuthProviderProps {
  children: ReactNode;
}

interface DecodedToken {
  id: number;
  email: string;
  exp: number;
  // Otros campos si es necesario
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          fetchProfile();
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        logout();
      }
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('profile/');
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      logout();
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post('token/', { username, password });
      const { access, refresh } = response.data;
      localStorage.setItem('token', access);
      await fetchProfile();
      return true;
    } catch (error: any) {
      console.error('Error en login:', error.response?.data?.detail || error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Nueva función para login como invitado
  const guestLogin = async (): Promise<boolean> => {
    try {
      // Usa las credenciales del usuario invitado
      const response = await api.post('token/', { username: 'guest', password: 'myguestpassword' });
      const { access, refresh } = response.data;
      localStorage.setItem('token', access);
      await fetchProfile();
      return true;
    } catch (error: any) {
      console.error('Error en login de invitado:', error.response?.data?.detail || error.message);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, guestLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
