const CART = 'cart';
const TOTAL = 'total';
const USER = 'user';

export function setAccessInfo(user) {
  const userLocal = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: user.token,
  };

  localStorage.setItem(USER, JSON.stringify(userLocal));
}

export function setCart(cart) {
  localStorage.setItem(CART, JSON.stringify(cart));
}

export function setTotal(total) {
  localStorage.setItem(TOTAL, JSON.stringify(total));
}

export function getUser() {
  const user = localStorage.getItem(USER);
  return JSON.parse(user);
}

export function getCart() {
  const cart = localStorage.getItem(CART);
  return JSON.parse(cart);
}

export function getTotal() {
  const total = localStorage.getItem(TOTAL);
  return JSON.parse(total);
}
