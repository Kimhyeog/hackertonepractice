import { checkLoginState, getUserInfo } from "@/api/user";
import { UserInfo } from "@/types/Auth";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type UserStore = {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  fetchUserInfo: () => Promise<void>;
  clearUser: () => void;
  initUser: () => Promise<void>;
};

export const useUserStore = create<UserStore>()(
  devtools((set) => ({
    isLoggedIn: false,
    userInfo: null,

    setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),

    fetchUserInfo: async () => {
      try {
        const data = await getUserInfo();
        if ("message" in data) {
          set({ isLoggedIn: false, userInfo: null });
        } else {
          set({ isLoggedIn: true, userInfo: data });
        }
      } catch (error) {
        set({ isLoggedIn: false, userInfo: null });
      }
    },

    clearUser: () => set({ isLoggedIn: false, userInfo: null }),

    initUser: async () => {
      try {
        const { isLoggedIn } = await checkLoginState();
        if (isLoggedIn) {
          try {
            const data = await getUserInfo();
            if (!("message" in data)) {
              set({ isLoggedIn: true, userInfo: data });
            }
          } catch (error) {
            console.error("유저 정보 가져오기 실패:", error);
            set({ isLoggedIn: false, userInfo: null });
          }
        }
      } catch (error) {
        console.error("로그인 상태 초기화 실패:", error);
        set({ isLoggedIn: false, userInfo: null });
      }
    },
  }))
);
