import { useContext, useMemo } from 'react';
import { AuthContext } from './authContext';
import type { AuthState, AuthAction } from './types';
import { signInWithPassword, signOut } from '@/entities/User/api/supabaseAuthService';

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

// Custom hook to expose authentication actions
export const useAuthActions = () => {
  const dispatch = useAuthDispatch();

  const actions = useMemo(() => ({
    login: async (email: string, password: string) => {
      dispatch({ type: 'LOGIN_START' });
      try {
        const authResponse = await signInWithPassword(email, password);
        if (authResponse) {
          dispatch({ type: 'LOGIN_SUCCESS', payload: { user: authResponse, token: authResponse.token } });
        } else {
          dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed: No session data' });
        }
      } catch (error: unknown) { // Changed from any to unknown
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      }
    },
    logout: async () => {
      try {
        await signOut();
        dispatch({ type: 'LOGOUT' });
      } catch (error: unknown) { // Changed from any to unknown
        let errorMessage = 'An unknown error occurred during logout';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        console.error('Logout error:', errorMessage);
      }
    },
  }), [dispatch]);

  return actions;
};
