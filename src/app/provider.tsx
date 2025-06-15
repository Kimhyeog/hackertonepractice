"use client";

import { ReactNode, useState } from "react";
// 1. @tanstack/react-query에서 QueryClient, QueryClientProvider를 불러오기
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Provider({ children }: { children: ReactNode }) {
  // 2. state변수로 QueryCleint 인스턴스 초기화
  const [queryClient] = useState(() => new QueryClient());

  // 3. <QueryClientProvider>태그의 client 속성에 QueryClient의 객체를 대입 후, ReactNode를 감싸기
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
