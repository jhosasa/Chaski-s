import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('chaski_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      name: 'Mateo Araka',
      email,
      role: 'buyer',
      profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      address: 'Cbba | Av. Circunvalación',
      phoneNumber: '74342342'
    };
    
    setUser(mockUser);
    localStorage.setItem('chaski_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      name: 'Mateo Araka',
      email: 'mateo@gmail.com',
      role: 'buyer',
      profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      address: 'Cbba | Av. Circunvalación',
      phoneNumber: '74342342'
    };
    
    setUser(mockUser);
    localStorage.setItem('chaski_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const loginWithFacebook = async () => {
    await loginWithGoogle(); // Same mock implementation
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('chaski_user');
  };

  const register = async (userData: Partial<User>) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'buyer',
      ...userData
    };
    
    setUser(newUser);
    localStorage.setItem('chaski_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  return {
    user,
    login,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    register,
    isLoading
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};