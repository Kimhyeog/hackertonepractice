"use client";

import { FormEvent, useState } from "react";
import { login } from "@/api/user";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoginRequest } from "@/types/user";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

export default function LoginPage() {
  const router = useRouter();

  // 상태
  const setLoggedInState = useUserStore((state) => state.setIsLoggedIn);
  const fetchUserInfo = useUserStore((state) => state.fetchUserInfo);

  // useHookForm적용
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setLoggedInState(data.success);
      toast.success(data.message);
      // setTimeout(() => {
      //   router.push("/");
      // }, 2000);
      router.push("/");
    },
    onError: () => {
      toast.error("로그인 실패");
    },
  });

  const onSubmit = (data: LoginRequest) => {
    loginMutation.mutate(data);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full max-w-sm"
      >
        <input
          type="text"
          placeholder="아이디"
          // value={userId}
          {...register("userId", { required: "아이디를 입력하세요." })}
          // onChange={(e) => setUserId(e.target.value)}
          className="border border-gray-300 p-2 rounded"
          required
        />
        {errors.userId && (
          <p className="text-red-500 text-sm">{errors.userId.message}</p>
        )}
        <input
          type="password"
          placeholder="비밀번호"
          // value={userPassword}
          {...register("userPassword", { required: "비밀번호를 입력하세요." })}
          // onChange={(e) => setUserPassword(e.target.value)}
          className="border border-gray-300 p-2 rounded"
          required
        />
        {errors.userPassword && (
          <p className="text-red-500 text-sm">{errors.userPassword.message}</p>
        )}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loginMutation.isPending ? "로그인 중.." : "로그인"}
        </button>
      </form>
    </main>
  );
}
