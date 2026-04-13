import { create } from "zustand";
 
interface UserStore {
  isAuthenticated: boolean;
  setAuthenticated: (val: boolean) => void;
}
 
export const useUserStore = create<UserStore>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (val: boolean) => set({ isAuthenticated: val }),
}));
 