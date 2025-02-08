import { jwtDecode } from 'jwt-decode';

class TokenService {
  static getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  static saveToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  static removeToken(): void {
    localStorage.removeItem('accessToken');
  }

  static isTokenExpired(token: string): boolean {
    if (!token) return true;
    try {
      const decodedToken = jwtDecode<{ exp: number }>(token);
      const currentTime = Date.now() / 1000;
      return (decodedToken?.exp || 0) < currentTime;
    } catch (error) {
      return true;
    }
  }

  static isAccessTokenExpired(): boolean {
    const token = this.getToken();
    return token ? this.isTokenExpired(token) : true;
  }
}

export default TokenService;
