import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FullUserResponseDto } from "@/types/api/user";
import { ASYNC_STORAGE_KEYS } from "@/constants/async-storage";

interface UserStore {
  user: FullUserResponseDto | null;
  setUser: (user: FullUserResponseDto | null) => void;
  clearUser: () => void;
}

export const useUser = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: ASYNC_STORAGE_KEYS.USER_STORAGE,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);
