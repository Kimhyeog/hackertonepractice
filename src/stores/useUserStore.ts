import { checkLoginStatus, getUserInfo, logout } from "@/api/user";
import { UserInfoResponse } from "@/types/user";
import { create } from "zustand";

type UserStore = {
  // 필드
  isLoggedIn: boolean;
  userInfo: UserInfoResponse | null;

  // 메소드
  setIsLoggedIn: (isLoggedIn: boolean) => void;

  fetchUserInfo: () => Promise<void>;

  clearUser: () => Promise<void>;

  initUser: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  // 필드
  isLoggedIn: false,
  userInfo: null,

  // 메소드
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn: isLoggedIn }),

  fetchUserInfo: async () => {
    const res = await getUserInfo();

    set({ userInfo: res });
  },

  clearUser: async () => {
    const res = await logout();
    set({ isLoggedIn: false, userInfo: null });
  },

  initUser: async () => {
    const { isLoggedIn } = await checkLoginStatus();
    if (isLoggedIn) {
      const userInfo = await getUserInfo();
      set({ isLoggedIn: isLoggedIn, userInfo: userInfo });
    } else {
      set({ isLoggedIn: false, userInfo: null });
    }
  },
}));
