import axios from 'axios';
import { supabase } from '@/shared/lib/supabase';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // Apuntando al backend local
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
