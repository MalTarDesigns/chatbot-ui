import { interceptedFetch } from '@/utils/interceptors';

export default class AuthService {
  apiUrl: string = 'https://phpstack-404120-3327055.cloudwaysapps.com/api/v1';
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  isEmailValid(email: string) {
    return this.emailRegex.test(email);
  }

  async request(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: Record<string, any>,
    skipInterceptor?: boolean,
    accessToken?: string
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

    const response = await interceptedFetch(url, options, accessToken);

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
    return await this.request(`${this.apiUrl}/reset-password/forgot`, 'POST', { email });
  }

  async resendVerification(email: string) {
    return await this.request(`${this.apiUrl}/resendEmailVerificationLink`, 'POST', { email });
  }

  async resetPassword(password: string, resetPasswordCode: string) {
    return await this.request(`${this.apiUrl}/reset-password/reset/${resetPasswordCode}`, 'POST', { password }, true);
  }

  async verifyEmail(emailVerificationCode: string) {
    return await this.request(`${this.apiUrl}/verify/email`, 'POST', { emailVerificationCode  }, true);
  }

  async logout() {
    // Remove user data from local storage
    localStorage.removeItem('user');
  }
}
