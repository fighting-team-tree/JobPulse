'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { jobsApi } from '@/lib/api';
import type { JobSearchParams, CrawlRequest } from '@/lib/api';

export const jobKeys = {
  all: ['jobs'] as const,
  lists: () => [...jobKeys.all, 'list'] as const,
  list: (params?: JobSearchParams) => [...jobKeys.lists(), params] as const,
  details: () => [...jobKeys.all, 'detail'] as const,
  detail: (id: string) => [...jobKeys.details(), id] as const,
  search: (params: JobSearchParams) => [...jobKeys.all, 'search', params] as const,
};

/**
 * Hook to get jobs list
 */
export function useJobs(params?: JobSearchParams) {
  return useQuery({
    queryKey: jobKeys.list(params),
    queryFn: () => jobsApi.list(params),
  });
}

/**
 * Hook to get single job
 */
export function useJob(id: string) {
  return useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: () => jobsApi.get(id),
    enabled: !!id,
  });
}

/**
 * Hook to search jobs
 */
export function useJobSearch(params: JobSearchParams) {
  return useQuery({
    queryKey: jobKeys.search(params),
    queryFn: () => jobsApi.search(params),
    enabled: !!params.keyword,
  });
}

/**
 * Hook to trigger job crawling
 */
export function useCrawlJobs() {
  return useMutation({
    mutationFn: (data: CrawlRequest) => jobsApi.crawl(data),
  });
}
