import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface User {
  id: string;
  username: string;
  email: string;
}

export const login = async (username: string, password: string) => {
  const response = await api.post('/login', { username, password });
  return response.data;
};

export const signup = async (username: string, email: string, password: string) => {
  const response = await api.post('/signup', { username, email, password });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/logout');
  return response.data;
};

export const checkAuth = async () => {
  try {
    const response = await api.get('/me');
    return response.data;
  } catch {
    return null;
  }
};

export default api;
