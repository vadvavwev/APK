/**
 * Jobs API Service
 */

import { httpClient } from './httpClient';
import { ENDPOINTS } from '../config/apiConfig';

export interface Job {
  id: number;
  title: string;
  companyName: string;
  companyLogo?: string;
  city: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  education: string;
  description?: string;
  companyIntro?: string;
  hrName?: string;
  hrPosition?: string;
  views?: number;
  publishTime?: string;
}

export interface JobSearchParams {
  keyword?: string;
  city?: string;
  education?: string;
  page?: number;
  size?: number;
}

export const jobsApi = {
  /**
   * Get jobs list with optional filters
   */
  getJobs: async (params?: JobSearchParams): Promise<{ jobs: Job[]; total: number }> => {
    const response = await httpClient.get<{ jobs: Job[]; total: number }>(ENDPOINTS.JOBS_LIST, {
      params,
    });
    return response;
  },

  /**
   * Get job detail by ID
   */
  getJobDetail: async (id: number): Promise<Job> => {
    const response = await httpClient.get<Job>(`${ENDPOINTS.JOB_DETAIL}/${id}`);
    return response;
  },

  /**
   * Search jobs
   */
  searchJobs: async (params: JobSearchParams): Promise<{ jobs: Job[]; total: number }> => {
    const response = await httpClient.get<{ jobs: Job[]; total: number }>(
      ENDPOINTS.JOB_SEARCH,
      { params }
    );
    return response;
  },
};