import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // TODO: move to env variables
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
