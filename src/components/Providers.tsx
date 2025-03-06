"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ConfigProvider } from "antd";
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient()); // ✅ Ensures QueryClient is stable

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>{children}</ConfigProvider>
    </QueryClientProvider>
  );
}
