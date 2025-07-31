import React, { createContext, useReducer, useContext } from 'react';
import { authReducer, initialAuthState } from './authReducer';
import type { AuthState, AuthAction } from './types';

// Define the shape of the context value
type AuthContextType = [AuthState, React.Dispatch<AuthAction>];

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component that manages the authentication state using useReducer.
 * It provides the state and dispatch function to its children via AuthContext.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth state
export const useAuthState = (): AuthState => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context[0];
};

// Custom hook to use the auth dispatch function
export const useAuthDispatch = (): React.Dispatch<AuthAction> => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within an AuthProvider');
  }
  return context[1];
};
