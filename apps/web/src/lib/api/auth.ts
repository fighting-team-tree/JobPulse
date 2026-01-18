/**
 * Auth API Module
 */
import apiClient, { setAuthToken, clearAuthToken } from './client';
import type { AuthToken, GoogleAuthUrl, GoogleCallbackRequest, User } from './types';

export const authApi = {
  /**
   * Get Google OAuth URL
   */
  getGoogleAuthUrl(): Promise<GoogleAuthUrl> {
    return apiClient.get<GoogleAuthUrl>('/api/auth/google/url');
  },

  /**
   * Handle Google OAuth callback
   */
  async googleCallback(data: GoogleCallbackRequest): Promise<AuthToken> {
    const response = await apiClient.post<AuthToken>('/api/auth/google/callback', data);
    setAuthToken(response.access_token);
    return response;
  },

  /**
   * Get current user
   */
  getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/api/users/me');
  },

  /**
   * Logout - clear token
   */
  logout(): void {
    clearAuthToken();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('auth_token');
  },
};

export default authApi;
