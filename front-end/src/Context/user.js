import create from 'zustand';

const useUser = create((set) => ({
  user: localStorage.user ? JSON.parse(localStorage.user) : null,

  setUser: (user) => {
    if (user) {
      localStorage.user = JSON.stringify(user);
    } else {
      localStorage.removeItem('user');
    }

    set({ user });
  },
}));

export default useUser;
