// User type
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Register request payload
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Login request payload
export interface LoginRequest {
  email: string;
  password: string;
}

// Auth response
export interface AuthResponse {
  accessToken: string;
  user: User;
}
