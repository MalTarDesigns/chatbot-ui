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

    const userData = await response.json();

    if (response.ok) {
      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(userData));
    }

    return userData;
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
      body: JSON.stringify({ email }),
    });

    return response.json();
  }

  async resendVerification(email: string) {
    const response = await fetch(`${this.baseUrl}/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    return response.json();
  }

  async resetPassword(token: string, password: string) {
    try {
      const response = await fetch(`${this.baseUrl}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async logout() {
    // Remove user data from local storage
    localStorage.removeItem('user');
  }
  
}
