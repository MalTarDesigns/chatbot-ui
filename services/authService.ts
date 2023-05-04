export default class AuthService {
  baseUrl: string = 'https://phpstack-404120-3327055.cloudwaysapps.com/api/v1';

  async signUp(user: { email: string; password: string }) {
    const response = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return response.json();
  }

  async login(user: { email: string; password: string }) {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return response.json();
  }

  async verify(token: string) {
    const response = await fetch(`${this.baseUrl}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    return response.json();
  }

  async forgotPassword(email: string) {
    const response = await fetch(`${this.baseUrl}/forgotpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    });

    return response.json();
  }

  async resendVerification(email: string) {
    const response = await fetch(`${this.baseUrl}/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    });

    return response.json();
  }
}
