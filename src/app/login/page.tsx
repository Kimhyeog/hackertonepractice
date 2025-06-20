"use client";

import { login } from "@/api/user";
import { useUserStore } from "@/stores/useUserStore";
import { LoginRequest } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const { initUser } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data.message);
      // useUserStore.ts 적용
      initUser();

      router.push("/");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("알 수 없는 오류");
      }
    },
  });

  const onSubmit = (data: LoginRequest) => {
    loginMutation.mutate(data);
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="userId">아이디</label>
          <input
            type="text"
            id="userId"
            {...register("userId", {
              required: "아이디는 필수 입력 항목입니다.",
            })}
          />
          {errors.userId && <p>아이디 입력하라고 시발련아</p>}
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            {...register("userPassword", {
              required: "비밀번호는 필수 입력 항목입니다.",
            })}
          />
          {errors.userPassword && <p>비밀번호 입력하라고 시발련아</p>}
        </div>
        <button disabled={loginMutation.isPending} type="submit">
          {loginMutation.isPending ? "로그인 중.." : "로그인"}
        </button>
      </form>
    </div>
  );
}
