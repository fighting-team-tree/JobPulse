'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/lib/api';
import type { GoogleCallbackRequest } from '@/lib/api';

export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

/**
 * Hook to get current user
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => authApi.getCurrentUser(),
    retry: false,
    enabled: authApi.isAuthenticated(),
  });
}

/**
 * Hook to handle Google OAuth
 */
export function useGoogleAuth() {
  const queryClient = useQueryClient();

  const getAuthUrl = useMutation({
    mutationFn: () => authApi.getGoogleAuthUrl(),
    onSuccess: (data) => {
      window.location.href = data.url;
    },
  });

  const handleCallback = useMutation({
    mutationFn: (data: GoogleCallbackRequest) => authApi.googleCallback(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });

  return { getAuthUrl, handleCallback };
}

/**
 * Hook to handle logout
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      authApi.logout();
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
