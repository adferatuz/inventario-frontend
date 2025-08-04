import React, { useReducer, useEffect } from 'react';
import { authReducer, initialAuthState } from './authReducer';
import { AuthContext } from './authContext';
import { supabase } from '@/shared/lib/supabase';


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
