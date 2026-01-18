'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { applicationsApi, type ApplicationsListParams } from '@/lib/api/applications';
import type { CreateApplicationRequest, UpdateApplicationRequest, ApplicationStage } from '@/lib/api';

export const applicationKeys = {
  all: ['applications'] as const,
  lists: () => [...applicationKeys.all, 'list'] as const,
  list: (params?: ApplicationsListParams) => [...applicationKeys.lists(), params] as const,
  details: () => [...applicationKeys.all, 'detail'] as const,
  detail: (id: string) => [...applicationKeys.details(), id] as const,
  byStage: (stage: ApplicationStage) => [...applicationKeys.all, 'stage', stage] as const,
};

/**
 * Hook to get applications list
 */
export function useApplications(params?: ApplicationsListParams) {
  return useQuery({
    queryKey: applicationKeys.list(params),
    queryFn: () => applicationsApi.list(params),
  });
}

/**
 * Hook to get single application
 */
export function useApplication(id: string) {
  return useQuery({
    queryKey: applicationKeys.detail(id),
    queryFn: () => applicationsApi.get(id),
    enabled: !!id,
  });
}

/**
 * Hook to get applications by stage
 */
export function useApplicationsByStage(stage: ApplicationStage) {
  return useQuery({
    queryKey: applicationKeys.byStage(stage),
    queryFn: () => applicationsApi.getByStage(stage),
  });
}

/**
 * Hook to create application
 */
export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateApplicationRequest) => applicationsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
    },
  });
}

/**
 * Hook to update application
 */
export function useUpdateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateApplicationRequest }) =>
      applicationsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: applicationKeys.detail(variables.id) });
    },
  });
}

/**
 * Hook to update application stage (optimistic update)
 */
export function useUpdateApplicationStage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, stage }: { id: string; stage: ApplicationStage }) =>
      applicationsApi.updateStage(id, stage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.all });
    },
  });
}

/**
 * Hook to delete application
 */
export function useDeleteApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => applicationsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
    },
  });
}
