import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      if (!email || !password) throw new Error('Please fill all fields');
      
      const mockUser = {
        id: Date.now(),
        name: email.split('@')[0],
        email,
        avatar: `https://i.pravatar.cc/150?u=${email}`,
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success('Welcome back!');
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      if (!name || !email || !password) throw new Error('Please fill all fields');
      if (password.length < 6) throw new Error('Password must be 6+ characters');
      
      const mockUser = {
        id: Date.now(),
        name,
        email,
        avatar: `https://i.pravatar.cc/150?u=${email}`,
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};