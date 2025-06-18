import { getErrorMessage } from "@/lib/axios";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

type UseQueryWrapperOptions<TData> = {
  onError: (error: unknown) => void;
} & Omit<
  UseQueryOptions<TData, Error, TData, readonly unknown[]>,
  "queryKey" | "queryFn"
>;

export function useQueryWrapper<TData>(
  key: string[],
  queryFn: () => Promise<TData>,
  options: UseQueryWrapperOptions<TData>
): UseQueryResult<TData | Error> {
  const result = useQuery({
    queryKey: key,
    queryFn,
    ...options,
  });

  if (result.isError) {
    const message = getErrorMessage(result.error);
    console.error("Query Error : ", message);
    options?.onError?.(result.error);
  }

  return result;
}
