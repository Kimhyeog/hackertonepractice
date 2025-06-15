// 1. useStore 타입 생성

import { checkLoginState, getUserInfo } from "@/api/user";
import { UserInfoResponse } from "@/types/user";
import { create } from "zustand";

/*
  - 로그인 상태
  - 유저 정보
  - 로그인 상태 설정 메소드 (zustand의 상태 속성 중 isLoggedIn 설정용 메소드)
  - 유저 정보 갖고오는 메소드
  - 로그아웃시 상태 초기화 메소드
  - 로그인 상태 초기화 메소드
*/
type UserStore = {
  isLoggedIn: boolean;
  userInfo: UserInfoResponse | null;

  setLoggedInState: (isLoggedIn: boolean) => void;
  fetchUserInfo: () => Promise<void>;
  clearUser: () => void;
  initUser: () => Promise<void>;
};

// 2. store 셍성 및 상태 정의
export const useUserStore = create<UserStore>((set) => ({
  // 초기의 isLoggedIn값 , userInfo 값
  isLoggedIn: false,
  userInfo: null,
  setLoggedInState: (state: boolean) => set({ isLoggedIn: state }),
  fetchUserInfo: async () => {
    try {
      const data = await getUserInfo();
      set({ userInfo: data });
    } catch (error) {
      console.error("회원 정보 불러오는데 오류 : ", error);
      set({
        isLoggedIn: false,
        userInfo: null,
      });
    }
  },
  clearUser: () =>
    set({
      isLoggedIn: false,
      userInfo: null,
    }),
  initUser: async () => {
    // 1단계 : 현재의 로그인 상태 확인
    try {
      const data = await checkLoginState();

      // 2단계 : 로그인 상태라면, => zustand set에 저장
      if (data.isLoggedIn) {
        const userInfo = await getUserInfo();

        set({
          isLoggedIn: data.isLoggedIn,
          userInfo: userInfo,
        });
      } else {
        set({
          isLoggedIn: false,
          userInfo: null,
        });
      }
    } catch (error) {
      console.error("로그인 상태 검사 오류 : ", error);
      set({
        isLoggedIn: false,
        userInfo: null,
      });
    }
  },
}));
