/**
 * API Types - TypeScript definitions for API responses
 */

// ================================
// Common Types
// ================================

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// ================================
// User Types
// ================================

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  target_role: string | null;
  target_level: string | null;
  target_location: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateUserRequest {
  name?: string;
  target_role?: string;
  target_level?: string;
  target_location?: string;
}

// ================================
// Auth Types
// ================================

export interface AuthToken {
  access_token: string;
  token_type: string;
}

export interface GoogleAuthUrl {
  url: string;
}

export interface GoogleCallbackRequest {
  code: string;
  state?: string;
}

// ================================
// Application Types
// ================================

export type ApplicationStage =
  | 'interested'
  | 'applied'
  | 'screening'
  | 'interview_1'
  | 'interview_2'
  | 'offer'
  | 'accepted'
  | 'rejected';

export interface Application {
  id: string;
  user_id: string;
  job_id: string | null;
  company_name: string;
  position_title: string | null;
  stage: ApplicationStage;
  applied_at: string | null;
  channel: string | null;
  job_url: string | null;
  resume_version_id: string | null;
  notes: string | null;
  next_action_at: string | null;
  next_action_memo: string | null;
  tags: string[] | null;
  source: string | null;
  confidence: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateApplicationRequest {
  company_name: string;
  position_title?: string;
  stage?: ApplicationStage;
  applied_at?: string;
  channel?: string;
  job_url?: string;
  notes?: string;
  tags?: string[];
}

export interface UpdateApplicationRequest {
  company_name?: string;
  position_title?: string;
  stage?: ApplicationStage;
  applied_at?: string;
  channel?: string;
  job_url?: string;
  notes?: string;
  next_action_at?: string;
  next_action_memo?: string;
  tags?: string[];
}

// ================================
// Company Types
// ================================

export interface Company {
  id: string;
  name: string;
  domain: string | null;
  normalized_key: string | null;
  summary_json: Record<string, unknown> | null;
  sources_json: Record<string, unknown> | null;
  logo_url: string | null;
  updated_at: string;
}

// ================================
// Job Types
// ================================

export interface Job {
  id: string;
  company_id: string | null;
  title: string;
  location: string | null;
  level: string | null;
  jd_text: string | null;
  jd_summary_json: Record<string, unknown> | null;
  url: string | null;
  source: string | null;
  status: string | null;
  last_checked_at: string | null;
  created_at: string;
  company?: Company;
}

export interface JobSearchParams {
  keyword?: string;
  location?: string;
  level?: string;
  source?: string;
  page?: number;
  size?: number;
}

// ================================
// Interview Types
// ================================

export type InterviewType = 'phone' | 'video' | 'onsite' | 'task';

export interface Interview {
  id: string;
  application_id: string;
  datetime: string;
  type: InterviewType | null;
  location_or_link: string | null;
  memo: string | null;
  created_at: string;
}

export interface CreateInterviewRequest {
  application_id: string;
  datetime: string;
  type?: InterviewType;
  location_or_link?: string;
  memo?: string;
}

// ================================
// Resume Types
// ================================

export interface ResumeVersion {
  id: string;
  user_id: string;
  file_url: string | null;
  original_filename: string | null;
  text_extract: string | null;
  target_role: string | null;
  analysis_json: ResumeAnalysis | null;
  score: number | null;
  pii_masked: boolean;
  retention_until: string | null;
  created_at: string;
}

export interface ResumeAnalysis {
  summary: string;
  skills: string[];
  experience_years: number;
  strengths: string[];
  improvements: string[];
  keywords: string[];
}

// ================================
// Connection Types
// ================================

export type ConnectionProvider = 'google_gmail' | 'google_calendar';
export type ConnectionStatus = 'active' | 'expired' | 'revoked';

export interface Connection {
  id: string;
  user_id: string;
  provider: ConnectionProvider;
  status: ConnectionStatus;
  scopes: string[] | null;
  last_sync_at: string | null;
  created_at: string;
}

// ================================
// Notification Types
// ================================

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  action_url: string | null;
  created_at: string;
}

// ================================
// Crawler Types
// ================================

export type CrawlerSource = 'wanted' | 'jobkorea' | 'jobplanet' | 'linkedin';

export interface CrawlRequest {
  sources: CrawlerSource[];
  keyword: string;
  location?: string;
  max_pages?: number;
}

export interface CrawlResult {
  source: CrawlerSource;
  jobs_found: number;
  status: 'success' | 'failed';
  error?: string;
}

// ================================
// Dashboard Types
// ================================

export interface DashboardStats {
  total_applications: number;
  by_stage: Record<ApplicationStage, number>;
  this_week: number;
  interviews_scheduled: number;
  offers_received: number;
}

export interface UpcomingEvent {
  id: string;
  type: 'interview' | 'deadline' | 'follow_up';
  title: string;
  company_name: string;
  datetime: string;
  application_id: string;
}
