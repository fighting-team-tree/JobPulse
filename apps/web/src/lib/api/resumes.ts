/**
 * Resumes API Module
 */
import apiClient from './client';
import type { ResumeVersion, ResumeAnalysis, PaginatedResponse } from './types';

export const resumesApi = {
  /**
   * Get all resume versions
   */
  list(): Promise<PaginatedResponse<ResumeVersion>> {
    return apiClient.get<PaginatedResponse<ResumeVersion>>('/api/resumes');
  },

  /**
   * Get single resume by ID
   */
  get(id: string): Promise<ResumeVersion> {
    return apiClient.get<ResumeVersion>(`/api/resumes/${id}`);
  },

  /**
   * Upload new resume
   */
  async upload(file: File, targetRole?: string): Promise<ResumeVersion> {
    const formData = new FormData();
    formData.append('file', file);
    if (targetRole) {
      formData.append('target_role', targetRole);
    }

    const token = localStorage.getItem('auth_token');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/resumes/upload`,
      {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload resume');
    }

    return response.json();
  },

  /**
   * Analyze resume
   */
  analyze(id: string): Promise<ResumeAnalysis> {
    return apiClient.post<ResumeAnalysis>(`/api/resumes/${id}/analyze`);
  },

  /**
   * Delete resume
   */
  delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/api/resumes/${id}`);
  },
};

export default resumesApi;
