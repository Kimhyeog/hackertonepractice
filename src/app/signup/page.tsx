"use client";
// 회원 가입 페이지

import { signUp } from "@/api/signup";
import { SignUpRequest } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpRequest>();

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: SignUpRequest) => {
    signUpMutation.mutate(data);
  };

  // 입력 상태

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <input
          type="text"
          placeholder="이름"
          {...register("userName", {
            required: "성명은 필수 입력 항목입니다.",
          })}
          // value={userName}
          // onChange={(e) => setUserName(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        {errors.userName && (
          <p className="text-sm text-red-500">{errors.userName.message}</p>
        )}
        <input
          type="text"
          placeholder="아이디"
          // value={userId}
          // onChange={(e) => setUserId(e.target.value)}
          {...register("userId", {
            required: "아이디는 필수 입력 항목입니다.",
          })}
          className="border border-gray-300 p-2 rounded"
        />
        {errors.userId && (
          <p className="text-sm text-red-500">{errors.userId.message}</p>
        )}

        <input
          type="password"
          placeholder="비밀번호"
          {...register("userPassword", {
            required: "비밀번호는 필수 입력 항목입니다.",
          })}
          // value={userPassword}
          // onChange={(e) => setUserPassword(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        {errors.userPassword && (
          <p className="text-sm text-red-500">{errors.userPassword.message}</p>
        )}

        <input
          type="date"
          placeholder="생년월일"
          // value={userBirthday}
          // onChange={(e) => setUserBirthday(e.target.value)}
          {...register("userBirthday", {
            required: "생년월일은 필수 입력 항목입니다.",
          })}
          className="border border-gray-300 p-2 rounded"
        />
        {errors.userBirthday && (
          <p className="text-sm text-red-500">{errors.userBirthday.message}</p>
        )}
        <select
          // value={userGender}
          // onChange={(e) => setUserGender(e.target.value)}]
          {...register("userGender", {
            required: "성별은 필수 입력 항목입니다.",
          })}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
        {errors.userGender && (
          <p className="text-sm text-red-500">{errors.userGender.message}</p>
        )}

        <button
          disabled={signUpMutation.isPending}
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {signUpMutation.isPending ? "로딩 중..." : "회원가입"}
        </button>
      </div>
    </main>
  );
}
