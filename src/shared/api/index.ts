import axios from 'axios';
import { supabase } from '@/shared/lib/supabase';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // TODO: move to env variables
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the Authorization header
apiClient.interceptors.request.use(
  async (config) => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
