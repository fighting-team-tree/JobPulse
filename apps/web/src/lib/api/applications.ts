/**
 * Applications API Module
 */
import apiClient from './client';
import type {
  Application,
  CreateApplicationRequest,
  UpdateApplicationRequest,
  PaginatedResponse,
  ApplicationStage,
} from './types';

export interface ApplicationsListParams {
  page?: number;
  size?: number;
  stage?: ApplicationStage;
  search?: string;
}

export const applicationsApi = {
  /**
   * Get all applications with pagination
   */
  list(params?: ApplicationsListParams): Promise<PaginatedResponse<Application>> {
    return apiClient.get<PaginatedResponse<Application>>('/api/applications', { params });
  },

  /**
   * Get single application by ID
   */
  get(id: string): Promise<Application> {
    return apiClient.get<Application>(`/api/applications/${id}`);
  },

  /**
   * Create new application
   */
  create(data: CreateApplicationRequest): Promise<Application> {
    return apiClient.post<Application>('/api/applications', data);
  },

  /**
   * Update application
   */
  update(id: string, data: UpdateApplicationRequest): Promise<Application> {
    return apiClient.patch<Application>(`/api/applications/${id}`, data);
  },

  /**
   * Update application stage
   */
  updateStage(id: string, stage: ApplicationStage): Promise<Application> {
    return apiClient.patch<Application>(`/api/applications/${id}`, { stage });
  },

  /**
   * Delete application
   */
  delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/api/applications/${id}`);
  },

  /**
   * Get applications by stage (for pipeline view)
   */
  getByStage(stage: ApplicationStage): Promise<Application[]> {
    return apiClient.get<Application[]>('/api/applications', {
      params: { stage },
    }).then((res) => (res as unknown as PaginatedResponse<Application>).items || res as Application[]);
  },
};

export default applicationsApi;
