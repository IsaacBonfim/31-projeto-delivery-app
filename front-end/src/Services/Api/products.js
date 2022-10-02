import api from './config';

const products = {
  list: async () => {
    try {
      const { data } = await api.get('customer/products');

      return { result: data, success: true };
    } catch (err) {
      const { response: { data: { message } } } = err;

      return { message, success: false };
    }
  },
};

export default products;
