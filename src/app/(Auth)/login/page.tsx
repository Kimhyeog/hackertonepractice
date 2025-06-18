"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { getUserInfo, login } from "@/api/user";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// useUserStore 불러오기
import { useUserStore } from "@/stores/useUserStore";

interface LoginForm {
  userId: string;
  userPassword: string;
}

export default function LoginPage() {
  const { initUser, fetchUserInfo } = useUserStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      if (data.success) {
        //전역상태 적용
        await initUser();
        toast.success("로그인 성공!", {
          onClose: () => router.push("/"), // 로그인 성공 시 메인으로 이동
        });
      } else {
        toast.error(data.message || "로그인 실패");
      }
    },
    onError: () => {
      toast.error("로그인 요청 중 오류 발생");
    },
  });

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">아이디</label>
          <input
            {...register("userId", { required: "아이디를 입력하세요" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.userId && (
            <p className="text-red-500 text-sm">{errors.userId.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">비밀번호</label>
          <input
            type="password"
            {...register("userPassword", { required: "비밀번호를 입력하세요" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.userPassword && (
            <p className="text-red-500 text-sm">
              {errors.userPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loginMutation.isPending ? "로그인 중..." : "로그인"}
        </button>
      </form>

      {/* toast 컨테이너 */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
