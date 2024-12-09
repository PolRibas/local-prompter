// context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface User {
    id: number;
    email: string;
    // Añade otros campos según tus necesidades
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: async () => false,
    logout: () => { },
});

interface AuthProviderProps {
    children: ReactNode;
}

interface DecodedToken {
    id: number;
    email: string;
    exp: number; // Expiración del token en segundos
    // Añade otros campos si es necesario
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Verificar si hay un token en localStorage al cargar la aplicación
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);
                // Verificar si el token ha expirado
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    const currentUser: User = {
                        id: decoded.id,
                        email: decoded.email,
                        // Añade otros campos según tus necesidades
                    };
                    setUser(currentUser);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error al decodificar el token:', error);
                logout();
            }
        }
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            // Hacer una solicitud POST al endpoint de login (mockeado)
            const response = await axios.post('/api/login', { email, password });

            const { token } = response.data;

            // Guardar el token en localStorage
            localStorage.setItem('token', token);

            // Decodificar el token para obtener información del usuario
            const decoded: DecodedToken = jwtDecode(token);

            const currentUser: User = {
                id: decoded.id,
                email: decoded.email,
                // Añade otros campos según tus necesidades
            };

            // Actualizar el estado de autenticación
            setUser(currentUser);
            setIsAuthenticated(true);

            return true;
        } catch (error: unknown) {
            console.error('Error en login:', error);
            return false;
        }
    };

    const logout = () => {
        // Eliminar el token de localStorage
        localStorage.removeItem('token');

        // Actualizar el estado de autenticación
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value= {{ isAuthenticated, user, login, logout }}>
        { children }
        </AuthContext.Provider>
    );
};
