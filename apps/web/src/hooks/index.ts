/**
 * Custom Hooks Exports
 */

// Auth
export { useCurrentUser, useGoogleAuth, useLogout, authKeys } from './useAuth';

// Applications
export {
  useApplications,
  useApplication,
  useApplicationsByStage,
  useCreateApplication,
  useUpdateApplication,
  useUpdateApplicationStage,
  useDeleteApplication,
  applicationKeys,
} from './useApplications';

// Jobs
export { useJobs, useJob, useJobSearch, useCrawlJobs, jobKeys } from './useJobs';

// Resumes
export {
  useResumes,
  useResume,
  useUploadResume,
  useAnalyzeResume,
  useDeleteResume,
  resumeKeys,
} from './useResumes';
