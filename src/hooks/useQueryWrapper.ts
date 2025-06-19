import { getErrorMessage } from "@/lib/axios";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

// 1, useQueryOptions 중 onError와 그외 속성들의 타입 선언을 위한 타입
type UseQueryWrapperOptions<TData> = {
  // onError 콜백함수의 타입
  onError: (error: unknown) => void;
  // 그 외 좆같은 타입 선언
} & Omit<
  UseQueryOptions<TData, Error, TData, readonly unknown[]>,
  "queryKey" | "queryFn"
>;

// 2. useQueryWrapperHook 생성

export function useQueryWrapper<TData>(
  // API에 대한 쿼리 키
  key: string[],
  // 호출한 API 함수
  queryFn: () => Promise<TData>,
  // 그외 옵션 : staletine , enable ... 등
  options: UseQueryWrapperOptions<TData>
): UseQueryResult<TData> {
  const result = useQuery({
    queryKey: key,
    queryFn,
    ...options,
  });

  // 4. useQuery의 오류 속성들 처리
  if (result.isError) {
    const message = getErrorMessage(result.error);
    console.error("Query Error : ", message);
    options?.onError?.(result.error);
  }

  return result;
}
