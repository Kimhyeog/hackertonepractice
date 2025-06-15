import { PublicAPI, API } from "@/lib/axios";
import {
  CheckLoginStateResponse,
  CheckPasswordRequest,
  CheckPasswordResponse,
  CheckUserIdResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  SignUpRequest,
  SignUpResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  UserInfoReponse,
} from "@/types/user";

// ** 인증이 필요하지 않은 API

// 아이디 중복 확인
export const checkUserId = async (
  userId: string
): Promise<CheckUserIdResponse> => {
  const res = await PublicAPI.get("/check-userid", { params: userId });
  return res.data;
};

// 회원가입

// 참고로 이건 응답값이 string밖에 없으므로, 응답 코드 201 , 400으로 가입 성공 실패 여부 판단
export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const res = await PublicAPI.post("/signup", data);
  return res.data;
};

// 로그인

// 참고로 이것도 응답값이 string밖에 없으므로, 응답 코드 201 , 400으로 가입 성공 실패 여부 판단

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await PublicAPI.post("/login", data);
  return res.data;
};

// 로그아웃

export const logout = async (): Promise<LogoutResponse> => {
  const res = await PublicAPI.post("/logout");
  return res.data;
};

// 로그인 상태 확인 여부

export const checkLoginState = async (): Promise<CheckLoginStateResponse> => {
  const res = await PublicAPI.get("/check-login");
  return res.data;
};

// ** 인증이 필요한 API

// 사용자 정보 조회

export const getUserInfo = async (): Promise<UserInfoReponse> => {
  const res = await API.get("/userInfo");
  return res.data;
};

// 비밀번호 확인 (마이페이지 비밀번호 변경)

// 참고로 이것도 응답값이 string밖에 없으므로, 응답 코드 201 , 400으로 가입 성공 실패 여부 판단
//200 OK
//400 비밀번호 일치X
//401 로그인이 필요합니다.
export const checkPassword = async (
  data: CheckPasswordRequest
): Promise<CheckPasswordResponse> => {
  const res = await API.post("/check-password", data);
  return res.data;
};

// 비밀번호 변경

// 참고로 이것도 응답값이 string밖에 없으므로, 응답 코드 201 , 400으로 가입 성공 실패 여부 판단
//200 OK
//400 비밀번호 일치X
//401 로그인이 필요합니다.
export const updatePassword = async (
  data: UpdatePasswordRequest
): Promise<UpdatePasswordResponse> => {
  const res = await API.put("/update-password", data);
  return res.data;
};
