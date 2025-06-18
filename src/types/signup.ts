// 아이디 중복 확인 터입
export interface CheckUserIdRequest {
  userId: string;
}

export interface CheckUserIdResponse {
  message: string;
}

// 회원가입 타입
export interface SignUpRequest {
  userName: string;
  userId: string;
  userPassword: string;
  userBirthday: string;
  userGender: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
}
