import { supabase } from '@/shared/lib/supabase';
import type { AuthResponse } from '@/entities/User/model/types';

/**
 * Signs in a user with email and password using Supabase.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns A promise that resolves to the Supabase session data or an error.
 */
export const signInWithPassword = async (email: string, password: string): Promise<AuthResponse | null> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  // Map Supabase session data to our AuthResponse type
  if (data.session && data.user) {
    return {
      token: data.session.access_token,
      type: 'Bearer',
      username: data.user.user_metadata?.username || data.user.email || '',
      email: data.user.email || '',
      firstName: data.user.user_metadata?.firstName || '',
      lastName: data.user.user_metadata?.lastName || '',
      role: data.user.user_metadata?.role || 'USER', // Default to USER if not set
    };
  }
  return null; // Should not happen if no error and data.session exists
};

/**
 * Signs out the current user from Supabase.
 * @returns A promise that resolves when the user is signed out.
 */
export const signOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};
