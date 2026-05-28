/**
 * API Configuration
 * Handles base URL and request configuration
 */

// Get API base URL from environment
const getApiBaseUrl = (): string => {
  // Try Vite environment variable first
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) return envUrl;

  // Fallback to localhost for development
  return 'http://localhost:8080/api';
};

// Get WebSocket URL
const getWsUrl = (): string => {
  const envUrl = import.meta.env.VITE_WS_URL;
  if (envUrl) return envUrl;
  return 'ws://localhost:8080/api';
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  WS_URL: getWsUrl(),
  TIMEOUT: 30000,
  RETRY_TIMES: 3,
} as const;

export const ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',

  // User
  USER_PROFILE: '/users/profile',
  USER_UPDATE: '/users/update',
  USER_AVATAR: '/users/avatar',

  // Jobs
  JOBS_LIST: '/jobs',
  JOB_DETAIL: '/jobs',
  JOB_SEARCH: '/jobs/search',
  JOB_CREATE: '/jobs',
  JOB_UPDATE: '/jobs',
  JOB_DELETE: '/jobs',

  // Applications
  APPLICATIONS_MY: '/applications/my',
  APPLICATIONS: '/applications',
  APPLICATION_CANCEL: '/applications',

  // Favorites
  FAVORITES: '/favorites',
  FAVORITE_ADD: '/favorites',
  FAVORITE_REMOVE: '/favorites',

  // Resume/Education
  EDUCATION_LIST: '/educations',
  EDUCATION_ADD: '/educations',
  EDUCATION_UPDATE: '/educations',
  EDUCATION_DELETE: '/educations',

  // Work Experience
  WORK_LIST: '/works',
  WORK_ADD: '/works',
  WORK_UPDATE: '/works',
  WORK_DELETE: '/works',
} as const;