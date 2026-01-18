'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { resumesApi } from '@/lib/api';

export const resumeKeys = {
  all: ['resumes'] as const,
  lists: () => [...resumeKeys.all, 'list'] as const,
  details: () => [...resumeKeys.all, 'detail'] as const,
  detail: (id: string) => [...resumeKeys.details(), id] as const,
};

/**
 * Hook to get resumes list
 */
export function useResumes() {
  return useQuery({
    queryKey: resumeKeys.lists(),
    queryFn: () => resumesApi.list(),
  });
}

/**
 * Hook to get single resume
 */
export function useResume(id: string) {
  return useQuery({
    queryKey: resumeKeys.detail(id),
    queryFn: () => resumesApi.get(id),
    enabled: !!id,
  });
}

/**
 * Hook to upload resume
 */
export function useUploadResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, targetRole }: { file: File; targetRole?: string }) =>
      resumesApi.upload(file, targetRole),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resumeKeys.lists() });
    },
  });
}

/**
 * Hook to analyze resume
 */
export function useAnalyzeResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => resumesApi.analyze(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: resumeKeys.detail(id) });
    },
  });
}

/**
 * Hook to delete resume
 */
export function useDeleteResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => resumesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resumeKeys.lists() });
    },
  });
}
