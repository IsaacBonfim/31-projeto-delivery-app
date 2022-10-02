import api from './config';

const auth = {
  login: async (body) => {
    try {
      const { data } = await api.post('login', body);

      return { result: data, success: true };
    } catch (err) {
      const { response: { data: { message } } } = err;

      return { message, success: false };
    }
  },

  register: async (body) => {
    try {
      const { data } = await api.post('register', body);

      return { result: data, success: true };
    } catch (err) {
      const { response: { data: { message } } } = err;

      return { message, success: false };
    }
  },
};

export default auth;
