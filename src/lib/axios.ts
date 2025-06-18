import axios from "axios";

//인증이 필요한 API의 axios 인스턴스
export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // 로그인 필요 API용
  headers: { "Content-Type": "application/json" },
});

//인증이 필요없는 API의 axios 인스턴스
export const PublicAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false, // 인증 없이 사용하는 API용
  headers: { "Content-Type": "application/json" },
});

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error))
    return error.response?.data.message || "알 수 없는 에러 발생";
  return "알 수 없는 에러 발생";
}
