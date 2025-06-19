"use client";

import { getUserInfo } from "@/api/user";
import { useQueryWrapper } from "@/hooks/useQueryWrapper";
import { UserInfoResponse } from "@/types/user";
import { toast } from "sonner";

export default function Page() {
  const { data, isLoading, isError, error } = useQueryWrapper<UserInfoResponse>(
    ["userInfo"],
    getUserInfo,
    {
      staleTime: 1000 * 60 * 5,
      onError: (error) => {
        toast.error(
          `${error instanceof Error ? error.message : "알 수 없는 오류}"}`
        );
      },
    }
  );

  if (isLoading) return <div>로딩중..</div>;
  if (isError) return <div>오류 발생 : {error?.message}</div>;

  // 데이터 타입 가드
  // 사용자 정보가 잘 들어왔는지 확인
  if (!data) return <div>사용자 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">마이페이지</h1>
      <ul className="space-y-2">
        <li>
          <strong>이름:</strong> {data.userName}
        </li>
        <li>
          <strong>아이디:</strong> {data.userId}
        </li>
        <li>
          <strong>생년월일:</strong> {data.userBirthday}
        </li>
        <li>
          <strong>성별:</strong> {data.userGender === "male" ? "남자" : "여자"}
        </li>
        <li>
          <strong>가입일:</strong>{" "}
          {new Date(data.createAt).toLocaleDateString()}
        </li>
        <li>
          <strong>수정일:</strong>{" "}
          {new Date(data.upDateAt).toLocaleDateString()}
        </li>
      </ul>
    </div>
  );
}
