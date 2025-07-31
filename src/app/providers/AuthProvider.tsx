import React, { createContext, useReducer, useContext, useEffect, useMemo } from 'react';
import { authReducer, initialAuthState } from './authReducer';
import type { AuthState, AuthAction } from './types';
import { supabase } from '@/shared/lib/supabase';
import { signInWithPassword, signOut } from '@/entities/User/api/supabaseAuthService';

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

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Dispatch LOGIN_SUCCESS if a session exists
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: {
              username: session.user.user_metadata?.username || session.user.email || '',
              email: session.user.email || '',
              firstName: session.user.user_metadata?.firstName || '',
              lastName: session.user.user_metadata?.lastName || '',
              role: session.user.user_metadata?.role || 'USER', // Default role
            },
            token: session.access_token,
          },
        });
      } else {
        // Dispatch LOGOUT if no session
        dispatch({ type: 'LOGOUT' });
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user: {
                username: session.user.user_metadata?.username || session.user.email || '',
                email: session.user.email || '',
                firstName: session.user.user_metadata?.firstName || '',
                lastName: session.user.user_metadata?.lastName || '',
                role: session.user.user_metadata?.role || 'USER',
              },
              token: session.access_token,
            },
          });
        } else if (event === 'SIGNED_OUT') {
          dispatch({ type: 'LOGOUT' });
        }
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
      } catch (error: any) {
        dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      }
    },
    logout: async () => {
      try {
        await signOut();
        dispatch({ type: 'LOGOUT' });
      } catch (error: any) {
        // Handle logout error if necessary, though usually less critical
        console.error('Logout error:', error);
      }
    },
  }), [dispatch]);

  return actions;
};
