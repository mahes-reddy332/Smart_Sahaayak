import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  businessName: string;
  ownerName: string;
  phone: string;
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'SIGNUP_SUCCESS'; payload: User };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true, 
        isLoading: false 
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      };
    default:
      return state;
  }
}

const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'createdAt'> & { password: string }) => Promise<boolean>;
  logout: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('businessUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('businessUser');
        dispatch({ type: 'LOGIN_FAILURE' });
      }
    } else {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call - In real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get users from localStorage (simulating database)
      const users = JSON.parse(localStorage.getItem('businessUsers') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('businessUser', JSON.stringify(userWithoutPassword));
        dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
        return true;
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
        return false;
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  const signup = async (userData: Omit<User, 'id' | 'createdAt'> & { password: string }): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing users
      const users = JSON.parse(localStorage.getItem('businessUsers') || '[]');
      
      // Check if email already exists
      if (users.find((u: any) => u.email === userData.email)) {
        dispatch({ type: 'LOGIN_FAILURE' });
        return false;
      }
      
      // Create new user
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      
      // Save to localStorage (simulating database)
      users.push(newUser);
      localStorage.setItem('businessUsers', JSON.stringify(users));
      
      // Login the user
      const { password: _, ...userWithoutPassword } = newUser;
      localStorage.setItem('businessUser', JSON.stringify(userWithoutPassword));
      dispatch({ type: 'SIGNUP_SUCCESS', payload: userWithoutPassword });
      return true;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('businessUser');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}