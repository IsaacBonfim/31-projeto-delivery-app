import create from 'zustand';

const useCart = create((set) => ({
  cart: localStorage.cart ? JSON.parse(localStorage.cart) : [],

  totalValue: localStorage.cart
    ? Math.round(JSON.parse(localStorage.cart)
      .reduce((acc, cur) => acc + (cur.amount * Number(cur.price)), 0) * 100) / 100
    : 0,

  clear: () => {
    set({ cart: [], totalValue: 0 });
  },

  handleProduct: (product, amount) => {
    const cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];
    const cartItem = cart.find((item) => item.id === product.id);
    let newCart = [];

    if (!cartItem) {
      const newItem = { ...product, amount };
      newCart = [...cart, newItem];
    } else {
      const index = cart.findIndex((item) => item.id === product.id);
      newCart = [...cart];
      newCart[index].amount = amount;
    }

    const totalValue = Math.round(newCart
      .reduce((acc, cur) => acc + (cur.amount * Number(cur.price)), 0) * 100) / 100;

    localStorage.cart = JSON.stringify(newCart);
    set({ cart: newCart, totalValue });
  },

  removeProduct: (product) => {
    const cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];
    const newCart = cart.filter((item) => item.id !== product.id);

    if (newCart.length === 0) {
      localStorage.removeItem('cart');
    } else {
      localStorage.cart = JSON.stringify(newCart);
    }

    const totalValue = Math.round(newCart
      .reduce((acc, cur) => acc + (cur.amount * Number(cur.price)), 0) * 100) / 100;

    set({ cart: newCart, totalValue });
  },
}));

export default useCart;
