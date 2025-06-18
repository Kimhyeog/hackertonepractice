// 아이디 중복확인 타입
export interface CheckUserIdResponse {
  success: boolean;
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

// 로그인 타입

export interface LoginRequest {
  userId: string;
  userPassword: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
}

// 로그아웃

export interface LogoutResponse {
  message: string;
}

// 로그인 상태 여부

export interface CheckLoginStateResponse {
  isLoggedIn: boolean;
  message: string;
}

// 사용자 정보 조회

export interface UserInfoResponse {
  userName: string;
  userId: string;
  userBirthday: string;
  userGender: string;
  createAt: string;
  upDateAt: string;
}

// 비밀번호 확인 (비밀번호 변경용)

export interface CheckPasswordRequest {
  currentPassword: string;
}

export interface CheckPasswordResponse {
  message: string;
}

// 비밀번호 변경

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePasswordResponse {
  message: string;
}

/* useUserStore용 타입 선언 */
export interface UserStore {
  // 1. 로그인 상태여부 API의 Response
  isLoggedIn: boolean;
  // 2. 로그인상테 => userInfo 타입 / 로그아웃 상태 => null
  userInfo: UserInfoResponse | null;
}
