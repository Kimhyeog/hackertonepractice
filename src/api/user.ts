// 로그인

import { API, getErrorMessage } from "@/lib/axios";
import {
  CheckLoginStateResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  UserInfoResponse,
} from "@/types/user";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const res = await API.post("/login", data);
    return { success: true, message: res.data.message };
  } catch (error) {
    const message = getErrorMessage(error);
    return { success: false, message: message };
  }
};

// 로그인 상태 여부
export const checkLoginStatus = async (): Promise<CheckLoginStateResponse> => {
  try {
    const res = await API.get("/check-login");
    return { isLoggedIn: res.data.isLoggedIn, message: res.data.message };
  } catch (error) {
    const message = getErrorMessage(error);
    return { isLoggedIn: false, message: message };
  }
};

// 회원 정보 조회 API
export const getUserInfo = async (): Promise<UserInfoResponse | null> => {
  try {
    const res = await API.get("/userinfo");
    return res.data;
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(message);
    return null;
  }
};

// 로그아웃 API

export const logout = async (): Promise<LogoutResponse> => {
  try {
    const res = await API.post("/logout");
    return res.data.message;
  } catch (error) {
    const message = getErrorMessage(error);
    return message;
  }
};
