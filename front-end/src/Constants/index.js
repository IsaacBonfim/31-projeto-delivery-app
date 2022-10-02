export const MIN_NAME_LENGTH = 12;
export const MIN_PASSWORD_LENGTH = 6;
export const NAVIGATE_BACK = -1;
export const ID_LENGTH = 4;

export const ORDER_STATUS_OPTIONS = {
  pendente: {
    color: 'yellow.400',
  },

  preparando: {
    color: 'green.400',
  },

  entregue: {
    color: 'cyan.400',
  },
};

export const ROLES_OPTIONS = {
  administrator: {
    main: '/admin/manage',
    permPaths: ['admin', 'seller'],
  },

  seller: {
    main: '/seller/orders',
    permPaths: ['seller'],
  },

  customer: {
    main: '/customer/products',
    permPaths: ['customer'],
  },
};
