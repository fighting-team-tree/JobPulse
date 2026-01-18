/**
 * Companies API Module
 */
import apiClient from './client';
import type { Company, PaginatedResponse } from './types';

export interface CompaniesListParams {
  page?: number;
  size?: number;
  search?: string;
}

export const companiesApi = {
  /**
   * Get all companies with pagination
   */
  list(params?: CompaniesListParams): Promise<PaginatedResponse<Company>> {
    return apiClient.get<PaginatedResponse<Company>>('/api/companies', { params });
  },

  /**
   * Get single company by ID
   */
  get(id: string): Promise<Company> {
    return apiClient.get<Company>(`/api/companies/${id}`);
  },

  /**
   * Search companies by name
   */
  search(query: string): Promise<Company[]> {
    return apiClient.get<Company[]>('/api/companies/search', {
      params: { q: query },
    });
  },

  /**
   * Get company research/summary
   */
  getResearch(id: string): Promise<Company> {
    return apiClient.get<Company>(`/api/companies/${id}/research`);
  },
};

export default companiesApi;
