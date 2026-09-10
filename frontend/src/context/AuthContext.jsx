import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('bank_token') || null);
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('bank_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [accountData, setAccountData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchAccountSummary();
        } else {
            delete axios.defaults.headers.common['Authorization'];
            setAccountData(null);
        }
    }, [token]);

    const fetchAccountSummary = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const res = await axios.get('/api/account/summary');
            if (res.data.success) {
                setAccountData(res.data.account);
            }
        } catch (err) {
            console.error('Failed to fetch account summary:', err);
            if (err.response && err.response.status === 401) {
                logout();
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (card_number, pin) => {
        const res = await axios.post('/api/auth/login', { card_number, pin });
        if (res.data.success) {
            const { token, user } = res.data;
            setToken(token);
            setUser(user);
            localStorage.setItem('bank_token', token);
            localStorage.setItem('bank_user', JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await fetchAccountSummary();
        }
        return res.data;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setAccountData(null);
        localStorage.removeItem('bank_token');
        localStorage.removeItem('bank_user');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{
            token,
            user,
            accountData,
            loading,
            login,
            logout,
            refreshAccount: fetchAccountSummary
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
