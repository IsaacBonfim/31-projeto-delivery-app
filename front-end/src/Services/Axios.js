import axios from 'axios';

export const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_BACK_END || '3001'}`,
});

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body).catch((error) => error.response);
  return data;
};

export const requestRegister = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body).catch((error) => error.response);
  console.log(data);
  return data;
};
