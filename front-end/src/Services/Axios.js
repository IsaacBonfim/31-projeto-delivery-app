import axios from 'axios';

export const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}`,
});

export const requestAccess = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body).catch((error) => error.response);
  return data;
};

export const requestProducts = async (endpoint) => {
  const { data } = await api.get(endpoint).catch((error) => error.response);
  return data;
};

export const requestSellers = async (endpoint) => {
  const { data } = await api.get(endpoint).catch((error) => error.response);
  return data;
};

export const requestOrder = (endpoint, body, token) => api
  .post(endpoint, body, token)
  .then(({ data }) => (data))
  .catch((error) => error.response);
