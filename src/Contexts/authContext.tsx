import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {doSignOut} from "../Auth/Auth";

// Cookie utility functions
const setCookie = (name: string, value: string, days: number) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/; Secure; SameSite=Strict`;
};

const getCookie = (name: string): string | null => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

const eraseCookie = (name: string) => {
    document.cookie = `${name}=; Max-Age=-99999999; path=/; Secure; SameSite=Strict`;
};

// Define the context types
interface AuthContextType {
    isLoggedIn: boolean;
    accessToken: string | null;
    login: (token: string, refresh: string) => void;
    logout: () => void;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the provider props type
interface AuthProviderProps {
    children: ReactNode;
}

// Create a provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const login = (token: string, refresh: string) => {
        try {
            setAccessToken(token);
            setIsLoggedIn(true);
            setCookie('accessToken', token, 1); // Expires in 1 day
            setCookie('refreshToken', refresh, 1); // Expires in 1 day
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const logout = () => {
        try {
            setAccessToken(null);
            setIsLoggedIn(false);
            eraseCookie('accessToken');
            eraseCookie('refreshToken');
            doSignOut();
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        const storedAccessToken = getCookie('accessToken');
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

