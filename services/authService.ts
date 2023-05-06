import { interceptedFetch } from '@/utils/interceptors';

export default class AuthService {
  apiUrl: string = 'https://phpstack-404120-3327055.cloudwaysapps.com/api/v1';

  async request(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: Record<string, any>,
    skipInterceptor?: boolean
  ) {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    if (skipInterceptor) {
      headers.append("skipInterceptor", "true");
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await interceptedFetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  }

  async signUp(user: { name: string, email: string; password: string }) {
    return await this.request(`${this.apiUrl}/signup`, 'POST', user);
  }

  async login(user: { email: string; password: string }) {
    const userData = await this.request(`${this.apiUrl}/login`, 'POST', user);
    console.log(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  }

  async verify(token: string) {
    return await this.request(`${this.apiUrl}/verify`, 'POST', { token }, true);
  }

  async forgotPassword(email: string) {
    return await this.request(`${this.apiUrl}/forgot-password`, 'POST', { email });
  }

  async resendVerification(email: string) {
    return await this.request(`${this.apiUrl}/resend-verification`, 'POST', { email });
  }

  async resetPassword(token: string, password: string) {
    try {
      return await this.request(`${this.apiUrl}/reset-password`, 'POST', { token, password });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async logout() {
    // Remove user data from local storage
    localStorage.removeItem('user');
  }
}
