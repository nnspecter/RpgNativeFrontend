import { create } from "zustand";

type Store = {
    user: null | string;
    setUser: (user: Store['user']) => void;
};

export const useUserStore = create<Store>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));