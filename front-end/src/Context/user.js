import create from 'zustand';
import { setAccessInfo } from '../Services/LocalStorage';

const useUser = create((set) => ({
  user: localStorage.user ? JSON.parse(localStorage.user) : null,

  setUser: (user) => {
    if (user) setAccessInfo(user);

    set({ user });
  },
}));

export default useUser;
