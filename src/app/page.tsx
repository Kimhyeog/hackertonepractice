"use client";

import { useUserStore } from "@/stores/useUserStore";

export default function Home() {
  const { isLoggedIn, userInfo } = useUserStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">인덱스 페이지</h1>
      {isLoggedIn ? (
        <p className="text-green-600">
          ✅ 로그인됨! 환영합니다, <strong>{userInfo?.userName}</strong> 님!
        </p>
      ) : (
        <p className="text-red-600">❌ 로그인되어 있지 않습니다.</p>
      )}
    </div>
  );
}
