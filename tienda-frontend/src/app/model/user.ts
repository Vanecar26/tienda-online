export interface User {
  id: number;
  username: string;
  email: string;
  role: 'CLIENTE' | 'ADMINISTRADOR';
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
