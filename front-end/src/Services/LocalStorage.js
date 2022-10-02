const CART = 'cart';
const TOTAL = 'total';
// const USER = 'user';

// export function setAccessInfo(user) {
//   localStorage.setItem(USER, JSON.stringify(user));
// }

export function setCart(cart) {
  localStorage.setItem(CART, JSON.stringify(cart));
}

export function setTotal(total) {
  localStorage.setItem(TOTAL, JSON.stringify(total));
}

export function getCart() {
  const cart = localStorage.getItem(CART);
  return JSON.parse(cart);
}

export function getTotal() {
  const total = localStorage.getItem(TOTAL);
  return JSON.parse(total);
}
