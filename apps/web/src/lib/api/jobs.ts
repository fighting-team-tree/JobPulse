/**
 * Jobs API Module
 */
import apiClient from './client';
import type { Job, JobSearchParams, PaginatedResponse, CrawlRequest, CrawlResult } from './types';

export const jobsApi = {
  /**
   * Get all jobs with pagination and filters
   */
  list(params?: JobSearchParams): Promise<PaginatedResponse<Job>> {
    return apiClient.get<PaginatedResponse<Job>>('/api/jobs', { params });
  },

  /**
   * Get single job by ID
   */
  get(id: string): Promise<Job> {
    return apiClient.get<Job>(`/api/jobs/${id}`);
  },

  /**
   * Search jobs
   */
  search(params: JobSearchParams): Promise<PaginatedResponse<Job>> {
    return apiClient.get<PaginatedResponse<Job>>('/api/jobs/search', { params });
  },

  /**
   * Trigger job crawling
   */
  crawl(data: CrawlRequest): Promise<CrawlResult[]> {
    return apiClient.post<CrawlResult[]>('/api/crawlers/crawl', data);
  },

  /**
   * Get crawl status
   */
  getCrawlStatus(taskId: string): Promise<{ status: string; results?: CrawlResult[] }> {
    return apiClient.get(`/api/crawlers/status/${taskId}`);
  },
};

export default jobsApi;
