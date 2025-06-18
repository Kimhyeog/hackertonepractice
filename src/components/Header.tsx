"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Header() {
  const router = useRouter();

  const { isLoggedIn, initUser } = useUserStore();
  console.log(`로그인 상태 : ${isLoggedIn}`);

  // 로그인 상태 확인용 변수

  // 로그아웃 버튼을 누를 시, 유저 상태 리셋 변수

  // 로그인 , 로그아웃 , 마이페이지 버튼 핸들러
  const handleLogin = () => {
    router.push("/login");
  };
  const handleLogout = () => {
    // 로그아웃 시, 상태 리셋
    // 로그인 페이지 이동
    router.push("/login");
  };
  const handleMyPage = () => {
    router.push("/mypage");
  };

  useEffect(() => {
    initUser();
  }, []);

  return (
    <header className="w-full p-4 flex justify-between items-center bg-gray-100 shadow">
      <div>로고</div>
      <div>
        <nav>
          {isLoggedIn && (
            <button
              className="border-0 text-md text-gray"
              onClick={handleMyPage}
            >
              마이 페이지
            </button>
          )}
        </nav>
        <div>
          {isLoggedIn ? (
            <button className="p-3 text-sm bg-blue-600" onClick={handleLogout}>
              로그아웃
            </button>
          ) : (
            <button className="p-3 text-sm bg-blue-600" onClick={handleLogin}>
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
