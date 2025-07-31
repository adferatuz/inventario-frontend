import apiClient from '@/shared/api';
import type { AuthResponse } from '@/entities/User/model/types';

/**
 * Logs in a user.
 * @param credentials - The user's credentials.
 * @returns A promise that resolves to the authentication response.
 */
export const login = async (credentials: {
  usernameOrEmail: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    '/auth/login',
    credentials
  );
  return response.data;
};
