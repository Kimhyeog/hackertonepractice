// 로그인 API 타입

export interface LoginRequest {
  userId: string;
  userPassword: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
}

// 로그인 상태 확인 여부 API 타입

export interface CheckLoggedInResponse {
  isLoggedIn: boolean;
  message: string;
}

// 유저 정보 조회 타입

export interface UserInfo {
  userName: string;
  userId: string;
  userBirthday: string;
  userGender: string;
  createAt: string;
  updateAt: string; // 오타도 수정함 (updataAt → updateAt)
}

export interface UnauthorizedResponse {
  message: string;
}

export type GetUserInfoResponse = UserInfo | UnauthorizedResponse;
