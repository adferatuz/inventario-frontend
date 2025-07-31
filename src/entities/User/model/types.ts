export interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'USER';
}

export interface AuthResponse {
  token: string;
  type: 'Bearer';
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'USER';
}
