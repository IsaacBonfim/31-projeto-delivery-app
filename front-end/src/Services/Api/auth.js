import api from './config';

const auth = {
  login: async (email, password) => {
    try {
      const { data } = await api.post('login', { email, password });

      return { result: data, success: true };
    } catch (err) {
      const { response: { data: { message } } } = err;

      return { message, success: false };
    }
  },
};

export default auth;
