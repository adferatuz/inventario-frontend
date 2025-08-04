import { createContext } from 'react';
import type { AuthState, AuthAction } from './types';

// Define the shape of the context value
export type AuthContextType = [AuthState, React.Dispatch<AuthAction>];

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
