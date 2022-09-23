import axios from 'axios';

export const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_BACK_END || '3001'}`,
});

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};
