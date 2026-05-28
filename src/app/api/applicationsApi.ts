/**
 * Applications API Service
 */

import { httpClient } from './httpClient';
import { ENDPOINTS } from '../config/apiConfig';

export interface Application {
  id: number;
  userId: number;
  jobId: number;
  status: 'PENDING' | 'VIEWED' | 'INTERVIEW' | 'REJECTED' | 'ACCEPTED';
  jobTitle?: string;
  companyName?: string;
  createTime?: string;
}

export const applicationsApi = {
  /**
   * Get my applications
   */
  getMyApplications: async (): Promise<Application[]> => {
    const response = await httpClient.get<Application[]>(ENDPOINTS.APPLICATIONS_MY);
    return response;
  },

  /**
   * Apply for a job
   */
  apply: async (jobId: number): Promise<Application> => {
    const response = await httpClient.post<Application>(ENDPOINTS.APPLICATIONS, { jobId });
    return response;
  },

  /**
   * Cancel application
   */
  cancel: async (id: number): Promise<void> => {
    await httpClient.delete(`${ENDPOINTS.APPLICATION_CANCEL}/${id}`);
  },
};