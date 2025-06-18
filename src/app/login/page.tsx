"use client";

import { FormEvent, useState } from "react";
import { login } from "@/api/user";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // 상태
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const setLoggedInState = useUserStore((state) => state.setIsLoggedIn);
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await login({ userId, userPassword });

      toast.success("로그인 성공!");
      setLoggedInState(true);
      await fetchUserInfo();

      setTimeout(() => {
        router.push("/");
      }, 2000); // 토스트가 사라진 후 이동 (sonner 기본 지속시간 2초)
    } catch (error) {
      toast.error("로그인 실패");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-3 w-full max-w-sm"
      >
        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          className="border border-gray-300 p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          로그인
        </button>
      </form>
    </main>
  );
}
