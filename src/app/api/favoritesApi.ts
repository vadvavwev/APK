/**
 * Favorites API Service
 */

import { httpClient } from './httpClient';
import { ENDPOINTS } from '../config/apiConfig';

export interface Favorite {
  id: number;
  userId: number;
  jobId: number;
  jobTitle?: string;
  companyName?: string;
  createTime?: string;
}

export const favoritesApi = {
  /**
   * Get my favorites
   */
  getFavorites: async (): Promise<Favorite[]> => {
    const response = await httpClient.get<Favorite[]>(ENDPOINTS.FAVORITES);
    return response;
  },

  /**
   * Add job to favorites
   */
  addFavorite: async (jobId: number): Promise<Favorite> => {
    const response = await httpClient.post<Favorite>(ENDPOINTS.FAVORITE_ADD, { jobId });
    return response;
  },

  /**
   * Remove from favorites
   */
  removeFavorite: async (jobId: number): Promise<void> => {
    await httpClient.delete(`${ENDPOINTS.FAVORITE_REMOVE}/${jobId}`);
  },
};