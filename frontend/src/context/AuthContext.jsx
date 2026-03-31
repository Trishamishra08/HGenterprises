import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('hg_current_user'));
        if (storedUser) setUser(storedUser);
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // In a real app, verify password hash. Here we mock it by checking the users list.
        const users = JSON.parse(localStorage.getItem('hg_users')) || [];
        const validUser = users.find(u => u.email === email && u.password === password);

        if (validUser) {
            const { password, ...userWithoutPass } = validUser;
            setUser(userWithoutPass);
            localStorage.setItem('hg_current_user', JSON.stringify(userWithoutPass));
            return { success: true };
        }

        // Admin Backdoor for testing
        if (email === 'admin@hgenterprises.com' && password === 'admin123') {
            const adminUser = { id: 'admin_01', name: 'Super Admin', email, role: 'admin' };
            setUser(adminUser);
            localStorage.setItem('hg_current_user', JSON.stringify(adminUser));
            return { success: true };
        }

        return { success: false, message: 'Invalid credentials' };
    };

    const signup = (userData) => {
        const users = JSON.parse(localStorage.getItem('hg_users')) || [];

        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: 'User already exists' };
        }

        const newUser = {
            id: `user_${Date.now()}`,
            role: 'user',
            points: 0,
            usedCoupons: [],
            ...userData
        };

        users.push(newUser);
        localStorage.setItem('hg_users', JSON.stringify(users));

        // Auto login after signup
        const { password, ...userWithoutPass } = newUser;
        setUser(userWithoutPass);
        localStorage.setItem('hg_current_user', JSON.stringify(userWithoutPass));

        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('hg_current_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
