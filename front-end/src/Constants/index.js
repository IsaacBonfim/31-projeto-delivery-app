export const MIN_NAME_LENGTH = 12;
export const MIN_PASSWORD_LENGTH = 6;
export const NAVIGATE_BACK = -1;

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
