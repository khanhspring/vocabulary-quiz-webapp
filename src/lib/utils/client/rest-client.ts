import axios, { AxiosRequestConfig } from 'axios';
import { Key } from 'swr';

const instance = axios.create({
  baseURL: process.env.API_URL,
});

const client = { accessToken: '' };

instance.interceptors.request.use((config) => {
  const { accessToken } = client;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export const fetcher = (key: Key, config?: AxiosRequestConfig) => {
  const url = Array.isArray(key) ? key[0] : key;
  return instance.get(url, config).then((response) => response.data);
};

export const setAccessToken = (token?: string) => {
  client.accessToken = token || client.accessToken;
};

export default instance;
