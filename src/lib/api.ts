/* eslint-disable */


import axios, { AxiosError } from 'axios';
import { Campaign, RuleGroup, Segment } from '../types';
import { getSession } from 'next-auth/react'; // Import next-auth's getSession

const api = axios.create({
  baseURL: 'https://xeno-mini-crm-server.onrender.com/api',
  timeout: 10000, // 10 second timeout
});

// Helper function for consistent error handling
const handleApiError = (error: AxiosError) => {
  if (error.response) {
    // Server responded with error status
    const errorMessage = (error.response.data as { message?: string })?.message || 'Request failed';
    throw new Error(errorMessage);
  } else if (error.request) {
    // No response received
    throw new Error('Network error - no response received');
  } else {
    // Request setup error
    throw new Error('Request setup error');
  }
};

// Helper function to attach Authorization header (use session)
const attachAuthHeader = async (config: any) => {
  const session = await getSession();
  if (session ) {
    // config.headers.Authorization = `Bearer ${session.id_token}`; // Use id_token from next-auth  right now comment, will correct it.
  }
  return config;
};

// Intercept requests to attach authorization token
api.interceptors.request.use(attachAuthHeader, error => Promise.reject(error));

export const createCampaign = async (
  campaignData: {
    name: string;
    rules: RuleGroup;
    messageTemplate: string;
    audienceSize: number;
  }
): Promise<Campaign> => {
  try {
    const response = await api.post<Campaign>('/campaigns', campaignData);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error; // Re-throw after handling
  }
};

export const evaluateSegment = async (
  rules: RuleGroup
): Promise<{ count: number }> => {
  try {
    const response = await api.post<{ count: number }>('/segments/evaluate', { rules });
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};

export const getCampaigns = async (): Promise<Campaign[]> => {
  try {
    const response = await api.get<Campaign[]>('/campaigns');
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};

export const getCampaignDetails = async (id: string): Promise<Campaign> => {
  try {
    const response = await api.get<Campaign>(`/campaigns/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};
