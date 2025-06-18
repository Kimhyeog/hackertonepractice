import { API, getErrorMessage, PublicAPI } from "@/lib/axios";
import {
  CheckLoggedInResponse,
  GetUserInfoResponse,
  LoginRequest,
  LoginResponse,
} from "@/types/Auth";

export const login = async (
  loginForm: LoginRequest
): Promise<LoginResponse> => {
  try {
    const res = await API.post("/login", loginForm);
    return { success: true, message: res.data.messages };
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(message);
    return { success: false, message: message };
  }
};

export const checkLoginState = async (): Promise<CheckLoggedInResponse> => {
  try {
    const res = await API.get("/check-login");
    return { isLoggedIn: res.data.isLoggedIn, message: res.data.message };
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(message);
    return { isLoggedIn: false, message: message };
  }
};

export const getUserInfo = async (): Promise<GetUserInfoResponse> => {
  try {
    const { data } = await API.get("/userinfo");
    console.log("유저정보조회성공");
    return {
      userName: data.userName,
      userId: data.userId,
      userBirthday: data.userBirthday,
      userGender: data.userGender,
      createAt: data.createAt,
      updateAt: data.updataAt,
    };
  } catch (error) {
    const message = getErrorMessage(error);
    console.error("유저정보조회오류 : ", error);
    return { message };
  }
};
