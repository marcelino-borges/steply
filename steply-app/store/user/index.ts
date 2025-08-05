import { create } from "zustand";
import { FullUserResponseDto } from "@/types/api/user";

interface UserStore {
  user: FullUserResponseDto | null;
  setUser: (user: FullUserResponseDto | null) => void;
}

export const useUser = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
